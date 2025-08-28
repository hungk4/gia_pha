import { ReactNode } from "react";
import { Layout } from "antd";

import MyHeader from "./Header/Header"
import MyFooter from "./Footer/Footer"


const { Content } = Layout;


interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({children} : MainLayoutProps) {
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
