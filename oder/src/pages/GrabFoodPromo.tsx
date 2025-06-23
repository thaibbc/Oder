import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Breadcrumbs,
  Link,
  Button,
  Drawer,
  IconButton,
  TextField,
} from '@mui/material';
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import AppHeader from '../components/AppHeader';

import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';

// **Thêm dòng import này để lấy hàm addToCart từ context**
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer'


// const products = [
//   {
//     id: 1,
//     name: "Bò nướng lá lốt",
//     price: 150000,
//     imageUrl: "https://fujifoods.vn/wp-content/uploads/2021/05/bo-nuong-la-lot-1-1.jpg",
//     description: "Thịt bò ướp gia vị, cuốn lá lốt nướng thơm ngon đậm đà.",
//   },
//   {
//     id: 2,
//     name: "Gà nướng mật ong",
//     price: 200000,
//     imageUrl: "https://i-giadinh.vnecdn.net/2022/11/24/Thanh-pham-1-1-7983-1669287068.jpg",
//     description: "Gà nướng mềm thơm với mật ong tự nhiên ngọt dịu.",
//   },
//   {
//     id: 3,
//     name: "Cá hồi nướng sốt Teriyaki",
//     price: 250000,
//     imageUrl: "https://haisan.vivusea.com/upload/images/article//ca-hoi-sot-teriyaki.jpg",
//     description: "Cá hồi tươi nướng cùng sốt Teriyaki đậm đà hương vị Nhật.",
//   },
//   {
//     id: 4,
//     name: "Sườn nướng BBQ",
//     price: 180000,
//     imageUrl: "https://static-images.vnncdn.net/files/publish/2022/11/16/thum-mon-ngon-1-300.png?width=0&s=b8LgacChl4E8yxdIBM7mWg",
//     description: "Sườn heo nướng BBQ cay ngọt, giòn rụm và thơm lừng.",
//   },
//   {
//     id: 5,
//     name: "Salad trộn dầu giấm",
//     price: 120000,
//     imageUrl: "https://i-giadinh.vnecdn.net/2021/10/13/saladtron-1634096027-8296-1634096305.jpg",
//     description: "Salad tươi mát với sốt dầu giấm thanh nhẹ, tốt cho sức khỏe.",
//   },
//   {
//     id: 6,
//     name: "Cơm chiên dương châu",
//     price: 100000,
//     imageUrl: "https://daotaobeptruong.vn/wp-content/uploads/2021/02/nguoc-goc.jpg",
//     description: "Cơm chiên vàng ươm với nhiều loại rau củ và thịt thập cẩm.",
//   },
//   {
//     id: 7,
//     name: "Phở bò tái",
//     price: 90000,
//     imageUrl: "https://adamquy.com/wp-content/uploads/2023/07/to-pho-bo-tai.jpg",
//     description: "Phở truyền thống với nước dùng đậm đà và bò tái mềm.",
//   },
//   {
//     id: 8,
//     name: "Bún chả Hà Nội",
//     price: 110000,
//     imageUrl: "https://cdn.buffetposeidon.com/app/media/uploaded-files/090724-bun-cha-ha-noi-buffet-poseidon-1.jpeg",
//     description: "Bún chả đặc trưng Hà Nội với chả nướng thơm ngon, nước chấm chua ngọt.",
//   },
//   {
//     id: 9,
//     name: "Chả giò chiên giòn",
//     price: 80000,
//     imageUrl: "https://cdn-bafil.nitrocdn.com/brIjHWLgwndqujcHHxaCshZRYHXCVPHO/assets/images/optimized/rev-633ecd2/doiduavang.vn/wp-content/uploads/2024/01/nem-ran-1-1516-phunutoday.jpg",
//     description: "Chả giò giòn tan, nhân đầy đủ với thịt và rau củ tươi ngon.",
//   },
// ];






export default function FoodPromoPage() {
  const { addToCart } = useCart(); // Lấy hàm addToCart từ context

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]); 

  useEffect(() => {
      // Lấy danh sách sản phẩm từ API khi component mount
      fetch("http://localhost:5000/api/products")
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error('Lỗi lấy sản phẩm:', err));
    }, []);

  const handleOpenDrawer = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setQuantity(1);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedProduct(null);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      // Sử dụng hàm addToCart từ context để thêm món vào giỏ hàng
      addToCart({ 
        _id: selectedProduct._id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity,
        image: selectedProduct.imageUrl,
      });
      handleCloseDrawer();
    }
  };

  return (
    <Box>
      <AppHeader />
      <Box mt={1} mb={3} px={4} sx={{ width: '118%'}}>
        <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2 ,}}>
          {/* Breadcrumb */}
          <Breadcrumbs>
            <Link underline="hover" color="inherit">Trang chủ</Link>
            <Link underline="hover" color="inherit">Nhà hàng</Link>
            <Typography color="text.primary">KFC - Đường Nguyễn Văn Cừ</Typography>
          </Breadcrumbs>

          {/* Tên nhà hàng */}
          <Typography variant="h4" fontWeight="bold" mt={1}  sx={{marginRight:'66.8%'}}>
            KFC - Đường Nguyễn Văn Cừ
          </Typography>

          {/* Mô tả nhanh */}
          <Typography color="text.secondary" mt={0.5}  sx={{marginRight:'83.8%'}}>
            Thức ăn nhanh, Cơm, Món Quốc Tế
          </Typography>

          {/* Info icons */}
          <Box display="flex" alignItems="center" gap={2} mt={1}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <StarIcon sx={{ color: '#FFA726' }} />
              <Typography>4.3</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <AccessTimeIcon fontSize="small" />
              <Typography>15 phút</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <LocalOfferIcon fontSize="small" />
              <Typography>0.4 km</Typography>
            </Box>
          </Box>

          {/* Giờ mở cửa */}
          <Typography mt={1}  sx={{marginRight:'83.2%'}}>
            <strong>Giờ mở cửa:</strong> Hôm nay 10:00 - 22:00
          </Typography>

          {/* Ưu đãi */}
          <Box mt={1} display="flex" alignItems="center" gap={1}>
            <LocalOfferIcon color="success" />
            <Typography color="green">Tận hưởng ưu đãi</Typography>
            <Link href="#" underline="hover">Xem chi tiết</Link>
          </Box>

          {/* Ngày giao & thời gian */}
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={3}>
              <Box border="1px solid #ccc" borderRadius={2} p={2} display="flex" alignItems="center" gap={1}>
                <CalendarMonthIcon fontSize="small" />
                <Typography>Ngày giao hàng: Hôm nay</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box border="1px solid #ccc" borderRadius={2} p={2} display="flex" alignItems="center" gap={1}>
                <AccessTimeIcon fontSize="small" />
                <Typography>Thời gian giao: Ngay bây giờ</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Sản phẩm */}
        <Box mt={4} pb={4} ml={8.5}>
          <Typography variant="h4" gutterBottom fontWeight='bold' sx={{ paddingBottom: '10px', marginBottom:'50px', marginLeft: '-15%'}}>
            Sản phẩm 
          </Typography>
          <Grid container spacing={8}>
            {products.map((prod) => (
              <Grid item xs={12} sm={6} md={4} key={prod._id}>
                <Card>
                  <CardMedia component="img" height="180" image={prod.imageUrl} alt={prod.name} />
                  <CardContent>
                    <Typography variant="h6">{prod.name}</Typography>
                    <Typography color="primary" fontWeight="bold">
                      {prod.price.toLocaleString()}₫
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 1 }}
                      fullWidth
                      onClick={() => handleOpenDrawer(prod)}
                    >
                      Đặt hàng
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Drawer đặt hàng */}
        <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
          <Box sx={{ width: 350, p: 2, position: "relative", height: "100%" }}>
            {/* Header */}
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', height: 56, borderBottom: '1px solid #ddd' }}>
              {/* Icon tắt Drawer bên trái */}
              <IconButton
                onClick={handleCloseDrawer}
                sx={{ position: 'absolute', left: 8 }}
                aria-label="close drawer"
              >
                <CloseIcon />
              </IconButton>

              {/* Tiêu đề canh giữa */}
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

            {/* Nội dung sản phẩm */}
            {selectedProduct ? (
              <>
                <Box mt={2} textAlign="center">
                  {/* Ảnh sản phẩm */}
                  <Box
                    component="img"
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    sx={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 2 }}
                  />
                </Box>

                {/* Tên, giá và mô tả */}
                <Box mt={2}>
                  <Typography variant="h6" fontWeight="bold">
                    {selectedProduct.name}
                  </Typography>
                  {/* Mô tả món */}
                  {selectedProduct.description && (
                    <Typography color="text.secondary" mt={1}>
                      {selectedProduct.description}
                    </Typography>
                  )}
                  <Typography color="primary" fontWeight="bold" mt={1}>
                    {selectedProduct.price}
                  </Typography>
                  
                </Box>

                {/* Số lượng & nút thêm */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    right: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <IconButton onClick={handleDecrease} color="primary">
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      value={quantity}
                      variant="standard"
                      inputProps={{ readOnly: true, style: { textAlign: "center" } }}
                      sx={{ width: 35 }}
                    />
                    <IconButton onClick={handleIncrease} color="primary">
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Button variant="contained" onClick={handleAddToCart}>
                    Thêm vào giỏ
                  </Button>
                </Box>
              </>
            ) : (
              <Typography mt={2}>Không có sản phẩm được chọn</Typography>
            )}
          </Box>
        </Drawer> 
      </Box>
      <Footer/>
    </Box>
  );
}
