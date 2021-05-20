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
import { HeartOutlined, HomeOutlined ,SendOutlined 
        ,LogoutOutlined, BookOutlined,UserOutlined,UserSwitchOutlined} 
        from "@ant-design/icons";
const { SubMenu } = Menu;
const { Text, Link } = Typography;


export default function Navigation() {
  const { logout, user } = useUser();
  


  const content = (
    <Menu>
      <Menu.Item key="0">
        <a href="/"><UserOutlined /> Trang cá nhân</a>
      </Menu.Item>
      <Menu.Item key="0">
        <a href="/"><BookOutlined /> Đã lưu</a>
      </Menu.Item>
      <Menu.Item key="0">
        <a href="/"><UserSwitchOutlined /> Chuyển tài khoản</a>
      </Menu.Item>
      <Menu.Item key="1" style={{borderTop: "1px solid #ccc"}}>
        <a onClick={() => logout()}> <LogoutOutlined /> Đăng xuất</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.nav}>
      
        <div>
          <Link href="/" target="_blank" className={styles.textLogo}>
          Í_𝓷𝓽𝓪𝓰𝓻𝓪𝓶
          </Link>
        </div>

        <div className={styles.control}>
        <input type="text" placeholder="Tìm kiếm" className = {styles.search}/>
          <div className={styles.controlItem}>
            <HomeOutlined className={styles.icon} />
          </div>
          <div className={styles.controlItem} style={{position: 'relative'}}>
            <SendOutlined className={styles.icon}/> 
            <span className={styles.countMessage}>2</span>
          </div>
          <div className={styles.controlItem}>
            <HeartOutlined className={styles.icon}/> 
          </div>
          <div className={styles.controlItem}>
            <Popover content={content} trigger="click">
              <img className={styles.userAvt}
                src={user ? user.photoURL : ''}/>
            </Popover>
          </div>
        </div>
  </div>
  );
}
