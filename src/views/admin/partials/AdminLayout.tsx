import "./AdminLayout.css";

import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminHeader from "./Header/AdminHeader";
import AdminSider from "./Sider/AdminSider";

const { Content } = Layout;



const layoutStyle = {
  minHeight: "100vh",
};

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout style={layoutStyle}>
        <AdminHeader />
        <Layout style={{ marginTop: 64 }}>
          <AdminSider collapsed={collapsed} setCollapsed={setCollapsed} />
          {/* Nút trigger custom */}
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              position: "fixed",
              top: "50%",
              left: collapsed ? 0 : 240,
              transform: "translateY(-50%)",
              width: 16,
              height: 48,
              background: "var(--color-primary, #1677ff)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: "0 4px 4px 0",
              zIndex: 1000,
              transition: "left 0.2s",
            }}
          >
            {collapsed ? ">" : "<"}
          </div>

          <Content
            className="admin-content"
            style={{
              marginLeft: collapsed ? 0 : 240,
              padding: 32,
              backgroundColor: "var(--color-light-2)",
              position: "relative",
              overflowY: "auto",
              transition: "all 0.2s",
            }}
          >
            <Outlet context={{collapsed}}/>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AdminLayout;
