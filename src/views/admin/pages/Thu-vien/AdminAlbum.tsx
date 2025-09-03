import { Breadcrumb } from "antd";
import Button from "../../../../components/Button/Button";
import { useParams } from "react-router-dom";

import { Row, Col } from "antd";
import Card1 from "../../../../components/Card1/Card1";
function AdminAlbum() {
  const id = useParams().id;
  return (
    <>
      <div className="adminThuvien-container">
        <Breadcrumb
          style={{ fontSize: "18px" }}
          items={[
            {
              title: (
                <a
                  className="h3"
                  href="/admin/thu-vien"
                  style={{ color: "var(--color-gray)" }}
                >
                  Thư viện
                </a>
              ),
            },
            {
              title: (
                <div className="h3" style={{ color: "var(--color-dark-3)" }}>
                  Album {id}
                </div>
              ),
            },
          ]}
        />
        <div className="tool" style={{ marginTop: "24px" }}>
          <div className="tool-left">
            <label htmlFor="select-options" className="label-select p2-r">
              Hiển thị
            </label>
            <select
              id="select-options"
              className="select-options"
              name="select-options"
              value="6"
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="18">18</option>
            </select>
          </div>
          <div className="tool-right">
            <Button icon="add" text="Thêm ảnh" />
          </div>
        </div>

        <Row gutter={[24, 24]} className="album-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <Col key={i} xs={24} sm={12} md={8} className="album-item">
              <Card1
                title={`Img Title ${i + 1}`}
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
      </div>
    </>
  );
}

export default AdminAlbum;
