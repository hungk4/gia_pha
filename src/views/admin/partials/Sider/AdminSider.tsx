import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "./AdminSider.css";

const { Sider } = Layout;

function AdminSider() {
  return (
    <Sider width="12%" className="admin-sider">
      <Menu
        className="admin-sider-menu"
        mode="inline"
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item
          key="1"
          className="menu-item p1-b"
          icon={<span className="material-symbols-outlined">grid_view</span>}
        >
          <Link to="/admin">Tổng quan</Link>
        </Menu.Item>

        <Menu.Item
          key="2"
          className="menu-item p1-b"
          icon={<span className="material-symbols-outlined">graph_1</span>}
        >
          <Link to="/admin/gia-pha">Gia phả</Link>
        </Menu.Item>

        <Menu.Item
          key="3"
          className="menu-item p1-b"
          icon={<span className="material-symbols-outlined">calendar_month</span>}
        >
          <Link to="/admin/su-kien">Sự kiện</Link>
        </Menu.Item>

        <Menu.Item
          key="4"
          className="menu-item p1-b"
          icon={<span className="material-symbols-outlined">image</span>}
        >
          <Link to="/admin/thu-vien">Thư viện</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default AdminSider;
