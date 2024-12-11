import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTelegramLink } from '../utils/getapi';

function Succes() {
  const [responseData, setResponseData] = useState(null);
  const [imageAlt, setImageAlt] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const { transId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTelegramLink(transId);
        console.log('API Response:', response);

        if (response?.alt) {
          // If 'alt' exists, it's an image
          setIsImage(true);
          setImageAlt(response.alt);
          setResponseData(`data:image/jpeg;base64,${response.link}`);
        } else if (response?.link) {
          // It's a joining link
          setIsImage(false);
          setResponseData(response.link);
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
      <div className="inner">
        {loading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : isImage ? (
          <div className="imageContainer">
            <img
              src={responseData}
              alt={imageAlt || 'Generated Image'}
              style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc' }}
            />
            {imageAlt && <p>{imageAlt}</p>}
          </div>
        ) : (
          <div className="linkContainer">
            <p className="linkMessage">
              This is your paid channel link. Click to join and get paid updates 👇
            </p>
            <a
              href={responseData}
              target="_blank"
              rel="noopener noreferrer"
              className="responseLink"
            >
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
