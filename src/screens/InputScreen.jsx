import './success.css';
import success from '../assets/success.png';
import { useState } from 'react';
import logo from '../assets/app_icon.png';
import { getTelegramLink } from '../utils/getapi';

function InputScreen() {
  const [transId, setTransId] = useState(''); // State to store user input
  const [responseData, setResponseData] = useState(null);
  const [altData, setAltData] = useState(null); // State to store alt data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!transId) {
      alert('Please enter a transaction ID!');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await getTelegramLink(transId); // Call the API function
      const { link, alt } = response;

      if (transId[2] === 'x') {
        setResponseData(link); // Base64 string for the image
        setAltData(alt); // Alt text for the image
      } else {
        setResponseData(link); // Joining link
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(responseData);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="success">
      <header className="header" style={{ backgroundColor: 'lightSkyBlue' }}>
        <div className="brand">
          <img src={logo} alt="Logo" className="brand-logo" />
          <h1 className="brand-name">Telemoni</h1>
        </div>
      </header>

      <div className="inner">
        {!responseData ? (
         <div className="inputContainer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <h2>Enter your Transaction ID</h2>
            <input
              type="text"
              placeholder="Transaction ID"
              value={transId}
              onChange={(e) => setTransId(e.target.value)}
              className="transactionInput"
              style={{ width: '300px', height: '40px', fontSize: '16px', padding: '10px' }}
            />
            <button onClick={fetchData} className="fetchButton" style={{ padding: '10px 20px', fontSize: '16px' }}>
              Submit
            </button>
          </div>
        ) : loading ? (
          <div className="loadingContainer">
            <img src={success} className="successimage" alt="Loading..." />
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="errorContainer">
            <p className="errorMessage">{error}</p>
          </div>
        ) : transId[2] === 'x' ? (
          <div className="imageContainer">
            <img
              src={responseData}
              alt={altData}
              className="responseImage"
              style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }}
            />
            <p className="altText" style={{ textAlign: 'center', marginTop: '10px' }}>{altData}</p>
          </div>
        ) : (
          <div className="linkContainer">
            <img src={success} className="successimage" alt="Success" />
            <p className="linkMessage">This is your paid channel link click to join and get paid updates 👇</p>

            <a
              href={responseData}
              target="_blank"
              rel="noopener noreferrer"
              className="responseLink"
            >
              <button style={{ backgroundColor: 'green', padding: '15px', borderRadius: '10px', margin: '0 auto' }}>
                Click to join
              </button>
            </a>

            <button onClick={handleCopy} className="copyButton">
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputScreen;
