import "./Card3.css";

interface Card3Pops {
  icon?: string,
  text?: string,
  title?: string
  link?: string;
}

function Card3({icon, text, title, link="#"} : Card3Pops) {
  return (
    <div className="card-3">
      <div className="card-content">
        <div className="card-icon">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="card-info">
          <div className="card-text h4">{text}</div>
          <div className="card-title p1-r">{title}</div>
        </div>
      </div>
      <a href={link} className="card-btn p2-r">
        Xem thêm
      </a>
    </div>
  );
}

export default Card3;
