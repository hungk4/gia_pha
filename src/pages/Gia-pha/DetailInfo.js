import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import avatar from "../../assets/images/avatar.jpg";

import "./DetailInfo.css";

function DetailInfo() {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();
  return (
    <>
      <Header />
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
                    <strong>Nguyễn Mạnh Hùng</strong>
                  </p>
                  <p>
                    <span>Giới tính: </span>
                    <strong>Nam</strong>
                  </p>
                  <p>
                    <span>Ngày sinh: </span>
                    <strong>dd/mm/yyyy</strong>
                  </p>
                  <p>
                    <span>Hiện trạng: </span>
                    <strong>Còn sống</strong>
                  </p>
                  <p>
                    <span>Ngày mất: </span>
                    <strong>--/--/----</strong>
                  </p>
                  <p>
                    <span>Thường trú: </span>
                    <strong>Hà Nội</strong>
                  </p>
                  <p>
                    <span>Liên hệ: </span>
                    <strong>0852865816</strong>
                  </p>
                </div>
              )}

              {activeTab === "family" && (
                <>
                  <div className="family-info p1-r">
                    <p>
                      <span>Bố: </span>
                      <strong>Nguyễn Văn A</strong>
                    </p>
                    <p>
                      <span>Mẹ: </span>
                      <strong>Nguyễn Văn B</strong>
                    </p>
                    <p>
                      <span>Con cái: </span>
                      <strong></strong>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetailInfo;
