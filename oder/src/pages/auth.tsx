import { useState, FormEvent} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.css';


const AuthForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tel, setTel] = useState('');
  const navigate = useNavigate();


 const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  console.log('Sign Up data:', { email, password, phone: tel });

  try {
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, phone: tel }),
    });

    const data = await res.json();
    console.log('Response from register API:', data);

    if (res.ok) {
      alert('Đăng ký thành công!');
      setIsRightPanelActive(false);
    } else {
      alert('Đăng ký thất bại: ' + data.message);
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Lỗi kết nối server');
  }
};


 const handleSignIn = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });

    const { token, role } = response.data;


    // ✅ Lưu trạng thái đăng nhập vào localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('isAuthenticated', 'true'); // ✅ thêm dòng này để xác thực frontend

    // Điều hướng theo vai trò
    if (role === 'admin') {
      navigate('/Admin');
    } else {
      navigate('/');
    }
  } catch (err: any) {
    alert(err.response?.data?.message || 'Đăng nhập thất bại!');
  }
};



  return (
    <div className={`containerlogin ${isRightPanelActive ? 'right-panel-active' : ''}`}>
      <div className="from-container sign-up-container">
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="from-container sign-in-container">
        <form onSubmit={handleSignIn}>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(false)}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
