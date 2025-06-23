import React, { useState } from 'react';
import { Box, Container, Typography, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const reasons = [
  { title: 'Nhanh nhất', desc: 'GrabFood cung cấp dịch vụ giao đồ ăn nhanh nhất thị trường.' },
  { title: 'Dễ dàng nhất', desc: 'Giờ đây, bạn chỉ cần thực hiện vài cú nhấp chuột hoặc chạm nhẹ là đã có thể đặt đồ ăn...' },
  { title: 'Đáp ứng mọi nhu cầu', desc: 'Từ món ăn đặc sản địa phương đến các nhà hàng được ưa thích, nhiều lựa chọn đa dạng...' },
  { title: 'Thanh toán dễ dàng', desc: 'Giao và nhận đồ ăn thật dễ dàng. Thanh toán bằng GrabPay thậm chí còn dễ dàng hơn nữa.' },
  { title: 'Nhiều quà tặng hơn', desc: 'Tích điểm GrabRewards cho mỗi đơn hàng của bạn...' }
];

const WhyOrderSection = () => {
  const [showMore, setShowMore] = useState(false);

  const handleReadMore = () => {
    setShowMore(true);
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, mx: 'auto', mr: -14  }}>
      {/* Section: Vì sao bạn nên Order */}
      <Typography sx={{marginRight:'65%'}} variant="h5" fontWeight="bold" gutterBottom>
        Vì sao bạn nên Order trên OderFood?
      </Typography>

      <List sx={{marginRight:'20%'}}>
        {reasons.map((reason, index) => (
          <ListItem key={index} disableGutters>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: '#00b14f', marginLeft: '10px' }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">
                  <strong>{reason.title}</strong> – {reason.desc}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>

      {/* Section: Câu hỏi thường gặp */}
      <Typography variant="h5" fontWeight="bold" mt={6} gutterBottom sx={{marginRight:'74%'}}>
        Những câu hỏi thường gặp
      </Typography>

      <Typography variant="h6" fontWeight="bold" gutterBottom mt={2} sx={{marginRight:'87%', marginTop:'40px'}}>
        OderFood là gì?
      </Typography>

      <Typography variant="body2" color="text.secondary" align='left' paragraph ml={2} >
      Lunch, Bún Cá Chấm Gốc Đa - Vũ Thạnh for Dinner! We are here to satisfy your hunger with a wide selection of merchant partners in Vietnam.
      GrabFood là dịch vụ Giao đồ ăn nhanh nhất tại Việt Nam. Chúng tôi đã sắp xếp tất cả các món ăn, nhà hàng và thực phẩm yêu thích của bạn một cách hợp lý để giúp bạn tìm được đồ ăn dễ dàng và nhanh chóng nhất có thể. Tìm và đặt món ăn yêu thích trên khắp Việt Nam - đặt đồ ăn trực tuyến chỉ bằng vài thao tác, từ món Lifted Coffee & Brunch cho bữa sáng, đến Maazi Indian – Nhà Hàng Ấn Độ cho bữa trưa, đến Bún Cá Chấm Gốc Đa – Vũ Thạnh cho bữa tối! Hãy để chúng tôi xua tan cơn đói của bạn nhờ một loạt đối tác bán đồ ăn ở Việt Nam.
      </Typography>

      {/* Hide the Read More button when showMore is true */}
      {!showMore && (
        <Box textAlign="center" mt={4} mb={2}>
          <Button variant="outlined" sx={{ borderRadius: 2, px: 4, width:'100%', height:'40px'}} onClick={handleReadMore}>
            Read More
          </Button>
        </Box>
      )}

      {/* Show more content when button is clicked */}
      {showMore && (
        <Box mt={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{marginRight:'69%'}}>
            Làm cách nào để đặt đồ ăn ở Việt Nam?
          </Typography>
          <Typography variant="body2" paragraph align='left' ml={2}>
            Sau đây là cách đơn giản nhất để đặt đồ ăn qua OderFood khi bạn ở Việt Nam:
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              <li>1.Tìm kiếm nhà hàng hoặc món ăn yêu thích<span style={{color: 'black'}}>- Nhập địa chỉ của bạn vào trang chủ. Xem các Nhà hàng và điểm ăn uống gần chỗ bạn trong danh sách của GrabFood. Chọn nhà hàng yêu thích, duyệt hết thực đơn và chọn món ăn bạn muốn đặt.</span></li>
              <li>2.Kiểm tra & Thanh toán<span style={{color: 'black'}}> - Sau khi chắc chắn rằng bạn đã đặt đầy đủ các món theo nhu cầu, hãy nhấp vào tab “ORDER NOW” (ĐẶT MÓN NGAY) và nhập địa chỉ giao đồ ăn cuối cùng. Chọn phương thức thanh toán phù hợp nhất với bạn và thanh toán.</span></li>
              <li>3.Giao hàng<span style={{color: 'black'}}> - GrabFood đã thiết kế một hành trình phục vụ khách hàng liền mạch để bạn có thể thưởng thức món ăn một cách trọn vẹn. Chúng tôi sẽ gửi cho bạn email và tin nhắn SMS tức thời xác nhận đơn đặt hàng của bạn và thời gian giao hàng dự kiến. Sau đó chúng tôi sẽ giao ngay đồ ăn cho bạn.</span></li>
            </ul>
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{marginRight:'58%'}}>
            OderFood có cung cấp dịch vụ giao đồ ăn 24x7 không?
          </Typography>
          <Typography variant="body2" paragraph align='left' ml={2}>
          Chúng tôi chỉ biết một điều duy nhất, đó là "đồ ăn", vậy nên tất nhiên chúng tôi cung cấp dịch vụ này rồi. Xin lưu ý, mặc dù chúng tôi là đối tác giao đồ ăn phục vụ 24x7, nhưng một số nhà hàng trong danh mục của chúng tôi có thể hạn chế giao đồ ăn khuya hoặc có thể không phục vụ đối với các đơn đặt hàng. Tuy nhiên, chúng tôi đã liệt kê danh sách những nhà hàng phục vụ nhu cầu ăn khuya của bạn trong mục Late Night Delivery (Giao hàng khuya).
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{marginRight:'69%'}}>
            OderFood có chấp nhận tiền mặt không?
          </Typography>
          <Typography variant="body2" paragraph align='left' ml={2}>
          Tất nhiên là có! GrabFood chấp nhận mọi hình thức thanh toán cho dịch vụ giao đồ ăn, bao gồm cả tiền mặt khi giao hàng tại Việt Nam.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{marginRight:'40%'}}>
          Tôi có thể thanh toán trực tuyến trên OderFood cho đơn hàng của mình không?
          </Typography>
          <Typography variant="body2" paragraph align='left' ml={2}>
          OderFood chấp nhận nhiều hình thức thanh toán cho các đơn đặt đồ ăn trực tuyến, bao gồm cả thanh toán trực tuyến tại Việt Nam bằng thẻ tín dụng, thẻ ghi nợ, PayPal hoặc trả tiền lúc nhận hàng. Hãy nhớ sử dụng Moca để tích điểm thưởng mà bạn có thể sử dụng để được giảm giá cho đơn hàng tiếp theo và cho các dịch vụ khác của Grab nhé.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{marginRight:'67%'}}>
          OderFood tính phí giao đồ ăn như thế nào?
          </Typography>
          <Typography variant="body2" paragraph align='left' ml={2}>
          Phí giao hàng của chúng tôi phụ thuộc vào nhiều yếu tố hoạt động như khoảng cách từ vị trí của bạn đến nhà hàng. Bạn có thể kiểm tra phí giao hàng chính xác cần phải trả trước khi thanh toán tại mục thanh toán trên ứng dụng OderFood. Ngoài ra còn có phần “Free Delivery” (Giao hàng miễn phí) liệt kê các nhà hàng gần chỗ bạn mà không tính phí giao hàng.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default WhyOrderSection;
