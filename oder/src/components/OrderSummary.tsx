import { Box, Typography, Divider, IconButton, Avatar, Stack } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useCart } from '../context/CartContext';

export default function OrderSummary() {
  const { cartItems, increaseQuantity, decreaseQuantity } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'string' ? Number(item.price.replace(/[^\d]/g, '')) : item.price;
      const quantity = Number(item.quantity) || 0;
      return total + price * quantity;
    }, 0);
  };

  const shippingFee = 24000;
  const total = calculateTotal();
  const finalAmount = total + shippingFee;

  return (
    <Box sx={{ p: 3, borderRadius: 2, boxShadow: 2, bgcolor: 'white', mt: 4, width: '62.6%', marginLeft: '27.5%' }}>
      <Typography variant="h6" gutterBottom>
        Tóm tắt đơn hàng
      </Typography>

      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item) => (
          <Stack key={item._id} direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <IconButton
              size="small"
              onClick={() => decreaseQuantity(item._id)}
              disabled={item.quantity <= 1}
              aria-label="Giảm số lượng"
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography>{item.quantity}</Typography>

            <IconButton
              size="small"
              onClick={() => increaseQuantity(item._id)}
              aria-label="Tăng số lượng"
            >
              <AddIcon fontSize="small" />
            </IconButton>

            <Avatar
              variant="rounded"
              src={item.image}
              alt={item.name}
              sx={{ width: 56, height: 56, borderRadius: 1 }}
            />

            <Box sx={{ flexGrow: 1 }}>
              <Typography>{item.name}</Typography>
            </Box>

            <Box textAlign="right">
              <Typography sx={{ fontWeight: 500 }}>{(item.price * item.quantity).toLocaleString()} ₫</Typography>
              {item.originalPrice && item.originalPrice > item.price && (
                <Typography color="text.secondary" sx={{ textDecoration: 'line-through', fontSize: 14 }}>
                  {item.originalPrice.toLocaleString()} ₫
                </Typography>
              )}
            </Box>
          </Stack>
        ))
      ) : (
        <Typography>Giỏ hàng trống</Typography>
      )}

      <Divider sx={{ my: 2 }} />

      <Box display="flex" justifyContent="space-between">
        <Typography>Tổng cộng</Typography>
        <Typography>{total.toLocaleString()} ₫</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography>Phí áp dụng</Typography>
        <Typography>{shippingFee.toLocaleString()} ₫</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight={600}>
          Thành tiền
        </Typography>
        <Typography variant="subtitle1" fontWeight={600}>
          {finalAmount.toLocaleString()} ₫
        </Typography>
      </Box>
    </Box>
  );
}
