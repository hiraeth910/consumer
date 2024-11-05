import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Courses from './screens/Home/Course';
import CartPage from './screens/cart/Cart';
import LoginPage from './Log/Login';
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/c" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
