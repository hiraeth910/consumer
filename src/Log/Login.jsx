/* eslint-disable no-unused-vars */
import { Button, TextField, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import logo from '../assets/app_icon.png';
import './Login.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import auth from '../firebase/setup.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../utils/getapi.js';
import { seTName, setToken, setIsLoggedIn } from '../redux/appSlice.js'

function LoginPage() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.app.cart);
    const dispatch = useDispatch();

    const [otpVisible, setOtpVisible] = useState(true);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [name, setName] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [pageLoding, setPageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');


    // Function to initialize reCAPTCHA
    const initializeRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                'recaptcha',
                {
                    size: 'invisible',
                    callback: (response) => {
                        // reCAPTCHA solved
                    },
                }
            );
            window.recaptchaVerifier.render(); // Render reCAPTCHA only once
        }
    };

    const navigateToHomeOrCart = () => {
        navigate(-1)
    };

    const handleLogin = () => {
        fetchToken(phone, name,email);
    };

    const sendOtp = async () => {
        setLoading(true);
        try {
            if (!auth) {
                console.error('Firebase Auth is not initialized.');
                return;
            }

            initializeRecaptcha();
            const appVerifier = window.recaptchaVerifier;
            const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
            console.log('Confirmation result:', confirmation);
            setConfirmationResult(confirmation);
            setOtpVisible(false);
        } catch (error) {
            console.error('Error during OTP send:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        setLoading(true);
        try {
            if (confirmationResult) {
                const result = await confirmationResult.confirm(otp);
                const user = result.user;

                const uid = user.uid;
                const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

                if (isNewUser) {
                    setIsNew(true);
                } else {
                    fetchToken(phone, '',email); //fetch token
                    
                }
            } else {
                console.error('No confirmation result to verify OTP.');
            }
        } catch (error) {
            console.error('Error during OTP verification:', error);
            alert('Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchToken = async (p, n,e) => {
        setPageLoading(true);
        try {
            const response = await getUser(p.slice(2), n,e);

            // Log the full response for debugging
            console.log('API Response:', response);

            // Check if response and response.data are defined
            if (response && response.data) {
                const { token, name } = response.data;

                // Save token and name to local storage
                localStorage.setItem('token', token);
                localStorage.setItem('name', name);
                dispatch(setToken(token));
                dispatch(seTName(name));
                dispatch(setIsLoggedIn(true));
                navigateToHomeOrCart();
            } else {
                console.error('Unexpected API response structure:', response);
                alert('Failed to retrieve login information. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching token:', error);
            alert('Error occurred while logging in. Please try again later.');
        } finally {
            setPageLoading(false);
        }
    };


    const handleWrongNumber = () => {
        const confirmChange = window.confirm('Want to change the number?');
        if (confirmChange) {
            setOtpVisible(true);
            setPhone('');
            setOtp('');
            setConfirmationResult(null);
        }
    };

    const handleTerms = () => {
        navigate('/terms&conditions');
    };

    const handlePrivacyPolicy = () => {
        navigate('/privacy-policy');
    };

    const handleContactUs = () => {
        navigate('/contactus')
    };

    const handleRefundPolicy = () => {
        navigate('/Refund-policy');
    };

    return (
        pageLoding ? (<p>Loading</p>) : (
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
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Login'}
                                    </Button>
                                </div>
                            ) : (
                                otpVisible ? (
                                    <div>
                                        <p>Please login to proceed</p>
                                        <PhoneInput
                                            country={'in'}
                                            value={phone}
                                            onChange={(value) => setPhone(value)}
                                        />
                                        <a href="/privacy-policy">*Privacy policy</a>
                                        <br />
                                        <Button
                                            sx={{ marginTop: '10px' }}
                                            variant="contained"
                                            onClick={sendOtp}
                                            disabled={loading}
                                        >
                                            {loading ? <CircularProgress size={24} /> : 'Send OTP'}
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
                                        <a href="#" style={{ display: "block" }} onClick={handleWrongNumber}>Wrong number?</a>
                                        <br />

                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            label="Email (Optional)"
                                            placeholder="Enter your email to receive a link"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <br />

                                        <Button
                                            variant="contained"
                                            sx={{ marginTop: '10px' }}
                                            color="success"
                                            onClick={verifyOtp}
                                            disabled={loading}
                                        >
                                            {loading ? <CircularProgress size={24} /> : 'Verify'}
                                        </Button>
                                    </div>

                                )
                            )}
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <span className="footer-link" onClick={handleTerms}>Terms and Conditions</span>
                    <span className="footer-link" onClick={handlePrivacyPolicy}>Privacy Policy</span>
                    <span className="footer-link" onClick={handleContactUs}>Contact Us</span>
                    <span className="footer-link" onClick={handleRefundPolicy}>Refund Policy</span>
                </footer>
            </div>
        )
    );
}

export default LoginPage;
