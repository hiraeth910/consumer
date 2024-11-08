import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Course.css';
import { setCart } from '../../redux/appSlice';
import logo from '../../assets/app_icon.png';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const cart = useSelector((state) => state.app.cart);
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const userName = useSelector((state) => state.app.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courses = [
    { id: 1, title: 'Blender', description: 'Learn the basics of Blender.', image: 'https://www.blender.org/wp-content/uploads/2019/07/blender_vfx-1280x720.jpg?x12104', author: 'John Doe', price: 600 },
    { id: 2, title: 'Unreal Engine', description: 'Learn the basics of Unreal Engine.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW-JsYLzvLhx2fWrSbYO4GuD8KYHkuwhB4lg&s', author: 'Jane Smith', price: 400 },
    { id: 3, title: 'After Effects', description: 'Learn the basics of After Effects.', image: 'https://cdn-dkepej.nitrocdn.com/xHPizjaXJNONuYnLnfsGSUCsMnIlzOEq/assets/images/optimized/rev-ef469ea/blog.frame.io/wp-content/uploads/2023/02/insider-tips-after-effects.jpg', author: 'Mike Brown', price: 1000 },
    { id: 4, title: 'Adobe Premiere Pro', description: 'Learn Premiere Pro Video Editing.', image: 'https://img-c.udemycdn.com/course/750x422/4060610_17f8.jpg', author: 'Mike Brown', price: 449 },
  
  ];

  const handleAddToCart = (course) => {
    if (cart) {
      setSelectedCourse(course);
      setShowCourseModal(!showCourseModal);
      setShowPopup(true);
    } else {
      dispatch(setCart(course));
      alert(`${course.title} added to cart`);
    }
  };
  const handleTerms = () => {
    navigate('/terms&conditions');
  };

  const handlePrivacyPolicy = () => {
    navigate('/privacy-policy');
  };

  const handleContactUs = () => {
    navigate('/contactus')
  };
  const handleRefundPolicy = () => {
    navigate('/Refund-policy');
  };
  const confirmReplace = () => {
    dispatch(setCart(selectedCourse));
    setShowPopup(false);
    alert(`${selectedCourse.title} added to cart`);
  };

  const cancelReplace = () => {
    setShowPopup(false);
  };

  const openCourseModal = (course) => {
    setSelectedCourse(course);
    setShowCourseModal(true);
  };

  const closeCourseModal = () => {
    setShowCourseModal(false);
  };

  const goToCart = () => {
    if (cart) {
      navigate('/c');
    } else {
      setShowCartPopup(true);
    }
  };

  const closeCartPopup = () => {
    setShowCartPopup(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };


  return (
    <div className="main-container">
      <header className="header" style={{ backgroundColor: 'lightSkyBlue' }}>
        <div className="brand">
          <img src={logo} alt="Logo" className="brand-logo" />
          <h1 className="brand-name">Telemoni</h1>
        </div>
        <div className="login-icon">
          {isLoggedIn ? (
            <span className="user-name">{userName}</span>
          ) : (
            <button className="login-button" onClick={handleLogin}>Login</button>
          )}
        </div>
      </header>
      <div className="courses-grid" >
        {courses.map((course) => (
          <div key={course.id} className="course-card" onClick={() => openCourseModal(course)}>
            <div className="imagecontainer">
              <img src={course.image} alt={course.title} className="course-image" />
            </div>
            <div className="course-content">
              <div className="course-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="course-title">{course.title}</div>
                <div className="course-price">₹{course.price}</div>
              </div>

              <p className="course-description">{course.description}</p>
              <button className="add-to-cart-btn" onClick={(e) => {
                e.stopPropagation(); // Prevents modal from opening
                handleAddToCart(course);
              }}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <footer className="footer">
        <span className="footer-link" onClick={handleTerms}>Terms and Conditions</span>
        <span className="footer-link" onClick={handlePrivacyPolicy}>Privacy Policy</span>
        <span className="footer-link" onClick={handleContactUs}>Contact Us</span>
        <span className="footer-link" onClick={handleRefundPolicy}>Refund Policy</span>
      </footer>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>An item is already in the cart. Do you want to replace it?</p>
            <button onClick={confirmReplace} className="popup-btn confirm">OK</button>
            <button onClick={cancelReplace} className="popup-btn cancel">Cancel</button>
          </div>
        </div>
      )}

      {showCourseModal && selectedCourse && (
        <div className="modal-overlay" onClick={closeCourseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedCourse.image} alt={selectedCourse.title} className="modal-image" />
            <div className="course-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="course-title">{selectedCourse.title}</div>
              <div className="course-price">₹{selectedCourse.price}</div>
            </div>
            <p className="modal-author">Author: {selectedCourse.author}</p>
            <p className="modal-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquet sapien, ut egestas urna cursus a.
            </p>
            <button onClick={() => handleAddToCart(selectedCourse)} className="modal-add-to-cart-btn">
              Add to Cart
            </button>
            <button onClick={closeCourseModal} className="modal-close-btn">Close</button>
          </div>
        </div>
      )}

      {showCartPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Add an item to proceed to the cart</p>
            <button onClick={closeCartPopup} className="popup-btn confirm">OK</button>
          </div>
        </div>
      )}

      <div className="cart-icon" onClick={goToCart}>🛒</div>

      
    </div>
  );
};


export default Courses;
