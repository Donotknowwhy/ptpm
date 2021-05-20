import { Layout, Row, Col, Card } from "antd";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SocialLogin from "./../../components/SocialLogin";
import styles from "./index.module.scss";
import { getAccessToken } from "./../../utils/cookies";

const { Meta } = Card;

export default function PublicLayout() {
  const router = useRouter();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) router.push("/");
  }, []);

  return (
    <div>
      <Layout className={styles.cover}>
        <Row justify="center">
          <Card className={styles.card} hoverable>
          <Meta title=""  />
            <h3 style={{textAlign: 'center'}}>Welcome to íntagarm</h3>
            <SocialLogin />

            <span>Bạn Không có tài khoản? <a>Đăng ký</a></span>
            <p>Tải ứng dụng.</p>
            <div className={styles.downLoadApp}>
              <img src="https://appradar.com/wp-content/uploads/App-Store-Google-Play-Icons.png"></img>
            </div>
          </Card>
        </Row>
      </Layout>
    </div>
  );
}
