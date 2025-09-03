import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminHeader from "./Header/AdminHeader";
import AdminSider from "./Sider/AdminSider";

const { Content } = Layout;

const layoutStyle = {
  minHeight: "100vh",
};

function AdminLayout() {
  return (
    <>
      <Layout style={layoutStyle}>
        <AdminHeader />
        <Layout style={{ marginTop: 64 }}>
          <AdminSider />
          <Content
            style={{
              marginLeft: "15%",
              padding: 32,
              backgroundColor: "var(--color-light-2)",
              position: "relative",
              overflowY: "auto"
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AdminLayout;
