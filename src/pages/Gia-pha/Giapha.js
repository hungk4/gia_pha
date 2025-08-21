import FamilyTree from "../../components/FamilyTree/FamilyTree";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Search from "../../components/Search/Search";
import Button from "../../components/Button/Button";

import "./Giapha.css";

function Giapha() {
  return (
    <>
      <Header />
      <div className="body">
        <div className="giapha-container">
          <h3 className="giapha-title h3">Gia phả</h3>
          <div className="tool">
            <div className="tool-left">
              <Search placeholder="Tìm kiếm thành viên" icon="" />
              <Search placeholder="Hiển thị số thế hệ" icon="eye_tracking"/>
            </div>
            <div className="tool-right">
              <Button text="Xuất gia phả" />
            </div>
          </div>
          <FamilyTree />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Giapha;
