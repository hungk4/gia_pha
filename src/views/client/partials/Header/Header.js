import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

function Header() {
  const [isSidebar, setIsSidebar] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="logo h4">GiaphaViet</div>
        <nav className={isSidebar ? "sidebar" : ""}>
          <ul className="p1-b">
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/gia-pha">Gia phả</Link>
            </li>
            <li>
              <Link to="/su-kien">Sự kiện</Link>
            </li>
            <li>
              <Link to="/thu-vien">Thư viện</Link>
            </li>
          </ul>
        </nav>
        <span
          className="material-symbols-outlined"
          onClick={() => setIsSidebar(!isSidebar)}
        >
          menu
        </span>
      </div>
    </header>
  );
}

export default Header;
