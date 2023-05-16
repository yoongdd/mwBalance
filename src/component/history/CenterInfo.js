import React from "react";
import Slider from "react-slick";
import slide01 from "../../asset/image/slide01.jpg";
import slide02 from "../../asset/image/slide02.jpg";
import sns1 from "../../asset/image/tube.png";
import sns2 from "../../asset/image/insta.png";
import sns3 from "../../asset/image/kakao.png";
import "../../asset/style/main.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CenterInfo() {
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
    <div>
      <div className="slider-container">
        <Slider {...settings}>
          {bannerImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`배너${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="center-info wrap">
        <div className="tit">MW.Balance</div>
        <p className="con-txt">
          {" "}
          피트니스와 필라테스를 함께 할 수 있는 분당구 최대 규모의 피트니스!
          최신 시설을 갖춘 MW 밸런스센터로 편하게 문의 부탁드립니다.{" "}
        </p>
        <div className="box">
          <p className="tel">031-633-0055</p>
          <p className="adress">
            경기도 성남시 분당구 정자동 165-1 정자엠코헤리츠 101-518호
          </p>
        </div>
        <div className="box">
          <p>SNS</p>
          <img src={sns1}></img>
          <img src={sns2}></img>
          <img src={sns3}></img>
        </div>
      </div>
    </div>
  );
}

export default CenterInfo;
