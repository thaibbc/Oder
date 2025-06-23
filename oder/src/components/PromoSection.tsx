import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import { useState } from 'react';

const PromoSection = () => {
  const [promoCode, setPromoCode] = useState('');
  const [selectedCode, setSelectedCode] = useState('');

  const promos = [
    {
      code: 'MOMOGF15',
      title: 'MoMo | Giảm 10%',
      description: 'Có hiệu lực từ 2025-05-01 đến 2025-05-31'
    }
  ];

  return (
    <Box sx={{ p: 2, borderRadius: 2, boxShadow: 2, bgcolor: 'white', mt: 4, width:'62.7%', marginLeft:'27.5%', marginBottom:'10%'}}>
      <Typography variant="h6" gutterBottom>
        Khuyến mãi
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Thêm mã khuyến mãi"
          size="small"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <Button
          variant="contained"
          disabled={!promoCode}
          onClick={() => setSelectedCode(promoCode)}
        >
          Áp dụng
        </Button>
      </Stack>

      {/* Danh sách khuyến mãi */}
      {promos.map((promo) => (
        <Card
          key={promo.code}
          variant="outlined"
          sx={{
            borderRadius: 2,
            borderColor: selectedCode === promo.code ? 'green' : 'grey.300',
            position: 'relative',
            mb: 2
          }}
        >
          <CardContent>
            <Typography fontWeight="bold">{promo.title}</Typography>
            <Typography sx={{ color: 'green' }}>Mã khuyến mãi: {promo.code}</Typography>
            <Typography variant="body2" color="text.secondary">
              {promo.description}
            </Typography>
          </CardContent>

          <Button
            size="small"
            variant="outlined"
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              borderColor: 'green',
              color: 'green'
            }}
            onClick={() => setSelectedCode(promo.code)}
          >
            ÁP DỤNG
          </Button>
        </Card>
      ))}
    </Box>
  );
};

export default PromoSection;
