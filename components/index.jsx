import React from "react";
import { Layout, Menu, Breadcrumb, Row, Col, Popover, Button } from "antd";
import styles from "./index.module.scss";
import Navigation from "./Navigation";
import Content from "./Content";

const { Header, Footer } = Layout;

function index(props) {
  return (
    <div>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <Navigation />
        </Header>
        <Layout>
          <Content />
        </Layout>
      </Layout>
    </div>
  );
}

export default index;
