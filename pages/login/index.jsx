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
            <h3 style={{textAlign: 'center'}}>Welcome to Í_𝓷𝓽𝓪𝓰𝓻𝓪𝓶</h3>
            <SocialLogin />

            <span>You don't have an account? <a>Register</a></span>
            <p style = {{textAlign: 'center'}}>DownLoadApp.</p>
            <div className={styles.downLoadApp}>
              <img src="https://appradar.com/wp-content/uploads/App-Store-Google-Play-Icons.png"></img>
            </div>
          </Card>
        </Row>
      </Layout>
    </div>
  );
}
