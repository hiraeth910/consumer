/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import { clearCart } from '../../redux/appSlice';
import logo from '../../assets/app_icon.png';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const cart = useSelector((state) => state.app.cart);
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const userName = useSelector((state) => state.app.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name,setName] = useState('')
  const [isloggedin,setIsloggedin] = useState();
  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      dispatch(clearCart());
      navigate(-1); // Navigate back to previous page
    }
  };
    const handleLogin = () => {
    navigate('/login');
  };
  const handlePay = async () => {
    console.log(isLoggedIn)
    if (!isloggedin) {
    navigate('/login'); // or navigate to the actual payment page
  } else {
    // Attempt to initiate the payment
    try {
      const response = await axios.post("https://13.201.168.52/api/payment/pay", {
        amount: 10000, // example: 100.00 INR
        userId: "USER_ID", // Replace with actual user ID
        userPhone: "USER_PHONE" // Replace with actual user phone
      });

      if (response.data.success) {
        alert("Transaction initiated successfully");
        // Optionally, navigate to the payment URL or handle further steps as needed
      } else {
        alert("Transaction failed");
      }
    } catch (error) {
      console.error("Error in payment:", error);
      alert("Error initiating payment");
    }
  }
};
const handleRefunds=()=>{
  navigate('/Refund-policy')
}

  const handleTerms = () => {
navigate('/terms&conditions')  };

  return (
    <div className="cart-page">
      <header className="header" style={{ backgroundColor: 'lightSkyBlue' }}>
        <div className="brand">
          <img src={logo} alt="Logo" className="brand-logo" />
          <h1 className="brand-name">Telemoni</h1>
        </div>
        <div className="login-icon">
          {isLoggedIn ? (
            <span className="user-name">{userName}</span>
          ) : (
            <button className="login-button" onClick={handleLogin}>Login</button>
          )}
        </div>
      </header>
      <div className="cart-container">
        {cart ? (
          <div>
            <h3>Item in your cart</h3>
          <div className="cart-content">
            <img src={cart.image} className='cart-image' />
            <h3 className="cart-title">{cart.title}</h3>
            <p className="cart-description">{cart.description}</p>
            <p className="cart-author">By {cart.author}</p>
            <button className="remove-btn" onClick={handleRemove}>
              Remove
            </button>
          </div>
          <button className="pay-btn" onClick={handlePay}>
              Pay with PhonePe
            </button>
          <div style={{display:'flex',justifyContent:'space-evenly'}}>
            <span className="terms-link" onClick={handleTerms}>
              * Terms and conditions
            </span>
            <span className="terms-link" onClick={handleRefunds}>* Refund policy</span></div>
            </div>
        ) : (
          <div>Your cart is empty</div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
