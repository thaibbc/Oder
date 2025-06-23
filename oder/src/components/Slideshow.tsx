import React, { useState } from "react";
import styled from "styled-components";
import { FaStar, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const restaurants = [
  {
    name: "Subway - Avenue K",
    type: "Salad, Sandwiches, Western, Wraps",
    rating: 3.8,
    time: "40 mins",
    distance: "6.5 km",
    image: "https://www.godubrovnik.com/wp-content/uploads/pizza.jpg",
  },
  {
    name: "Pizza Hut - KLCC",
    type: "Pizza, Pasta, Western",
    rating: 4.1,
    time: "30 mins",
    distance: "5.2 km",
    image: "https://www.godubrovnik.com/wp-content/uploads/pizza.jpg",
  },
  {
    name: "KGB Burgers - Mid Valley",
    type: "Burgers, Fast Food",
    rating: 4.5,
    time: "45 mins",
    distance: "7.1 km",
    image: "https://www.godubrovnik.com/wp-content/uploads/pizza.jpg",
  },
  {
    name: "Domino's Pizza - Bangsar",
    type: "Pizza, Delivery",
    rating: 4.2,
    time: "30 mins",
    distance: "4.0 km",
    image: "https://www.godubrovnik.com/wp-content/uploads/pizza.jpg",
  },
  {
    name: "Sushi King - Mid Valley",
    type: "Japanese, Sushi",
    rating: 4.3,
    time: "50 mins",
    distance: "6.8 km",
    image: "https://www.godubrovnik.com/wp-content/uploads/pizza.jpg",
  },
  {
    name: "Sushi King - Mid Valley",
    type: "Japanese, Sushi",
    rating: 4.3,
    time: "50 mins",
    distance: "6.8 km",
    image: "https://www.godubrovnik.com/wp-content/uploads/pizza.jpg",
  },
  {
    name: "Sushi King - Mid Valley",
    type: "Japanese, Sushi",
    rating: 4.3,
    time: "50 mins",
    distance: "6.8 km",
    image: "https://www.godubrovnik.com/wp-content/uploads/pizza.jpg",
  },
  {
    name: "Sushi King - Mid Valley",
    type: "Japanese, Sushi",
    rating: 4.3,
    time: "50 mins",
    distance: "6.8 km",
    image: "https://www.godubrovnik.com/wp-content/uploads/pizza.jpg",
  },
  {
    name: "Sushi King - Mid Valley",
    type: "Japanese, Sushi",
    rating: 4.3,
    time: "50 mins",
    distance: "6.8 km",
    image: "https://www.godubrovnik.com/wp-content/uploads/pizza.jpg",
  },
  {
    name: "Sushi King - Mid Valley",
    type: "Japanese, Sushi",
    rating: 4.3,
    time: "50 mins",
    distance: "6.8 km",
    image: "https://www.godubrovnik.com/wp-content/uploads/pizza.jpg",
  },
];

const SliderWrapper = styled.div`
  position: relative;
  left: 190px;
  width: 70%;          // Có thể mở rộng nếu muốn full screen
  overflow: hidden;     // Hoặc dùng auto nếu muốn cho cuộn
  padding: 20px 10px;
`;


const SlideContainer = styled.div<{ index: number }>`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${({ index }) => `-${index * 260}px`});
  width: max-content;
`;



const Card = styled.div`
  flex: 0 0 auto;         // Không bị co giãn
  width: 250px;           // Chiều rộng cố định
  box-sizing: border-box;
  padding: 3px;
  margin-right:20px;
`;


const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  height: 250px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  margin: 4px 0;
`;

const Type = styled.p`
  font-size: 12px;
  color: black;
  margin: 4px 0;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 8px;
  color: black;
  flex-wrap: wrap;
  margin-top: 8px;

  svg {
    margin-right: 2px;
    font-size: 14px;
  }
`;

const Arrow = styled.button<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ left }) => (left ? "left: 165px;" : "right: 220px;")}
  transform: translateY(-50%);
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  font-size: 30px;
  background: transparent;
  outline: none;
  box-shadow: none;

  &:focus {
    outline: none;
    box-shadow: none;
    transform: translateY(-50%);
  }
`;



const RestaurantSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  const visibleCards = 3; // hoặc tính động theo chiều rộng nếu muốn
  // const maxIndex = Math.ceil(restaurants.length / 3) - 1; // Chỉnh lại maxIndex để không vượt quá số thẻ có trong slider
  const maxIndex = restaurants.length - visibleCards;

  const nextSlide = () => {
    if (index < maxIndex) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <Arrow left onClick={prevSlide}>‹</Arrow>
        <SliderWrapper> 
          <SlideContainer index={index}>
            {restaurants.map((r, i) => (
              <Card key={i}>
                <CardContent>
                  <Image src={r.image} alt={r.name} />
                  <Title>{r.name}</Title>
                  <Type>{r.type}</Type>
                  <Info>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 , color:'black'}}><FaStar color="gold" />{r.rating}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 , color:'black'}}><FaClock color="black"/>{r.time}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 , color:'black'}}><FaMapMarkerAlt color="red"/> {r.distance}</span>
                  </Info>
                </CardContent>
              </Card>
            ))}
          </SlideContainer>
        </SliderWrapper>
      <Arrow onClick={nextSlide}>›</Arrow>
    </div>
  );
};

export default RestaurantSlider;
