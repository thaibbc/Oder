import styledComponents from "styled-components";
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import Slideshow from "../components/Slideshow";
import FoodGrid from '../components/FoodGrid';
import WhyOrderSection from '../components/WhyOrderSection';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartDrawer from '../components/CartDrawer';
import IconButton from '@mui/material/IconButton';
import Footer from '../components/Footer'



const AppContainer = styledComponents.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0;
`;

const NavBar = styledComponents.nav<{ scrolled: boolean }>`
  position: fixed;
  top: 10px;
  left: 400px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 48px;
  padding: 30px 20px;
  z-index: 100;
  width: 50%;
  height: 15px;
  border-radius: 30px;
  transition: background-color 0.3s ease;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.5);

  background-color: ${({ scrolled }) =>
    scrolled ? "rgba(255, 255, 255, 1)" : "rgba(151, 142, 142, 0.15)"};
`;

const NavRight = styledComponents.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;


const LoginButton = styledComponents.button<{ scrolled: boolean }>`
  padding: 11px 16px;
  font-weight: bold;
  background: ${({ scrolled }) => (scrolled ? "black" : "white")};
  color: ${({ scrolled }) => (scrolled ? "white" : "black")};
  border: none;
  border-radius: 6px;
  font-size: 30px;
  cursor: pointer;
  transition: 
    background-color 0.3s ease-in-out,
    color 0.3s ease-in-out,
    border 0.3s ease-in-out,
    transform 0.2s ease-in-out;

  &:hover {
    background-color: none;
    color: ${({ scrolled }) => (scrolled ? "white" : "black")};
    border: none;
  }
  &:focus {
    outline: none;
    border: none;
  }
`;


const Logo = styledComponents.i<{ scrolled: boolean }>`
  color: ${({ scrolled }) => (scrolled ? "black" : "white")};
`;
const ImageWrapper = styledComponents.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 350px;
  overflow: hidden;
  z-index: -1;
`;

const ExtraImage = styledComponents.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0; /* Bỏ bo góc nếu muốn ảnh phủ kín */
`;


const LogoContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoText = styledComponents.span<{ scrolled: boolean }>`
  font-size: 13px;
  color: ${({ scrolled }) => (scrolled ? "black" : "white")};
  margin-top: 4px;
  font-weight: bold;
  letter-spacing: 1px;
`;
const SearchCard = styledComponents.div`
  margin: 400px auto 0 auto;
  width: 280px;
  height: 320px;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  text-align: center;
  z-index: 10;
`;

const SearchTitle = styledComponents.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
`;

const SearchQuestion = styledComponents.h1`
  font-size: 28px;
  font-weight: bold;
  color: #111;
  margin-bottom: 24px;
`;

const LocationInput = styledComponents.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #f44336;
  color: #f44336;
  font-weight: bold;
  font-size: 14px;
`;

const SearchButton = styledComponents.button`
  width: 100%;
  background-color: #00c853;
  color: white;
  font-weight: bold;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color:rgb(108, 219, 152);
  }
    &:focus {
    outline: none;
    border: none;
  }
`;
const BlackSolid = styledComponents.hr`
  position: absolute;
  bottom: 248px;
  left: 0px;
  width: 100%;
  height: 2px;
  background-color:rgb(179, 179, 179);
  border: none;
  z-index: -1;
` ;
const TextConten =styledComponents.div`
  position: absolute;
  bottom: -350px;
  left: 0px;
  width:100%;
  height:500px;
`;

const Text1 = styledComponents.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64%;
  height: 50px;
`;
const Text2 = styledComponents.span`
  font-weight: bold;
  font-size: 2.57142857rem;
  color: black;
`;
const Text3 = styledComponents.span`
  font-weight: bold;
  font-size: 2.57142857rem;
  color: #00b14f;
`;


// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];zz

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/Auth'); // chuyển sang trang login
  };

  // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20); // khi cuộn xuống hơn 20px
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [cartOpen, setCartOpen] = useState(false);

  // Món ăn mẫu (bạn có thể lấy từ state toàn cục hoặc props)
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Phở Bò', price: 50000 },
    { id: '2', name: 'Bún Chả', price: 45000 },
    { id: '3', name: 'Trà Đào', price: 30000 }
  ]);
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setUser(null);
    handleCloseUserMenu();
  };

  const handleSettings = () => {
    // Ví dụ: chuyển trang cài đặt
    navigate('/settings');
    handleCloseUserMenu();
  };

  return (
    <AppContainer>
      <NavBar scrolled={isScrolled}>
        <LogoContainer style={{marginRight:'280px'}}>
          <Logo className="fa-solid fa-bowl-food" style={{fontSize: '30px'}} scrolled={isScrolled}/>
          <LogoText scrolled={isScrolled}>Oder Food</LogoText>
        </LogoContainer>
        <NavRight>
          {/* Nút mở Drawer */}
          <IconButton onClick={() => setCartOpen(true)}
             sx={{ backgroundColor: isScrolled ? 'black' : 'white',
                   transition: 'all 0.3s ease',
                   padding: '6px 14px',
                   borderRadius: '5px',
                   '&:hover': {
                      backgroundColor: isScrolled ? 'black' : 'white',
                    },
                  }}>
            <ShoppingCartIcon sx={{color: isScrolled ? 'white' : 'black',}}/>
          </IconButton>

          {/* Drawer giỏ hàng */}
          <CartDrawer
            cartItems={cartItems}
            open={cartOpen}
            onClose={() => setCartOpen(false)}
          />
          <LoginButton scrolled={isScrolled} 
            style={{fontSize:'12px',
                    transition: 'all 0.3s ease',
                  }} onClick={handleLoginClick}>
          Login/Sign Up
          </LoginButton>
          
        </NavRight>

      </NavBar>
      <ImageWrapper>
        <ExtraImage
          src="https://hidafoods.vn/wp-content/uploads/2023/10/cach-nau-pho-bo-bap-hoa-thom-ngon-dam-da-huong-vi-4.jpg"
          alt="Hình ảnh thêm"
        />
      </ImageWrapper>
      <SearchCard style={{position:'absolute', bottom:'160px', left:'150px'}}>
        <SearchTitle>Good Evening</SearchTitle>
        <SearchQuestion>Where should we deliver your food today?</SearchQuestion>
        <LocationInput>
        <i className="fa-solid fa-location-dot" style={{ marginRight: "8px" }}></i>
          Login to search location
        </LocationInput>
        <SearchButton>Search</SearchButton>
      </SearchCard>
      <BlackSolid/>
      <TextConten>
        <Text1>
          <Text2>GrabFood Promo in &nbsp;</Text2>
          <Text3>Đà Nẵng</Text3>
        </Text1>
        <Slideshow/>
        <Button variant="contained" 
        sx={{
          margin:'40px 60px 0 0',
          backgroundColor: '#ffffff',
          color: 'black', // Màu xanh của MUI mặc định
          border: '1px solid black',
          height:'45px',
          width: '75%', 
          borderRadius: '5px',
          '&:hover': {
            border: '1px solid rgb(17, 208, 65)',
            color: 'rgb(17, 208, 65)',
            boxShadow: 'none',
          },
          boxShadow: 'none',
        }}
        >See all promotions</Button>
      </TextConten>
      <FoodGrid/>
      <WhyOrderSection/>
      <Footer/>
    </AppContainer>
  );
}

export default Home;