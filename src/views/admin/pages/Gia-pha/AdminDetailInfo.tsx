import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import avatar from "../../../../assets/images/avatar.jpg";

import "./AdminDetailInfo.css";
import Button from "../../../../components/Button/Button";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { searchMemberById } from "../../../../helper/searchMemberById";
import {
  editMember,
  type Person,
} from "../../../../redux/familyTree/familyTreeSlice";

function AdminDetailInfo() {
  const data = useSelector((state: RootState) => state.familyTree);
  const dispatch = useDispatch();

  const { id: personId } = useParams<{ id: string }>();
  let person: Person | null = null;

  if (personId) {
    person = searchMemberById(data, personId);
  }

  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  // State quản lý dữ liệu form
  const [formData, setFormData] = useState<Person>({
    id: personId!,
    name: person?.name ?? "",
    gender: person?.gender ?? "male",
    year: person?.year ?? "2000-01-01",
    status: person?.status ?? "Alive",
    deathYear: person?.deathYear ?? "",
    address: person?.address ?? "",
    contact: person?.contact ?? "",
    fatherId: person?.fatherId ?? "",
    motherId: person?.motherId ?? "",
    couple: person?.couple ?? [],
    children: person?.children ?? [],
  });

  // Hàm update dữ liệu khi input thay đổi
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editMember(formData));
    navigate(-1); // quay về trang truo
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
              <div className="group">
                <label>Họ tên:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="group">
                <label>Giới tính:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>

              <div className="group">
                <label>Ngày sinh:</label>
                <input
                  type="date"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>

              <div className="group">
                <label>Hiện trạng:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Alive">Còn sống</option>
                  <option value="Deceased">Đã mất</option>
                </select>
              </div>

              {formData.status === "Deceased" && (
                <div className="group">
                  <label>Ngày mất:</label>
                  <input
                    type="date"
                    name="deathYear"
                    value={formData.deathYear}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="group">
                <label>Thường trú:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="group">
                <label>Liên hệ:</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
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
                  name="father"
                  value={
                    person?.fatherId
                      ? searchMemberById(data, person.fatherId)?.name
                      : ""
                  }
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div className="group">
                <label>Mẹ:</label>
                <input
                  type="text"
                  name="mother"
                  value={
                    person?.motherId
                      ? searchMemberById(data, person.motherId)?.name
                      : ""
                  }
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div className="group">
                <label>Hôn phu:</label>
                <ul>
                  {person?.couple.map((c) => (
                    <li key={c.id}>{c.name}</li>
                  ))}
                </ul>
              </div>

              <div className="group">
                <label>Con cái:</label>
                <ul>
                  {person?.children.map((child) => (
                    <li key={child.id}>{child.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <Button
          text="Lưu thay đổi"
          className="btn-save"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default AdminDetailInfo;
