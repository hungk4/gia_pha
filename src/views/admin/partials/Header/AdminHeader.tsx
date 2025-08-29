import "./AdminHeader.css"

import avatar from "../../../../assets/images/avatar.jpg"

function AdminHeader() {
  return (
    <header>
      <div className="container">
        <div className="logo h4">GiaphaViet</div>
        <div className="user">
          <img src={avatar} alt="user avatar"></img>
          <p className="name p2-b">Nguyễn Mạnh Hùng</p>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader