import './success.css';
import success from '../assets/success.png';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
function Succes({ transactionId }) {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://server.telemoni.in/api/payment/callback?tid=${transactionId}`);
        const data = await res.text();
        setResponseData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (transactionId) {
      fetchData();
    }
  }, [transactionId]);

  return (
    <div className="success">
      <div className="inner">
        {loading ? (
          <img src={success} className="successimage" alt="Success" />
        ) : (
          <p>{responseData}</p>
        )}
      </div>
    </div>
  );
}

export default Succes;
