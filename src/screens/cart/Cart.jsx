import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './cart.css';
import { clearCart } from '../../redux/appSlice';
import logo from '../../assets/app_icon.png';
import telegram from '../../assets/telegram.jpg';
import { getProduct } from '../../utils/getapi';
import { apiClient, endpoints } from '../../utils/endpoints';

const CartPage = () => {
  const { link } = useParams();
  const cart = useSelector((state) => state.app.cart);
  const token = localStorage.getItem('token');
  const isLoggedIn = token!==null && token!==''
  const userName = useSelector((state) => state.app.name);
 // const token = useSelector((state) => state.app.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (link) {
          const response = await getProduct(link);
          if (response) {
            setProduct(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to load product data");
      }
    };

    fetchProduct();
  }, [link]);

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      dispatch(clearCart());
      navigate(-1);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handlePayClick = async () => {
    if (token !== null) {
      try {
        const response = await apiClient.post(
          endpoints.getPayemntLink,
          {'link':link},
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data && response.data.url) {
          // Open the URL in a new tab or window
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

  const handleRefundPolicy = () => {
    navigate('/Refund-policy');
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
        {link && product ? (
          // Display product details if link is provided
          <div className="product-info-container">
            <div className="product-info">
              {product.type === "telegram" && (
                <img src={telegram} alt="Telegram" className="channel-icon" />
              )}
              {/* {product.type === "whatsapp" && (
                <img src={whatsapp} alt="WhatsApp" className="channel-icon" />
              )} */}
              <h1>{product.channel_name}</h1>
            </div>
            <div className="product-details">
              <h1>About Channel:</h1>
              <p>{product.displaytext}</p>
              <div className="price-section">
                <h3>Subscription Plan</h3>
                <p>{product.ppu} for {product.for}</p>
              </div>
              {/* <a href="/terms-and-conditions" className="terms-link">
                *Terms and conditions
              </a> */}
              <button className="pay-btn" onClick={handlePayClick}>
                Pay {product.ppu}
              </button>
            </div>
          </div>
        ) : (
          // Display dummy data if link is null
          <div className="cart-content">
            <h3>Item in your cart</h3>
            <h3 className="cart-title">{cart.title}</h3>
            <p className="cart-description">{cart.description}</p>
            <p className="cart-author">By {cart.author}</p>
            <button className="remove-btn" onClick={handleRemove}>
              Remove
            </button>
            <button className="pay-btn" onClick={handlePayClick}>
              Pay {cart.price}
            </button>
            <div>
              <span className="terms-link" onClick={handleRefundPolicy}>* Refund policy</span>
            </div>
          </div>
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
