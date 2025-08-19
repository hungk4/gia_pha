import "./Card1.css";
import bannerImg from "../../assets/images/hero_banner.jpg";
function Card1(props) {
  return (
    <div className="card">
      <div className="card-media">
        {props.img ? (
          <img src={props.img} alt="Card Media" />
        ) : (
          <img src={bannerImg} alt="Card Media" />
        )}
      </div>
      <p className="card-title p2-r">{props.title ? props.title : "title"}</p>
    </div>
  );
}

export default Card1;
