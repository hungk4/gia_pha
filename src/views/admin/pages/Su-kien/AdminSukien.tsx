import "./AdminSukien.css";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/Button/Button";
import Card2 from "../../../../components/Card2/Card2";
function AdminSukien() {
  const navigate = useNavigate();

  return (
    <>
      <div className="adminsukien-container">
        <h3 className="title-page h3">Sự kiện</h3>
        <div className="list">
          <div className="event-list">
            <Button
              text="Danh sách sự kiện"
              onClick={() => {
                navigate("/admin/danh-sach-su-kien");
              }}
            ></Button>
          </div>
          <div className="user-info-list">
            <Button
              text="Danh sách người nhận thông báo"
              onClick={() => {
                navigate("/admin/danh-sach-nguoi-nhan-thong-bao");
              }}
            ></Button>
          </div>
        </div>

        <h4 className="h4 event-title">Sự kiện sắp diễn ra</h4>

        <div className="group">
          <div className="time-line p2-r">30/07/2025 - Còn 3 ngày</div>
          <div className="list-event">
            <div className="event">
              <div className="circle"></div>
              <div className="horizontal-line"></div>
              <Card2 />
            </div>
          </div>
        </div>

        <div className="group">
          <div className="time-line p2-r">05/08/2025 - Còn 5 ngày</div>
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
    </>
  );
}

export default AdminSukien;
