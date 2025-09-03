// src/components/Card1/Card1.tsx
import "./Card1.css";
import bannerImg from "../../assets/images/hero_banner.jpg"; 

import { MouseEventHandler } from "react";

// 1. Khai báo kiểu props
interface Card1Props {
  img?: string;
  title?: string;
  id?: string | number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

function Card1({ img, title, id, onClick }: Card1Props) {

  return (
    <div className="card1" onClick={onClick}>
      <div className="card-media">
        {img ? <img src={img} alt="Card Media" /> : <img src={bannerImg} alt="Card Media" />}
      </div>
      <p className="card-title p2-r">{title || "title"}</p>
    </div>
  );
}

export default Card1;
