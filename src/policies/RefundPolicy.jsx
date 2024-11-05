import './refund.css';

const RefundPolicy = () => {
    return (
        <div className="refund-policy-container">
            <h1>Refund and Cancellation Policy</h1>
            <p>This refund and cancellation policy outlines the terms for seeking assistance in the event of non-receipt of products purchased through our Platform.</p>

            <div className="refund-policy-section">
                <h2>1. No Refunds or Returns</h2>
                <p>
                    We do not provide refunds or accept returns once a purchase is made. Please carefully review your order before completing your transaction.
                </p>
            </div>

            <div className="refund-policy-section">
                <h2>2. Non-Receipt of Product</h2>
                <p>
                    If you do not receive your product after purchase, please contact us at <a href="mailto:head.telemoni@gmail.com">head.telemoni@gmail.com</a>. Our team will assist you in ensuring delivery of the product.
                </p>
            </div>

            <div className="refund-policy-section">
                <h2>3. Product Quality</h2>
                <p>
                    We are responsible solely for delivering the product. The quality of the product is the responsibility of the seller. For any quality-related issues, please contact the seller directly.
                </p>
            </div>
        </div>
    );
};

export default RefundPolicy;
