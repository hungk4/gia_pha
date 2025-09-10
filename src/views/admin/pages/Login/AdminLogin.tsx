import "./AdminLogin.css";
import trongdong from "../../../../assets/images/trongdong.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../../redux/store";
import type { AppDispatch } from "../../../../redux/store";
import { login } from "../../../../redux/user/userSlice";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, currentUser } = useSelector(
    (state: RootState) => state.user
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/admin");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <div className="adminLogin-container">
        <div className="side">
          <div className="hero-img">
            <img src={trongdong} alt="Logo GiaphaViet"></img>
          </div>
        </div>
        <div className="content">
          <h1 className="title h1">GiaphaViet</h1>
          <form className="form-login" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="p1-r">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="emilys"
                className="p2-r"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="p1-r">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="emilyspass"
                className="p2-r"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <button type="submit" className="submit-btn p1-r">
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <a href="/admin/reset-password" className="forgot-password">
              Quên mật khẩu ?
            </a>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
