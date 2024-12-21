/* eslint-disable react/prop-types */
import  { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { apiClient, endpoints } from '../utils/endpoints';

const HeaderWithHover = ({ name, token }) => {
  const [showHover, setShowHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const hoverRef = useRef(null);
  const navigate = useNavigate();

  const getPurchases = async (token) => {
    // Simulating an API call to fetch purchases
    try {
       const response = await apiClient.get(
                endpoints.getpurchases,
               
                { headers: { Authorization: token } }
              );
      if (response.ok) {
        const data = await response.json();
        return data || [];
      }
     
      throw new Error('Failed to fetch purchases');
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleNameClick = async () => {
    setShowHover(true);
    setLoading(true);

    const purchases = await getPurchases(token);
    setPurchases(purchases);

    setLoading(false);
  };

  // Close the hover element if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hoverRef.current && !hoverRef.current.contains(event.target)) {
        setShowHover(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Adjust position to prevent the hover element from overflowing the window
  const adjustPosition = (element) => {
    const rect = element.getBoundingClientRect();
    const overflowRight = rect.right > window.innerWidth;
    const overflowBottom = rect.bottom > window.innerHeight;

    if (overflowRight) {
      element.style.left = `${rect.left - (rect.right - window.innerWidth)}px`;
    }
    if (overflowBottom) {
      element.style.top = `${rect.top - (rect.bottom - window.innerHeight)}px`;
    }
  };

  return (
    <div className="header-with-hover">
      <span
        className="user-name"
        onClick={handleNameClick}
        style={{ cursor: 'pointer', color: 'blue' }}
      >
        {name}
      </span>
      {showHover && (
        <div
          className="hover-menu"
          ref={(ref) => {
            hoverRef.current = ref;
            if (ref) adjustPosition(ref);
          }}
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            padding: '10px',
            zIndex: 1000,
          }}
        >
          {loading ? (
            <div className="loading-spinner d-flex justify-content-center align-items-center">
              <span className="ms-2">Loading...</span>
            </div>
          ) : purchases.length === 0 ? (
            <p className="no-transactions">No transactions</p>
          ) : (
            <ul className="purchases-list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {purchases[0].channel_name && purchases.map((purchase, index) => (
                <li
                  key={index}
                  className="purchase-item"
                  style={{
                    marginBottom: '10px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: 'blue',
                  }}
                  onClick={() => navigate(`/redirect-url/${purchase.transactionid}`)}
                >
                  {purchase.channel_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderWithHover;
