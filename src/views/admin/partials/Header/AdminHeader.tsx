import "./AdminHeader.css"

import avatar from "../../../../assets/images/avatar.jpg"

function AdminHeader() {
  return (
    <header>
      <div className="container">
        <div className="logo h4">GiaphaViet</div>
        <div className="avatar">
          <img src={avatar} alt="user avatar"></img>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader