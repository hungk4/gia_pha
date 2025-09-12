import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import avatar from "../../../../assets/images/avatar.jpg";

import "./DetailInfo.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { searchMemberById } from "../../../../helper/searchMemberById";
import { type Person } from "../../../../redux/familyTree/familyTreeSlice";

function DetailInfo() {
  const data = useSelector((state: RootState) => state.familyTree);
  const { id: personId } = useParams<{ id: string }>();
  let person: Person | null = null;

  if (personId) {
    person = searchMemberById(data, personId);
  }

  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  const personData = {
    name: person?.name ?? "",
    gender: person?.gender ?? "male",
    year: person?.year ?? "yyyy-mm-dd",
    status: person?.status ?? "Alive",
    deathYear: person?.deathYear ?? "",
    address: person?.address ?? "",
    contact: person?.contact ?? "",
    fatherId: person?.fatherId ?? "",
    motherId: person?.motherId ?? "",
    couple: person?.couple ?? [],
    children: person?.children ?? [],
  };

  return (
    <>
      <div className="body">
        <div className="detailInfo-container">
          <div className="detailInfo-card">
            <span
              className="material-symbols-outlined close-btn"
              onClick={() => {
                navigate(-1);
              }}
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
                  <p>
                    <span>Họ tên: </span>
                    <strong>{personData.name}</strong>
                  </p>
                  <p>
                    <span>Giới tính: </span>
                    <strong>{personData.gender}</strong>
                  </p>
                  <p>
                    <span>Ngày sinh: </span>
                    <strong>{personData.year}</strong>
                  </p>
                  <p>
                    <span>Hiện trạng: </span>
                    <strong>
                      {personData.status === "Alive" ? "Còn sống" : "Đã mất"}
                    </strong>
                  </p>
                  {personData.status === "Deceased" && (
                    <p>
                      <span>Ngày mất: </span>
                      <strong>{personData.deathYear}</strong>
                    </p>
                  )}
                  <p>
                    <span>Thường trú: </span>
                    <strong>{personData.address}</strong>
                  </p>
                  <p>
                    <span>Liên hệ: </span>
                    <strong>{personData.contact}</strong>
                  </p>
                </div>
              )}

              {activeTab === "family" && (
                <>
                  <div className="family-info p1-r">
                    <p>
                      <span>Bố: </span>
                      <strong>
                        {person?.fatherId
                          ? searchMemberById(data, person.fatherId)?.name
                          : ""}
                      </strong>
                    </p>
                    <p>
                      <span>Mẹ: </span>
                      <strong>
                        {person?.motherId
                          ? searchMemberById(data, person.motherId)?.name
                          : ""}
                      </strong>
                    </p>
                    <p>
                      <span>Hôn thê: </span>
                      <ul>
                        {person?.couple.map((c) => (
                          <li key={c.id}>{c.name}</li>
                        ))}
                      </ul>
                    </p>
                    <p>
                      <span>Con cái: </span>
                      <ul>
                        {person?.children.map((child) => (
                          <li key={child.id}>{child.name}</li>
                        ))}
                      </ul>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailInfo;
