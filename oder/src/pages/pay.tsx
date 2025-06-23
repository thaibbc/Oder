import AppHeader from '../components/AppHeader';
import OrderSummary from '../components/OrderSummary';
import PaymentDetails from '../components/PaymentDetails';
import PromoSection from '../components/PromoSection';
import CheckoutFooter from '../components/CheckoutFooter';
import {
  Box,
  Typography,
  Paper,
  TextField,
} from '@mui/material';

export default function Pay() {
  return (
    <Box>
      <AppHeader />
      <Box sx={{ maxWidth: 800, margin: 'auto', p: 3, marginRight:'10%', pb: '100px' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Bước cuối cùng - Thanh toán
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          KFC - Đường Nguyễn Văn Cừ
        </Typography>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Giao hàng đến
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Thời gian giao hàng đến
            <Typography component="span" fontWeight="bold" color="text.primary">
              {' '}25 phút (cách 3 km)
            </Typography>
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box
              component="img"
              src="https://cdn.xanhsm.com/2025/03/6a2a6beb-tra-sua-quan-5-6.jpg" // thay thế bằng ảnh bản đồ thực tế nếu có
              alt="Map"
              sx={{
                    width: 250,
                    height: 250,
                    borderRadius: 2,
                    boxShadow: 3,
                    objectFit: 'cover',
                }}
            />

            <Box sx={{ flexGrow: 1 }}>
              <TextField
                label="Địa chỉ"
                fullWidth
                value="18 Phan Văn Trị, P.2, Q.5, Hồ Chí Minh, 70000, Vietnam"
                InputProps={{ readOnly: true }}
                margin="normal"
              />
              <TextField
                label="Chi tiết địa chỉ"
                fullWidth
                value="18 Phan Văn Trị - 18 Phan Văn Trị, P.2, Q.5, Hồ Chí Minh, 70000, Vietnam"
                margin="normal"
                multiline
              />
              <TextField
                label="Số Điện Thoại"
                fullWidth
                placeholder="vd: 0903 xxx xxx"
                margin="normal"
                multiline
              />
              <TextField
                label="Lưu ý cho tài xế"
                fullWidth
                placeholder="yêu cầu về món ăn"
                margin="normal"
              />
            </Box>
          </Box>
        </Paper>
      </Box>
      <OrderSummary />
      <PaymentDetails />
      <PromoSection/>
      <CheckoutFooter totalPrice={85000} originalPrice={109000} />
    </Box>
  );
}
