/* eslint-disable no-unused-vars */
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import logo from '../assets/app_icon.png';
import './Login.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import auth from '../firebase/setup.js';

function LoginPage() {
    const [otpVisible, setOtpVisible] = useState(true);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    let token = ''
    const [name,setName] = useState('');
    const [isNew,setisNew] = useState(false)
    // Function to initialize reCAPTCHA
    const initializeRecaptcha = () => {
        if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,
        'recaptcha', 
        {
            size: 'invisible', // or 'normal' if you want it visible for testing
            callback: (response) => {
                // reCAPTCHA solved
            }
        }
        
    );
    window.recaptchaVerifier.render(); // Render reCAPTCHA only once
}

    };

    const handleLogin= ()=>{
         localStorage.setItem("name", name);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("token", token);
                            window.close();

    }
    const sendOtp = async () => {
        try {
            if (!auth) {
                console.error("Firebase Auth is not initialized.");
                return;
            }

            // Ensure reCAPTCHA is initialized
            initializeRecaptcha();

            const appVerifier = window.recaptchaVerifier;
            const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
            console.log("Confirmation result:", confirmation);
            setConfirmationResult(confirmation);
            setOtpVisible(false);

        } catch (error) {
            console.error("Error during OTP send:", error);
            alert("An error occurred. Please try again.");
        }
    };

   const verifyOtp = async () => {
    try {
        if (confirmationResult) {
            const result = await confirmationResult.confirm(otp);
            const user = result.user;
            console.log("OTP verified successfully!", user);
            alert("OTP verified successfully!");

            // Generate ID token
            const idToken = await user.getIdToken();

            // Get the user UID
            const uid = user.uid;

            // Check if the user is new
            const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
            
            if (isNewUser) {
                token = idToken
                setisNew(true)
                localStorage.setItem("isNew", true);
            } else {
                // Set the last 5 characters of UID as name and save to local storage
                const ame = uid.slice(-5);
                setName(ame)
                localStorage.setItem("name", name);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("token", idToken);
                
                window.close();
            }

            // Close the current window
        } else {
            console.error("No confirmation result to verify OTP.");
        }
    } catch (error) {
        console.error("Error during OTP verification:", error);
        alert("Invalid OTP. Please try again.");
    }
};


    return (
        <div className="login">
            <header className="header">
                <div className="brand">
                    <img src={logo} alt="Logo" className="brand-logo" />
                    <h1 className="brand-name">Telemoni</h1>
                </div>
            </header>
            <div className="contents">
                <div className="card">
                    <div className="phone-input">
                       {isNew ? (
    <div>
        {/* New User Registration - Name Input */}
        <TextField
            variant="outlined"
            size="small"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <br />
        <Button
            variant="contained"
            sx={{ marginTop: '10px' }}
            color="success"
            onClick={handleLogin}
        >
            Login
        </Button>
    </div>
) : (
    otpVisible ? (
        <div>
            <PhoneInput
                country={'in'}
                value={phone}
                onChange={(value) => setPhone(value)}
            />
            <a href="#">*Privacy policy</a>
            <br />
            <Button
                sx={{ marginTop: '10px' }}
                variant="contained"
                onClick={sendOtp}
            >
                Send OTP
            </Button>
            <div id="recaptcha"></div>
        </div>
    ) : (
        <div>
            <TextField
                variant="outlined"
                size="small"
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <br />
            <Button
                variant="contained"
                sx={{ marginTop: '10px' }}
                color="success"
                onClick={verifyOtp}
            >
                Verify
            </Button>
        </div>
    )
)}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
