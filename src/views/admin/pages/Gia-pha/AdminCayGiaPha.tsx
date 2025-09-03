import "./AdminCayGiaPha.css";
import { Breadcrumb } from "antd";
import Search from "../../../../components/Search/Search";
import Button from "../../../../components/Button/Button";
import FamilyTree from "../../../../components/FamilyTree/FamilyTree";

function AdminCayGiaPha() {
  return (
    <div className="adminCayGiaPha-container">
      <Breadcrumb
        style={{ fontSize: "18px" }}
        items={[
          {
            title: (
              <a
                className="h3"
                href="/admin/gia-pha"
                style={{ color: "var(--color-gray)" }}
              >
                Gia phả
              </a>
            ),
          },
          {
            title: (
              <div className="h3" style={{ color: "var(--color-dark-3)" }}>
                Cây gia phả
              </div>
            ),
          },
        ]}
      />

      <div style={{ marginTop: 24 }}>
        <div className="tool">
          <div className="tool-left">
            <Search placeholder="Tìm kiếm thành viên" icon="" />
            <Search placeholder="Hiển thị số thế hệ" icon="eye_tracking" />
          </div>
          <div className="tool-right">
            <Button text="Xuất gia phả" />
          </div>
        </div>
        <FamilyTree mode="admin" />
      </div>
    </div>
  );
}

export default AdminCayGiaPha;
