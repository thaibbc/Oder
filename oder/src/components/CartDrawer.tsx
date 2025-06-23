// components/CartDrawer.tsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface FoodItem {
  id: string;
  name: string;
  price: number;
}

interface CartDrawerProps {
  cartItems: FoodItem[];
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ cartItems, open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box width={450} p={2}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ flex: 1 }}>Giỏ Hàng</Typography>
            <CloseIcon onClick={onClose} sx={{ cursor: 'pointer', textAlign: 'right' }}/>
        </Box>
        <List>
          {cartItems.length === 0 ? (
            <Typography>Chưa có món nào trong giỏ hàng</Typography>
          ) : (
            cartItems.map(item => (
              <ListItem key={item.id} divider>
                <ListItemText
                  primary={item.name}
                  secondary={`Giá: ${item.price.toLocaleString()} VND`}
                />
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
