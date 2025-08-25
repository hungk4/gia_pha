import MyHeader from "./Header/Header";
import MyFooter from "./Footer/Footer";

import { Layout } from "antd";

const { Content } = Layout;

function MainLayout({ children }) {
  return (
    <Layout>
      <MyHeader/>
      <Content>
        {children}
      </Content>
      <MyFooter/>
    </Layout>
  )
}

export default MainLayout;
