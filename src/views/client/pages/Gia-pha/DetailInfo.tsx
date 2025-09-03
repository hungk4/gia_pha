import { useState } from "react";
import { useNavigate } from "react-router-dom";

import avatar from "../../../../assets/images/avatar.jpg";

import "./DetailInfo.css";

function DetailInfo() {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  const personData = {
    hoten: "Nguyễn Mạnh Hùng",
    gioitinh: "Nam",
    ngaysinh: "02-09-1990",
    hientrang: "Còn sống",
    ngaymat: "",
    thuongtru: "Hà Nội",
    lienhe: "0852865816",
    bo: "Nguyễn Văn A",
    me: "Nguyễn Văn B",
    honThe: ["Nguyễn Thị C"],
    con: ["Nguyễn Văn D", "Nguyễn Văn E"],
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
                    <strong>{personData.hoten}</strong>
                  </p>
                  <p>
                    <span>Giới tính: </span>
                    <strong>{personData.gioitinh}</strong>
                  </p>
                  <p>
                    <span>Ngày sinh: </span>
                    <strong>{personData.ngaysinh}</strong>
                  </p>
                  <p>
                    <span>Hiện trạng: </span>
                    <strong>{personData.hientrang}</strong>
                  </p>
                  <p>
                    <span>Ngày mất: </span>
                    <strong>
                      {personData.ngaymat
                        ? personData.ngaymat
                        : "--/--/----"}
                    </strong>
                  </p>
                  <p>
                    <span>Thường trú: </span>
                    <strong>{personData.thuongtru}</strong>
                  </p>
                  <p>
                    <span>Liên hệ: </span>
                    <strong>{personData.lienhe}</strong>
                  </p>
                </div>
              )}

              {activeTab === "family" && (
                <>
                  <div className="family-info p1-r">
                    <p>
                      <span>Bố: </span>
                      <strong>{personData.bo}</strong>
                    </p>
                    <p>
                      <span>Mẹ: </span>
                      <strong>{personData.me}</strong>
                    </p>
                    <p>
                      <span>Hôn thê: </span>
                      <strong>{personData.honThe.join(", ")}</strong>
                    </p>
                    <p>
                      <span>Con cái: </span>
                      <strong>{personData.con.join(", ")}</strong>
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
