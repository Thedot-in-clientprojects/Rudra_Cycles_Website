import React, {useState} from "react";
import rbanner1 from "../../assets/img/rbanner1.webp";
import rbanner2 from "../../assets/img/rbanner2.webp";
import rbanner3 from "../../assets/img/rbanner3.webp";
import Carousel from 'react-bootstrap/Carousel';


const HeroSliderEight = () => {
  

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div >
    
    <Carousel activeIndex={index} interval={1000} onPause={false} onSelect={handleSelect} indicators={false} >
      <Carousel.Item> 
        <img
          className="d-block w-100"
          src={rbanner1}
          alt="First slide"
        />
      
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={rbanner2}
          alt="Second slide"
        />

        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={rbanner3}
          alt="Third slide"
        />

        
      </Carousel.Item>
    </Carousel>
    </div>
  )

}

export default HeroSliderEight