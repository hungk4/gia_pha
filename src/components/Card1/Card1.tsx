// src/components/Card1/Card1.tsx
import "./Card1.css";
import bannerImg from "../../assets/images/hero_banner.jpg"; 

import { useNavigate } from "react-router-dom";

// 1. Khai báo kiểu props
interface Card1Props {
  img?: string;
  title?: string;
  id?: string | number;
}

function Card1({ img, title, id }: Card1Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/thu-vien/album`);
  };

  return (
    <div className="card1" onClick={handleClick}>
      <div className="card-media">
        {img ? <img src={img} alt="Card Media" /> : <img src={bannerImg} alt="Card Media" />}
      </div>
      <p className="card-title p2-r">{title || "title"}</p>
    </div>
  );
}

export default Card1;
