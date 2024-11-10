import './success.css';
import success from '../assets/success.png';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Succes() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {transId} = useParams();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`https://server.telemoni.in/api/payment/callback?tid=${transId}`);
  //       const data = await res.text();
  //       setResponseData(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (transactionId) {
  //     fetchData();
  //   }
  // }, [transactionId]);

  return (
    <div className="success">
      <div className="inner">
        {loading ? (
          <><img src={success} className="successimage" alt="Success" /><h5>{transId}</h5></>
        ) : (
          <p>{responseData}</p>
        )}
      </div>
    </div>
  );
}

export default Succes;
