import bannerImg from "../../assets/images/hero_banner.jpg"
import "./HeroBanner.css";
import Button from "../Button/Button";

function HeroBanner() {
  return (
    <section className="hero-banner">
      <img src={bannerImg} alt="Hero banner" className="hero-bg"/>
      <div className="overlay"></div>
      <div className="hero-content">
        <h1 className="h1">Gia đình là nơi bắt đầu của tất cả</h1>
        <h4 className="h4">Nơi gắn kết những tâm hồn, viết nên câu chuyện riêng</h4>
        <Button text="Xem cây gia phả"/>
      </div>
    </section>
  )
}

export default HeroBanner;