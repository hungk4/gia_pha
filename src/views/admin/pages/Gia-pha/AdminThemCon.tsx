import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/Button/Button";

import avatar from "../../../../assets/images/avatar.jpg";

import "./AdminThemCon.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  addMember,
  Person,
} from "../../../../redux/familyTree/familyTreeSlice";
import { searchMemberById } from "../../../../helper/searchMemberById";

function AdminThemCon() {
  const data = useSelector((state: RootState) => state.familyTree);
  const dispatch = useDispatch();

  const { id: personId } = useParams<{ id: string }>();
  let parent: Person | null;
  if (personId) {
    parent = searchMemberById(data, personId);
  }



  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  // State quản lý dữ liệu form
  const [formData, setFormData] = useState<{
    name: string;
    gender: "male" | "female";
    year: string;
    status: "Alive" | "Deceased";
    deathYear: string;
    address: string;
    contact: string;
    fatherId: string;
    motherId: string;
  }>({
    name: "",
    gender: "male",
    year: "",
    status: "Alive",
    deathYear: "",
    address: "",
    contact: "",
    fatherId:
      parent!.gender === "male" ? parent!.id : parent!.couple?.[0]?.id ?? "",
    motherId:
      parent!.gender === "female" ? parent!.id : parent!.couple?.[0]?.id ?? "",
  });

  // Hàm update dữ liệu khi input thay đổi
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm submit dữ liệu
  // Hàm submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!parent) return;

    const newMember: Person = {
      id: Date.now().toString(), // tạo id tạm
      name: formData.name,
      gender: formData.gender,
      year: formData.year,
      status: formData.status,
      deathYear: formData.deathYear,
      address: formData.address,
      contact: formData.contact,
      fatherId: formData.fatherId || "",
      motherId: formData.motherId || "",
      couple: [],
      children: [],
    };

    dispatch(addMember({ member: newMember, parentNodeId: parent.id }));
    navigate(-1);
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="group">
                <label>Giới tính:</label>
                <select
                  name="gender"
                  value={formData.gender}
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
                  <option value="Còn sống">Còn sống</option>
                  <option value="Đã mất">Đã mất</option>
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

          {activeTab === "family" && parent! && (
            <div className="family-info p1-r">
              {parent.gender === "male" ? (
                <>
                  {/* Bố: input disabled */}
                  <div className="group">
                    <label>Bố:</label>
                    <input type="text" value={parent.name} disabled />
                  </div>

                  {/* Mẹ: select, nếu bố có nhiều vợ */}
                  <div className="group">
                    <label>Mẹ:</label>
                    <select
                      name="motherId"
                      value={formData.motherId}
                      onChange={handleChange}
                    >
                      {parent.couple && parent.couple.length > 0
                        ? parent.couple.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  {/* Bố: select, nếu mẹ có nhiều chồng (couple của mẹ) */}
                  <div className="group">
                    <label>Bố:</label>
                    <select
                      name="fatherId"
                      value={formData.fatherId}
                      onChange={handleChange}
                    >
                      {parent.couple && parent.couple.length > 0
                        ? parent.couple.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>

                  {/* Mẹ: input disabled */}
                  <div className="group">
                    <label>Mẹ:</label>
                    <input type="text" value={parent.name} disabled />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <Button text="Lưu thay đổi" className="btn-save" onClick={handleSubmit} />
      </div>
    </div>
  );
}
export default AdminThemCon;
