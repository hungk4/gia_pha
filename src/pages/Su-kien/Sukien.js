import { useState } from "react";

import Button from "../../components/Button/Button";
import Card2 from "../../components/Card2/Card2";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import "./Sukien.css";

function Sukien() {
  const [popup, setPopup] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const events = ["Sự kiện 1", "Sự kiện 2", "Sự kiện 3", "Sự kiện 4"];
  const handleCheckboxChange = (event) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter((e) => e !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };
  return (
    <>
      <Header />
      <div className="body">
        <div className="sukien-container">
          <Button
            text="Đăng ký nhận thông báo sự kiện"
            onClick={() => {
              console.log("clicked");
              setPopup(!popup);
            }}
          />

          <div className="group">
            <h3 className="h3 title">Sự kiện sắp diễn ra</h3>
            <div className="list-event">
              <div className="event">
                <div className="circle"></div>
                <div className="horizontal-line"></div>
                <Card2 />
              </div>
            </div>
          </div>

          <div className="group">
            <h3 className="h3 title">Sự kiện</h3>
            <div className="list-event">
              <div className="event">
                <div className="circle"></div>
                <div className="horizontal-line"></div>
                <Card2 />
              </div>
              <div className="event">
                <div className="circle"></div>
                <div className="horizontal-line"></div>
                <Card2 />
              </div>
              <div className="event">
                <div className="circle"></div>
                <div className="horizontal-line"></div>
                <Card2 />
              </div>
            </div>
          </div>
        </div>

        {popup && (
          <div className="popup-overlay">
            <div className="popup">
              <div className="popup-header">
                <p className="popup-title p1-b">Đăng ký nhận thông báo</p>
                <span
                  className="material-symbols-outlined close-btn"
                  onClick={() => setPopup(false)}
                >
                  close
                </span>
              </div>

              <div className="form-group p2-r">
                <label htmlFor="events">
                  Nhấn chọn sự kiện (mặc định là tất cả)
                </label>
                <input
                  id="events"
                  type="text"
                  readOnly
                  value={
                    selectedEvents.length > 0
                      ? selectedEvents.join(", ")
                      : "Tất cả sự kiện"
                  }
                  className="event-input p2-r"
                  onClick={() => setShowCheckboxes(!showCheckboxes)}
                />
                {showCheckboxes && (
                  <div className="checkbox-list">
                    {events.map((event) => (
                      <label key={event} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={selectedEvents.includes(event)}
                          onChange={() => handleCheckboxChange(event)}
                        />
                        <span class="checkmark"></span>
                        {event}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group p2-r">
                <label htmlFor="name">Họ tên</label>
                <input id="name" type="text" placeholder="Nhập họ tên" />
              </div>

              <div className="form-group p2-r">
                <label>Số điện thoại</label>
                <input type="text" placeholder="Nhập số điện thoại" />
              </div>

              <button type="submit" className="p2-b">
                Gửi
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Sukien;
