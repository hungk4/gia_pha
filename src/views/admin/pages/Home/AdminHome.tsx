import "./AdminHome.css";

import Card3 from "../../../../components/Card3/Card3";

function AdminHome() {
  return (
    <>
      <div className="adminhome-container">
        <h2 className="title-page">Tổng quan</h2>

        <div className="overview">
          <Card3
            icon="graph_1"
            text="9 người"
            title="Gia phả"
            link="/admin/gia-pha"
          />
          <Card3
            icon="calendar_month"
            text="10 sự kiện"
            title="Sự kiện"
            link="/admin/su-kien"
          />
          <Card3
            icon="image"
            text="10 album"
            title="Thư viện"
            link="/admin/thu-vien"
          />
        </div>
      </div>
    </>
  );
}

export default AdminHome;
