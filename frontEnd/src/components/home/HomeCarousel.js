import { useState,  } from 'react';
import { Box, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import FistImg from "../../assets/HomeCarouselImg/1.png"
import SecondImg from "../../assets/HomeCarouselImg/2.png"
import ThirdImg from "../../assets/HomeCarouselImg/3.png"

import FistGif from "../../assets/HomeCarouselImg/IDE.gif"
// import SecondGif from "../../assets/HomeCarouselImg/after_crop.gif"
import ThirdGif from "../../assets/HomeCarouselImg/after_crop.gif"


const items = [
  { title: 'Item 1', image: FistImg, gif: FistGif },
  { title: 'Item 2', image: SecondImg, gif: "미구현" },
  { title: 'Item 3', image: ThirdImg, gif: ThirdGif },
];

const HomeCarousel = () => {
  const [currentItem, setCurrentItem] = useState(0);

  const handleNext = () => {
    setCurrentItem(currentItem === 2 ? 0 : currentItem + 1);

  };

  const handlePrevious = () => {
    setCurrentItem(currentItem === 0 ? 2 : currentItem - 1);
  };

  return (
    <Box sx={{width: 'inherit', height: '550px',margin: 'auto',padding: '20px',position: 'relative',overflow: 'hidden',}}>
      {items.map((item, index) => (
        <Box
          key={item.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex:
              index === currentItem 
              ? 0 
              : currentItem - index === 1 || index - currentItem === 2 
              ? -1
              : -2,
            transition: 'transform 1s',
            transform:
              index === currentItem 
              ? 'translateX(0)' 
              : currentItem - index === 1 || index - currentItem === 2 
              ? 'translateX(-100%)' 
              : 'translateX(100%)'
          }}>
          <img src={item.image} alt={item.title} style={{width: '100%',height: '100%', objectFit: 'cover',}} />
          {index === 1
          ? <div hidden></div>
          : <img src={item.gif} alt={item.title} style={{width: '40%',height: '60%', right: '4%', top: '20%', zIndex: 3, position: 'absolute' }} />}
        </Box>
      ))}
      <IconButton
        sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
        onClick={handlePrevious}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
        onClick={handleNext}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
};

export default HomeCarousel;
