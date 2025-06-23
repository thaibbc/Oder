import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  userEmail: string | null;
  token: string | null;
  avatarUrl: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  userEmail: null,
  token: null,
  avatarUrl: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    // Khi load app, check xem localStorage có token/email không để giữ đăng nhập
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    if (storedToken && storedEmail) {
      setToken(storedToken);
      setUserEmail(storedEmail);
      // Bạn có thể set avatar mặc định hoặc lấy avatar từ API
      setAvatarUrl('https://i.pravatar.cc/40'); // avatar giả định
    }
  }, []);

  const login = (email: string, token: string) => {
    setUserEmail(email);
    setToken(token);
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    setAvatarUrl('https://i.pravatar.cc/40'); // avatar giả định
  };

  const logout = () => {
    setUserEmail(null);
    setToken(null);
    setAvatarUrl(null);
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ userEmail, token, avatarUrl, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
