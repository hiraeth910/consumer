import './success.css';
import success from '../assets/success.png';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTelegramLink } from '../utils/getapi';
import logo from '../assets/app_icon.png';

function Succes() {
  const [responseData, setResponseData] = useState(null);
  const [altData, setAltData] = useState(null); // State to store alt data
  const [loading, setLoading] = useState(true);
  const { transId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTelegramLink(transId); // Call the API function
        if (transId[2] === 'x') {
          const { link, alt } = response;
          setResponseData(link); // Base64 string for the image
          setAltData(alt); // Alt text for the image
        } else {
          let {link} = response
          setResponseData(link); // Joining link
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [transId]);

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
        {loading ? (
          <>
            <img src={success} className="successimage" alt="Success" />
            <h5>{transId}</h5>
          </>
        ) : transId[2] === 'x' ? (
          // Render Base64 image and alt text
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
          // Render joining link for other cases
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

export default Succes;