import "./AdminGiapha.css";

import Button from "../../../../components/Button/Button";

import { useNavigate } from "react-router-dom";

function AdminGiapha() {
  const navigate = useNavigate();
  return (
    <>
      <div className="adminGiapha-container">
        <h3 className="title-page h3">Gia phả</h3>
        <div className="list">
          <div className="admin-family-tree">
            <Button
              text="Cây gia phả"
              icon="graph_1"
              onClick={() => {
                navigate("/admin/gia-pha/cay-gia-pha");
              }}
            ></Button>
          </div>
          <div className="user-info-list">
            <Button
              text="Danh sách thành viên"
              onClick={() => {
                navigate("/admin/gia-pha/danh-sach-thanh-vien");
              }}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminGiapha;
