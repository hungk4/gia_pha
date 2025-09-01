import "./AdminLogin.css";
import trongdong from "../../../../assets/images/trongdong.png";
function AdminLogin() {
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
          <div className="form-login">
            <div className="form-group">
              <label htmlFor="email" className="p1-r">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập email của bạn"
                className="p2-r"
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
                placeholder="********"
                className="p2-r"
              ></input>
            </div>

            <button type="submit" className="submit-btn p1-r">
              Đăng nhập
            </button>

            <a href="/admin/reset-password" className="forgot-password">
              Quên mật khẩu ?
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
