import "./AdminHeader.css"

import avatar from "../../../../assets/images/avatar.jpg"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../redux/store";


function AdminHeader() {
  const [popup, setPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  }

  return (
    <header>
      <div className="container">
        <div className="logo h4">GiaphaViet</div>
        <div className="user" onClick={() => setPopup(!popup)}>
          <img src={currentUser?.image || avatar} alt="user avatar"></img>
          <p className="name p2-b">{currentUser?.username || "Nguyễn Mạnh Hùng"}</p>

          {popup && (
            <div className="user-popup">
              <button onClick={handleLogout}>Đăng xuất</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default AdminHeader