import "./AdminThuvien.css";

import { Row, Col } from "antd";

import Button from "../../../../components/Button/Button";
import Search from "../../../../components/Search/Search";
import Card1 from "../../../../components/Card1/Card1";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminThuvien() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState<boolean>(false);

  useEffect(() => {
    if (popup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popup]);

  return (
    <>
      <div className="adminThuvien-container">
        <h3 className="title-page h3">Thư viện</h3>
        <div className="tool">
          <div className="tool-left">
            <label htmlFor="select-options" className="label-select p2-r">
              Hiển thị
            </label>
            <select
              id="select-options"
              className="select-options"
              name="select-options"
              value="5"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <div className="tool-right">
            <Search placeholder="Tìm kiếm album" />
            <Button
              icon="add"
              text="Thêm album"
              onClick={() => {
                setPopup(true);
              }}
            />
          </div>
        </div>
        <Row gutter={[24, 24]} className="album-grid">
          {Array.from({ length: 15 }).map((_, i) => (
            <Col key={i} xs={24} sm={12} md={8} className="album-item">
              <Card1
                title={`Img Title ${i + 1}`}
                onClick={() => {
                  navigate(`/admin/thu-vien/album/${i + 1}`);
                }}
              />
            </Col>
          ))}
        </Row>
        <div className="pagination">
          <button className="p2-r inactive">Previous</button>
          <button className="p2-r active">1</button>
          <button className="p2-r">2</button>
          <button className="p2-r">3</button>
          <span className="p2-r">...</span>
          <button className="p2-r">10</button>
          <button className="p2-r">Next</button>
        </div>

        {popup && (
          <div className="popup-overlay">
            <div className="popup">
              <div className="popup-header">
                <p className="popup-title p1-b">Thêm album mới</p>
                <span
                  className="material-symbols-outlined close-btn"
                  onClick={() => setPopup(false)}
                >
                  close
                </span>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Submit form...");
                }}
              >
                <div className="form-group">
                  <label htmlFor="album-image">Ảnh album</label>
                  <input
                    id="album-image"
                    type="file"
                    accept="image/*"
                    className="input-image"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="title">Tiêu đề album</label>
                  <input type="text" placeholder="Nhập tiêu đề" />
                </div>

                <button type="submit" className="p2-b">
                  Gửi
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminThuvien;
