import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 60px 80px 20px 80px;
  position: relative;
  right: 5%;
  width: 123%;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:first-child {
    margin-right: -20px;
    padding-left: 50px;
  }
`;

const FooterTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 12px;
`;

const FooterLink = styled(Link)`
  color: #bbb;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: #00b14f;
  }
`;

const FooterText = styled.p`
  color: #ccc;
  font-size: 14px;
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 40px;
  font-size: 14px;
  color: #888;
  border-top: 1px solid #444;
  margin-top: 40px;
`;

const Logo = styled.i<{ scrolled?: boolean }>`
  font-size: 30px;
  color: #00b14f;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        <FooterSection>
          <Logo className="fa-solid fa-bowl-food" scrolled={true} />
          <FooterText>
            Order Food là nền tảng đặt món ăn hàng đầu. Hãy trải nghiệm tiện ích giao đồ ăn nhanh chóng, dễ dàng.
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Liên kết nhanh</FooterTitle>
          <FooterLink to="/">Trang chủ</FooterLink>
          <FooterLink to="/about">Về chúng tôi</FooterLink>
          <FooterLink to="/contact">Liên hệ</FooterLink>
          <FooterLink to="/faq">Câu hỏi thường gặp</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Liên hệ</FooterTitle>
          <FooterText>Email: support@orderfood.vn</FooterText>
          <FooterText>Hotline: 1900 1234</FooterText>
          <FooterText>Địa chỉ: 123 Đường ABC, TP.HCM</FooterText>
        </FooterSection>
      </FooterGrid>
      <FooterBottom>© 2025 Order Food. All rights reserved.</FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
