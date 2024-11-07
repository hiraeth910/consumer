/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import { clearCart } from '../../redux/appSlice';
import logo from '../../assets/app_icon.png';
import axios from 'axios';

const CartPage = () => {
  const cart = useSelector((state) => state.app.cart);
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const userName = useSelector((state) => state.app.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (isLoggedIn) {
      try {
        const response = await axios.post("https://server.telemoni.in/api/payment/pay", {
          amount: 10000, // example: 100.00 INR
          userId: "USER_ID", // Replace with actual user ID
          userPhone: "USER_PHONE" // Replace with actual user phone
        });

       if (response.data && response.data.url) {
    // Open the URL in a new tab or window
    window.open(response.data.url, "_blank");
}
 else if (response.data.success) {
          alert("Transaction initiated successfully");
        } else {
          alert("Transaction failed");
        }
      } catch (error) {
        console.error("Error in payment:", error);
        alert("Error initiating payment");
      }
    } else {
      navigate('/login'); 
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
              <img src={cart.image} className="cart-image" alt="Cart Item" />
              <h3 className="cart-title">{cart.title}</h3>
              <p className="cart-description">{cart.description}</p>
              <p className="cart-author">By {cart.author}</p>
              <button className="remove-btn" onClick={handleRemove}>
                Remove
              </button>
            </div>
            <button className="pay-btn" onClick={handlePay}>
              Pay {cart.price}
            </button>
          </div>
        ) : (
          <div>Your cart is empty</div>
        )}
      </div>
      <footer className="footer">
        <span className="footer-link" onClick={handleTerms}>Terms and Conditions</span>
        <span className="footer-link" onClick={handlePrivacyPolicy}>Privacy Policy</span>
        <span className="footer-link" onClick={handleContactUs}>Contact Us</span>
      </footer>
    </div>
  );
};

export default CartPage;
