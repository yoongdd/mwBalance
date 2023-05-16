import React from "react";
import Slider from "react-slick";
import slide01 from "../../asset/image/slide01.jpg";
import slide02 from "../../asset/image/slide02.jpg";
import "../../asset/style/main.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function MainScreen() {
  const bannerImages = [slide01, slide02];
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {bannerImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`배너${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MainScreen;
