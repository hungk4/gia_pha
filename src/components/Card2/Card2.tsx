import "./Card2.css";

function Card2() {
  return (
    <>
      <div className="card">
        <div className="event-name p1-b">
          <p>Tên sự kiện</p>
          <span className="material-symbols-outlined">add_alert</span>
        </div>
        <div className="event-time p3-r">
          <p>Dương lịch: HH:MM dd/mm/yyyy</p>
          <span className="material-symbols-outlined">calendar_month</span>
        </div>
        <div className="event-time vn p3-r">Âm lịch: HH:MM dd/mm/yyy</div>
        <div className="event-address p3-r">Địa điểm: Hà Nam</div>
        <div className="event-note p3-r">Ghi chú:</div>
      </div>
    </>
  );
}

export default Card2;
