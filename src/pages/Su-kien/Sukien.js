import Button from "../../components/Button/Button";
import Card2 from "../../components/Card2/Card2";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import "./Sukien.css";

function Sukien() {
  return (
    <>
      <Header />
      <div className="body">
        <div className="sukien-container">
          <Button text="Đăng ký nhận thông báo sự kiện" />

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
      </div>
      <Footer />
    </>
  );
}

export default Sukien;
