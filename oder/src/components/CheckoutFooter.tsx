import { Box, Button, Typography } from '@mui/material';
import { useCart } from '../context/CartContext';


const CheckoutFooter = ({
  onOrder = () => alert('Đặt hàng thành công!'),
}) => {
  const { calculateTotal } = useCart();

  const totalPrice = calculateTotal();
  const shippingFee = 24000;
  const finalAmount = totalPrice + shippingFee;
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1100, // nằm trên các phần khác
        bgcolor: 'white',
        borderTop: '1px solid #eee',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
        px: 4,
        py: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Box>
        <Typography variant="body1" fontWeight="bold">
          Tổng cộng:
        </Typography>
        <Box sx={{ marginLeft: '38px', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            {finalAmount.toLocaleString()} đ
          </Typography>
          {/* Nếu bạn có giá gốc tổng, có thể thêm vào đây */}
        </Box>
      </Box>

      <Button
        variant="contained"
        sx={{ bgcolor: '#00B14F', '&:hover': { bgcolor: '#009C45' }, px: 4, py: 1.5 }}
        onClick={onOrder}
      >
        <Typography fontWeight="bold" color="white">
          Đặt hàng
        </Typography>
      </Button>
    </Box>
  );
};

export default CheckoutFooter;
