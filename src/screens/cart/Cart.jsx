import { useSelector } from 'react-redux';
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
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const fetchProduct = async () => {
    try {
      if (link) {
        setLoading(true);
        const response = await getProduct(link);
        console.log(response);
        if (response) {
          setProduct(response.data);
        }
        setLoading(false);
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
    }, 100);

    return () => clearInterval(intervalId);
  }, [link, product]);

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
          // Set payment URL and open modal
          setPaymentUrl(response.data.url);
          setIsModalOpen(true);
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

  const closeModal = () => {
    setIsModalOpen(false);
    setPaymentUrl('');
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

      {loading ? <p>...loading</p> : (
        <div className="cart-container">
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
        </div>
      )}

      <footer className="footer">
        <span className="footer-link" onClick={() => navigate('/terms&conditions')}>Terms and Conditions</span>
        <span className="footer-link" onClick={() => navigate('/privacy-policy')}>Privacy Policy</span>
        <span className="footer-link" onClick={() => navigate('/contactus')}>Contact Us</span>
      </footer>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <iframe src={paymentUrl} title="Payment" className="payment-iframe"></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
