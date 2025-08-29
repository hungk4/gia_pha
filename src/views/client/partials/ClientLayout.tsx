import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import MyHeader from "./Header/Header"
import MyFooter from "./Footer/Footer"


const { Content } = Layout;



function ClientLayout() {
  return (
    <Layout>
      <MyHeader/>
      <Content>
        <Outlet />
      </Content>
      <MyFooter/>
    </Layout>
  )
}

export default ClientLayout;
