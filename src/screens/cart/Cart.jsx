import {  useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './cart.css';
import logo from '../../assets/app_icon.png';
import telegram from '../../assets/telegram.jpg';
import { getProduct } from '../../utils/getapi';
import { apiClient, endpoints } from '../../utils/endpoints';

const CartPage = () => {
  const { link } = useParams();
  const token = localStorage.getItem('token');
  const isLoggedIn = token !== null && token !== '';
  const userName = useSelector((state) => state.app.name);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading,setloading] = useState(false)
  const fetchProduct = async () => {
    try {
      if (link) {
        setloading(true)
        const response = await getProduct(link);
        
        console.log(response);
        if (response) {
          setProduct(response.data);
        }
        setloading(false)
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to load product data");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!product) {
        fetchProduct();
      } else {
        clearInterval(intervalId); // Stop fetching once product is loaded
      }
    }, 100); // Run every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [link, product]); // Re-run if `link` or `product` changes


  const handleLogin = () => {
    navigate('/login');
  };

  const handlePayClick = async () => {
    if (token !== null) {
      try {
        const response = await apiClient.post(
          endpoints.getPayemntLink,
          { link },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data && response.data.url) {
          window.open(response.data.url, "_blank");
        } else if (response.data.success) {
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
    navigate('/contactus');
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
      {loading? <p>...loading</p>:
      (<div className="cart-container">
        {link !== '' && product ? (
          <div className="product-info-container">
            <div className="product-info">
              {product.type === "telegram" && (
                <img src={telegram} alt="Telegram" className="channel-icon" />
              )}
              <h1>{product.channel_name}</h1>
            </div>
            <div className="product-details">
              <h1>About Channel:</h1>
              <p>{product.displaytext}</p>
              <div className="price-section">
                <h3>Subscription Plan</h3>
                <p>{product.ppu} for {product.for}</p>
              </div>
              <button className="pay-btn" onClick={handlePayClick}>
                Pay {product.ppu}
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-content">
            <h3>...loading</h3>
            
          </div>
        )}
      </div>)}

      <footer className="footer">
        <span className="footer-link" onClick={handleTerms}>Terms and Conditions</span>
        <span className="footer-link" onClick={handlePrivacyPolicy}>Privacy Policy</span>
        <span className="footer-link" onClick={handleContactUs}>Contact Us</span>
      </footer>
    </div>
  );
};

export default CartPage;
