import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import { clearCart } from '../../redux/appSlice';
import logo from '../../assets/app_icon.png';

const CartPage = () => {
  const cart = useSelector((state) => state.app.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      dispatch(clearCart());
      navigate(-1); // Navigate back to previous page
    }
  };

  const handlePay = () => {
    navigate('/login')
  };

  const handleTerms = () => {
    alert('Terms and Conditions placeholder');
  };

  return (
    <div className="cart-page">
      <header className="header">
        <div className="brand">
          <img src={logo} alt="Logo" className="brand-logo" />
          <h1 className="brand-name">Telemoni</h1>
        </div>
        <div className="login-icon">🔒</div>
      </header>
      <div className="cart-container">
        {cart ? (
          <div>
            <h4>Item in your cart</h4>
          <div className="cart-content">
            <img src={cart.image} className='cart-image' />
            <h2 className="cart-title">{cart.title}</h2>
            <p className="cart-description">{cart.description}</p>
            <p className="cart-author">By {cart.author}</p>
            <button className="remove-btn" onClick={handleRemove}>
              Remove
            </button>
          </div>
            <p className="terms-link" onClick={handleTerms}>
              * Terms and conditions
            </p>
          <button className="pay-btn" onClick={handlePay}>
              Pay with PhonePe
            </button>
            </div>
        ) : (
          <div>Your cart is empty</div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
