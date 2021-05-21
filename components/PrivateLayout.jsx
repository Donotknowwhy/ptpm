import { Layout } from "antd";
import React from "react";
import Navigation from "./Navigation";

const { Header, Footer } = Layout;

function PrivateLayout(props) {
  return (
    <div>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" , height:"80px", backgroundColor: "#fff" , borderBottom: "1px solid #ccc"}}>
          <Navigation />
        </Header>
        <Layout>
          {props.children}
        </Layout>
      </Layout>
    </div>
  );
}

export default PrivateLayout;
