import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Dòng tiêu đề có style riêng
const Heading = styled.h2`
  font-weight: bold;
  font-size: 2.57142857rem;
  color: #00b14f;
  margin-bottom: 40px;
`;

// Danh sách dữ liệu món ăn
const foodList = [
  { title: 'Weekend Treats', image: 'https://gourmetbydesign.com.au/wp-content/uploads/2023/08/Tea-Treats-Hamper-5-600x450.jpg.webp' },
  { title: 'Gà rán', image: 'https://acfood.vn/image/catalog/bot-chien-karaage-tvp1.png' },
  { title: 'Bánh Mì', image: 'https://baovinhlong.com.vn/file/e7837c027f6ecd14017ffa4e5f2a0e34/dataimages/201908/original/images2226890_1.jpg' },
  { title: 'Đồ ăn nhẹ', image: 'https://www.thethaothientruong.vn/uploads/2023/9-mon-an-vat-sieu-ngon.jpg' },
  { title: 'Đồ uống lạnh', image: 'https://file.hstatic.net/200000119135/file/1200x900__3___10__4a2d6611318c45f7afa65fba8d03e6dd_grande.jpg' },
  { title: 'Rau trộn', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdZc7wUVGGItrP35hJBEIEeybn5oQtxY4SbQ&s' },
  { title: 'Hủ tiếu', image: 'https://file.hstatic.net/200000823005/file/uc-nau-nuoc-leo-hu-tieu-thom-ngon__1__394fa36e8a3f4b94af96bf87592bbaf5_grande.jpg' },
  { title: 'Thịt gà', image: 'https://bizweb.dktcdn.net/thumb/grande/100/443/453/articles/4-6f7839ca-d73f-4739-b52f-3930fbb490b9.jpg?v=1726477737227' },
  { title: 'Thịt', image: 'https://cdn.24h.com.vn/upload/4-2023/images/2023-11-17/1700189212-xa-xiu-1-1699953697146429755187-width600height450.jpg' },
  { title: 'Cơm tấm', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQITnd09Zy3g6NWvIwgcXZ1aMeO29F-fHCLA&s' },
  { title: 'Cơm', image: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/News/News_expe_3632/3632.png?version=220735' },
  { title: 'Trà sữa', image: 'https://image.tienphong.vn/w890/uploads/2019/07/5d2597c1d4eb8-hhtxmeete-cover-600x450.jpg' },
  { title: 'Cháo', image: 'https://vinasoup.com.vn/uploads/details/2020/06/images/meo-nau-chao-mau-nhu-cho-be-an-dam.png' },
  { title: 'Hiso Party', image: 'https://donguoicoldcut.com/wp-content/uploads/2023/04/set1-600x450-1.png' },
  { title: 'Pizza', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtrsunB2jPt1uE7iRog5tame2I-2RqE5S_nA&s' },
  { title: 'Mì Ý', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHgzOVSxY8oWGpyu4R_jVTgOVY-UfdnHIzUg&s' },
];

const FoodGrid: React.FC = () => {
  const navigate = useNavigate(); // ✅ Hook điều hướng

  const handleClick = (item: any) => {
    navigate('/oder', { state: item }); // ✅ Chuyển hướng với dữ liệu món ăn nếu muốn
  };
  return (
    <Container sx={{mt: 135, mr: -10}}>
      <Heading style={{marginRight:'45%'}}>There's something for everyone!</Heading>
      <Grid container spacing={3}>
        {foodList.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Card elevation={0} sx={{ cursor: 'pointer' }} onClick={() => handleClick(item)}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.title}
                sx={{
                  height: 180,
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: 1,
                  backgroundColor: '#f5f5f5', // Nền giúp ảnh nhỏ không bị lệch khung
                }}
              />
              <CardContent sx={{ textAlign: 'center', padding: '8px 0 0 0' }}>
                <Typography variant="body2" fontWeight={500}>
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FoodGrid;
