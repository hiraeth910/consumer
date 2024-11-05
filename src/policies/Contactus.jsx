import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className="contact-us-container">
            <h1>Contact Us</h1>
            <p className="last-updated">Last updated on 01-11-2024 12:55:53</p>
            <p>You may contact us using the information below:</p>

            <div className="contact-info">
                <h2>Merchant Legal Entity Name:</h2>
                <p>CHETI VIJAY RAVI</p>

                <h2>Registered Address:</h2>
                <p>Kethavaram, 4-49, Jangareddygudem, Andhra Pradesh, PIN: 534312</p>

                <h2>Operational Address:</h2>
                <p>Kethavaram, 4-49, Jangareddygudem, Andhra Pradesh, PIN: 534312</p>

                <h2>Telephone No:</h2>
                <p><a href="tel:+91790418317">8790418317</a></p>

                <h2>Email ID:</h2>
                <p><a href="mailto:gnaneswar96g@gmail.com">gnaneswar96g@gmail.com</a></p>
            </div>
        </div>
    );
};

export default ContactUs;
