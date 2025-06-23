
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  MenuItem,
  Select,
  Paper,
  TextField,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
} from '@mui/material';

import RoomIcon from '@mui/icons-material/Room';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'; // Giả sử bạn có context thực tế
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';


export default function AppHeader() {
  // Nếu đã có context thật, dùng cái này:
  const { cartItems } = useCart(); // từ CartContext

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev);
  };
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return Number(priceStr.toString().replace(/[,\sđ]/g, '')) || 0;
};

const totalPrice = cartItems.reduce((total, item) => {
  const price = parsePrice(item.price);
  const quantity = Number(item.quantity) || 0;
  console.log(`Item: ${item.name}, Price: ${price}, Quantity: ${quantity}, Item total: ${price * quantity}`);
  return total + price * quantity;
}, 0);

const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Nếu đã cuộn > 0px thì bật border
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'white',
          color: 'black',
          paddingBottom:'10px',
          paddingTop:'10px',
          borderBottom: 'none',
          boxShadow: scrolled ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
          {/* Logo */}
          <Box display="flex" alignItems="center">
            <Typography variant="h5" fontWeight="bold" sx={{ color: '#00B14F' }}>
              Oder
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ color: '#00B14F', ml: 0.5 }}>
              Food
            </Typography>
          </Box>

          {/* Location Input */}
          <Paper
            elevation={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 0.5,
              width: 400,
              borderRadius: 2,
              border: '1px solid #e0e0e0',
            }}
          >
            <RoomIcon sx={{ color: 'tomato', mr: 1 }} />
            <TextField
              variant="standard"
              placeholder="Nhập địa chỉ giao hàng"
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: 14 },
              }}
              fullWidth
            />
          </Paper>

          {/* Right Section */}
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton onClick={toggleDrawer} sx={{width: 50 , color: 'black',borderRadius: '5px'}}>
              <Badge
                badgeContent={cartItems.length}
                color="error"
                invisible={cartItems.length === 0}
              >
                <ShoppingBagOutlinedIcon  sx={{ color:'black', border:'black'}}/>
              </Badge>
            </IconButton>

            <Avatar sx={{ bgcolor: '#555', width: 36, height: 36 }}>T</Avatar>

            <Select
              defaultValue="EN"
              variant="outlined"
              size="small"
              sx={{ minWidth: 64, height: 36 }}
            >
              <MenuItem value="EN">EN</MenuItem>
              <MenuItem value="VN">VN</MenuItem>
            </Select>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer giỏ hàng */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 420, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', height: 56, borderBottom: '1px solid #ddd' }}>
            <IconButton onClick={toggleDrawer} sx={{ position: 'absolute', left: 8 }} aria-label="close drawer">
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                textAlign: 'center',
                fontWeight: 'bold',
                userSelect: 'none',
              }}
            >
              Thêm giỏ hàng
            </Typography>
          </Box>

          {/* Nội dung cuộn được */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            {cartItems.length === 0 ? (
              <Typography color="text.secondary">Không có đơn hàng nào</Typography>
            ) : (
              <List>
                {cartItems.map((item, index) => (
                  <ListItem key={index} alignItems="flex-start" sx={{ borderBottom: '1px solid #ddd' }}>
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 60, height: 60, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" color="black" fontWeight="bold">
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            Giá: {item.price.toLocaleString()}₫
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="text.primary">
                            Số lượng: {item.quantity}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Footer luôn ở cuối */}
          {cartItems.length > 0 && (
            <Box sx={{ p: 2, borderTop: '1px solid #ddd' }}>
              <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ mb: 0 }}>
                  Tổng tiền:
                </Typography>
                <Typography variant="h6" sx={{ mb: 0, fontWeight: 'bold' }}>
                  {totalPrice.toLocaleString()}₫
                </Typography>
              </Box>
              <Button fullWidth variant="contained" color="primary"
                onClick={() => {
                  toggleDrawer(); // Đóng Drawer nếu muốn
                  navigate('/pay', { state: { cartItems } }); // Chuyển trang
                  // clearCart();
                }}
              >
                Xem lại đơn hàng
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>


      {/* Spacer để tránh che nội dung bởi AppBar */}
      <Box sx={{ height: 96 }} />
    </>
  );
}
