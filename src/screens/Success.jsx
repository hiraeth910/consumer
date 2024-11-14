import './success.css';
import success from '../assets/success.png';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTelegramLink } from '../utils/getapi';

// eslint-disable-next-line react/prop-types
function Succes() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { transId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTelegramLink(transId); // Call the API function
        const data = response.link; // Access the 'link' property directly
        setResponseData(data);
        console.log(data);
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
          <><img src={success} className="successimage" alt="Success" /><h5>{transId}</h5></>
        ) : (
          <div className="linkContainer">
            <img src={success} className="successimage" alt="Success" />
            <p className="linkMessage">This is your paid channel link click to join and get paid updates 👇
            </p>
            <div className="linkCard">
              <a
                href={responseData}
                target="_blank"
                rel="noopener noreferrer"
                className="responseLink"
              >
                click here to join
              </a>
            </div>
              <button onClick={handleCopy} className="copyButton">
               copy
              </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Succes;
