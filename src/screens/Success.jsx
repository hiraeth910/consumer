import './success.css';
import success from '../assets/success.png';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTelegramLink } from '../utils/getapi';

function Succes() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isImage, setIsImage] = useState(true); // Track if the link is an image
  const { transId } = useParams();
  const {ans,setans} = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTelegramLink(transId);

        if (response.status===202) {
          // Check if it's a base64 image (based on the prefix)
          if (response.data.link.startsWith('/9j/')) {
            setIsImage(true);
            setans(response.data.alt)
            setResponseData(`data:image/jpeg;base64,${response.data.link}`);
          } else {
            setIsImage(false);
            setResponseData(response.link); // Treat as a regular link
          }
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
    if (responseData) {
      navigator.clipboard.writeText(responseData);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="success">
      <div className="inner">
        {loading ? (
          <>
            <img src={success} className="successimage" alt="Success" />
            <h5>{transId}</h5>
          </>
        ) : isImage ? (
          // Render image for 202 status
          <div className="imageContainer" style={{ textAlign: 'center' }}>
            <img
              src={responseData}
              alt="Generated Image"
              style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc' }}
            />
            <p>{ans}</p>
          </div>
        ) : (
          // Render joining link for 200 or 201
          <div className="linkContainer">
            <img src={success} className="successimage" alt="Success" />
            <p className="linkMessage">
              This is your paid channel link. Click to join and get paid updates 👇
            </p>
            <a href={responseData} target="_blank" rel="noopener noreferrer" className="responseLink">
              <button
                style={{
                  backgroundColor: 'green',
                  padding: '15px',
                  borderRadius: '10px',
                  margin: '0 auto',
                }}
              >
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
