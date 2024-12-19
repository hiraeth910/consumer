import  { useState } from "react";
import Tesseract from "tesseract.js";
import './trans.css'
import logo from '../assets/app_icon.png'
const TransactionExtractor = () => {
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      setError("");
      Tesseract.recognize(file, "eng", {
        logger: (info) => console.log(info),
      })
        .then(({ data: { text } }) => {
          const regex = /(tms|tmx)\d+/gi;
          const matches = text.match(regex);
          if (matches) {
            const foundTransactionId = matches[0];
            setTransactionId(""); // Clear input first
            setTimeout(() => setTransactionId(foundTransactionId), 0); // Update with the extracted ID
            setIsValid(true);
          } else {
            setError("No valid transaction ID found in the image.");
            setIsValid(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Error processing the image. Please try again.");
          setLoading(false);
        });
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setTransactionId(value);

    // Expected length of the transaction ID
    const expectedLength = 16;

    // Validate real-time
    if (!value.startsWith("tms") && !value.startsWith("tmx")) {
      setError("Invalid transaction ID");
      setIsValid(false);
    } else if (value.length > expectedLength) {
      setError("Invalid transaction ID");
      setIsValid(false);
    } else if (value.length === expectedLength) {
      const regex = /^(tms|tmx)\d+$/i;
      if (regex.test(value)) {
        setError("");
        setIsValid(true);
      } else {
        setError("Invalid transaction ID");
        setIsValid(false);
      }
    } else {
      setError(""); // Clear error while typing valid characters
      setIsValid(false);
    }
  };

  const handleSubmit = () => {
    if (isValid && transactionId) {
      const redirectUrl = `https://consumer.telemoni.in/redirect-url/${transactionId}`;
      window.location.href = redirectUrl;
    }
  };

  return (
    <div className="success">
      <header className="header" style={{ backgroundColor: "lightSkyBlue" }}>
        <div className="brand" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            className="brand-logo"
            style={{ height: "50px", marginRight: "10px" }}
          />
          <h1 className="brand-name">Telemoni</h1>
        </div>
      </header>
      <div className="inner">
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Transaction ID Extractor
      </h2>

      <div>
        <label>
          Upload a screenshot:
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </label>
      </div>

      <p style={{ textAlign: "center" }}>OR</p>

      <div>
        <label>
          Enter transaction ID manually:
          <input
            type="text"
            value={transactionId}
            onChange={handleInputChange}
            placeholder="e.g., tms1234567890"
            style={{
              padding: "8px",
              margin: "10px 0",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </label>
      </div>

      {error && (
        <p style={{ color: "red", margin: "5px 0" }}>{error}</p>
      )}

      {loading && <p>Processing image... Please wait.</p>}

      {isValid && !loading && (
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Submit
        </button>
      )}
    </div>
  </div>);
};

export default TransactionExtractor;
