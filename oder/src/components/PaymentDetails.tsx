import {
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Avatar,
  Stack
} from '@mui/material';
import { useState } from 'react';

const paymentOptions = [
  { label: 'Momo', value: 'momo', icon: 'https://play-lh.googleusercontent.com/uCtnppeJ9ENYdJaSL5av-ZL1ZM1f3b35u9k8EOEjK3ZdyG509_2osbXGH5qzXVmoFv0' },
  { label: 'VNPAY', value: 'vnpay', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s' },
  { label: 'Tiền mặt', value: 'cash', icon: 'https://img.pikbest.com/element_our/20230221/bg/ebab41b9c1ab9.png!w700wp' }
];

export default function PaymentDetails() {
  const [paymentMethod, setPaymentMethod] = useState('momo');

  return (
    <Box sx={{ p: 2, borderRadius: 2, boxShadow: 2, bgcolor: 'white', mt: 4 , width:'62.6%', marginLeft:'27.5%'}}>
      <Typography variant="h6" gutterBottom>
        Chi tiết thanh toán
      </Typography>

      {/* Phương thức thanh toán */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Phương thức thanh toán</InputLabel>
        <Select
          value={paymentMethod}
          label="Phương thức thanh toán"
          onChange={(e) => setPaymentMethod(e.target.value)}
          renderValue={(selected) => {
            const option = paymentOptions.find(o => o.value === selected);
            return (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar src={option?.icon} sx={{ width: 24, height: 24 }} />
                <Typography>{option?.label}</Typography>
              </Stack>
            );
          }}
        >
          {paymentOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar src={option.icon} sx={{ width: 24, height: 24 }} />
                <Typography>{option.label}</Typography>
              </Stack>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Hồ sơ */}
      <FormControl fullWidth>
        <InputLabel>Hồ sơ</InputLabel>
        <Select
          defaultValue="private"
          label="Hồ sơ"
          renderValue={() => (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar sx={{ width: 24, height: 24 }}>
                <img src="/user.png" alt="user" width="100%" />
              </Avatar>
              <Typography>Riêng tư</Typography>
            </Stack>
          )}
        >
          <MenuItem value="private">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar />
              <Typography>Riêng tư</Typography>
            </Stack>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
