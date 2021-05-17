import { useState } from "react";
import { Menu, Select, Row, Col, Popover, Button, Typography } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styles from "./Navigation.module.scss";
import { signOut } from "../api/firebase-client";
import { useUser } from "../utils/use-user";
import { UnorderedListOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
const { Text, Link } = Typography;

export default function Navigation() {
  const { logout } = useUser();
  const content = (
    <Menu>
      <Menu.Item key="0">
        <a href="/">Trang chủ</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a onClick={() => logout()}>Đăng xuất</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row justify="space-around">
        <Col xs={0} sm={21} md={22}>
          <Link href="/" target="_blank">
            Trang chủ
          </Link>
        </Col>

        <Col xs={0} sm={3} md={2}>
          <Button onClick={() => logout()}>Đăng xuất</Button>
        </Col>

        <Col xs={24} sm={0} md={0}>
          <Popover content={content} trigger="click">
            <Button icon={<UnorderedListOutlined />}></Button>
          </Popover>
        </Col>
      </Row>
    </>
  );
}
