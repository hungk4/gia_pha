import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminHeader from "./Header/AdminHeader";
import AdminSider from "./Sider/AdminSider";

const { Content } = Layout;


const layoutStyle = {
  overflow: "hidden",
  height: "100vh",
};

function AdminLayout() {
  return (
    <>
      <Layout style={layoutStyle}>
        <AdminHeader/>
        <Layout style={{ marginTop: 64 }}>
          <AdminSider/>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AdminLayout;
