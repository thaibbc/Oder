import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './pages/home';
import Auth from './pages/auth';
import Admin from './pages/admin';
import GrabFoodPromo from './pages/GrabFoodPromo';
import Pay from './pages/pay';
import PrivateRoute from './components/PrivateRoute';
import './App.css'
import { isTokenExpired } from './utils/tokenHelper';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
      navigate('/Auth');
    }
  }, []);

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Admin" element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        } />
        <Route path="/Oder" element={
          <PrivateRoute>
            <GrabFoodPromo />
          </PrivateRoute>
        } />
        <Route path="/pay" element={
          <PrivateRoute>
            <Pay />
          </PrivateRoute>
        } />
      </Routes>
  );
}

export default App;
