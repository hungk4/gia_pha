import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";

import avatar from "../../../../assets/images/avatar.jpg";

import "./AdminThemCon.css";

function AdminThemCon() {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  // State quản lý dữ liệu form
  const [formData, setFormData] = useState({
    hoten: "",
    gioitinh: "",
    ngaysinh: "",
    hientrang: "",
    ngaymat: "",
    thuongtru: "",
    lienhe: "",
    bo: "Nguyễn Văn A",
    me: "Nguyễn Thị B, Nguyễn Thị C",
  });

  // Hàm update dữ liệu khi input thay đổi
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="adminThemCon-container">
      <div className="detailInfo-card">
        <span
          className="material-symbols-outlined close-btn"
          onClick={() => navigate(-1)}
        >
          close
        </span>
        <div className="detailInfo-header">
          <h3 className="title h3">Thêm con</h3>
          <div className="avatar">
            <img src={avatar} alt="avatar"></img>
          </div>
        </div>

        <div className="detailInfo-tabs">
          <button
            className={`${activeTab === "personal" ? "active" : ""} p2-r`}
            onClick={() => setActiveTab("personal")}
          >
            Thông tin cá nhân
          </button>
          <button
            className={`${activeTab === "family" ? "active" : ""} p2-r`}
            onClick={() => setActiveTab("family")}
          >
            Bố Mẹ
          </button>
        </div>

        <div className="content">
          {activeTab === "personal" && (
            <div className="personal-info p1-r">
              <div className="group">
                <label>Họ tên:</label>
                <input
                  type="text"
                  name="hoten"
                  value={formData.hoten}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="group">
                <label>Giới tính:</label>
                <select
                  name="gioitinh"
                  value={formData.gioitinh}
                  onChange={handleChange}
                  required
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>

              <div className="group">
                <label>Ngày sinh:</label>
                <input
                  type="date"
                  name="ngaysinh"
                  value={formData.ngaysinh}
                  onChange={handleChange}
                />
              </div>

              <div className="group">
                <label>Hiện trạng:</label>
                <select
                  name="hientrang"
                  value={formData.hientrang}
                  onChange={handleChange}
                >
                  <option value="Còn sống">Còn sống</option>
                  <option value="Đã mất">Đã mất</option>
                </select>
              </div>

              <div className="group">
                <label>Ngày mất:</label>
                <input
                  type="date"
                  name="ngaymat"
                  value={formData.ngaymat}
                  onChange={handleChange}
                  disabled={formData.hientrang === "Còn sống"}
                />
              </div>

              <div className="group">
                <label>Thường trú:</label>
                <input
                  type="text"
                  name="thuongtru"
                  value={formData.thuongtru}
                  onChange={handleChange}
                />
              </div>

              <div className="group">
                <label>Liên hệ:</label>
                <input
                  type="tel"
                  name="lienhe"
                  value={formData.lienhe}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {activeTab === "family" && (
            <div className="family-info p1-r">
              <div className="group">
                <label>Bố:</label>
                <input
                  type="text"
                  name="bo"
                  value={formData.bo}
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div className="group">
                <label>Mẹ:</label>
                <select>
                  {formData.me.split(",").map((me, index) => (
                    <option key={index} value={me.trim()}>
                      {me.trim()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <Button text="Lưu thay đổi" className="btn-save" />
      </div>
    </div>
  );
}
export default AdminThemCon;
