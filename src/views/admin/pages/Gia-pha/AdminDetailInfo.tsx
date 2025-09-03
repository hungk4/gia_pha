import { useState } from "react";
import { useNavigate } from "react-router-dom";

import avatar from "../../../../assets/images/avatar.jpg";

import "./AdminDetailInfo.css";

function AdminDetailInfo() {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  // State quản lý dữ liệu form
  const [formData, setFormData] = useState({
    hoten: "Nguyễn Mạnh Hùng",
    gioitinh: "Nam",
    ngaysinh: "2000-01-01",
    hientrang: "Còn sống",
    ngaymat: "",
    thuongtru: "Hà Nội",
    lienhe: "0852865816",
    bo: "Nguyễn Văn A",
    me: "Nguyễn Văn B",
  });

  // Hàm update dữ liệu khi input thay đổi
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="adminDetailInfo-container">
      <div className="detailInfo-card">
        <span
          className="material-symbols-outlined close-btn"
          onClick={() => navigate(-1)}
        >
          close
        </span>
        <div className="detailInfo-header">
          <h3 className="title h3">Thông tin chi tiết</h3>
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
            Bố Mẹ, Hôn thế, Con cái
          </button>
        </div>

        <div className="content">
          {activeTab === "personal" && (
            <div className="personal-info p1-r">
              <label>
                Họ tên:
                <input
                  type="text"
                  name="hoten"
                  value={formData.hoten}
                  onChange={handleChange}
                />
              </label>
              <label>
                Giới tính:
                <select
                  name="gioitinh"
                  value={formData.gioitinh}
                  onChange={handleChange}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </label>
              <label>
                Ngày sinh:
                <input
                  type="date"
                  name="ngaysinh"
                  value={formData.ngaysinh}
                  onChange={handleChange}
                />
              </label>
              <label>
                Hiện trạng:
                <select
                  name="hientrang"
                  value={formData.hientrang}
                  onChange={handleChange}
                >
                  <option value="Còn sống">Còn sống</option>
                  <option value="Đã mất">Đã mất</option>
                </select>
              </label>
              <label>
                Ngày mất:
                <input
                  type="date"
                  name="ngaymat"
                  value={formData.ngaymat}
                  onChange={handleChange}
                  disabled={formData.hientrang === "Còn sống"}
                />
              </label>
              <label>
                Thường trú:
                <input
                  type="text"
                  name="thuongtru"
                  value={formData.thuongtru}
                  onChange={handleChange}
                />
              </label>
              <label>
                Liên hệ:
                <input
                  type="tel"
                  name="lienhe"
                  value={formData.lienhe}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}

          {activeTab === "family" && (
            <div className="family-info p1-r">
              <label>
                Bố:
                <input
                  type="text"
                  name="bo"
                  value={formData.bo}
                  onChange={handleChange}
                  disabled
                />
              </label>
              <label>
                Mẹ:
                <input
                  type="text"
                  name="me"
                  value={formData.me}
                  onChange={handleChange}
                  disabled
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDetailInfo;
