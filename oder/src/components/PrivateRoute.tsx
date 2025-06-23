import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    alert('Bạn cần đăng nhập để mua sản phẩm');
    return <Navigate to="/Auth" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
