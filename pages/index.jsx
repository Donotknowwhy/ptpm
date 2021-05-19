import { useEffect } from "react";
import { useRouter } from 'next/router';
import Main from "../components";
import { Typography } from "antd";
import { getAccessToken } from './../utils/cookies';

const { Title } = Typography;

export default function Home() {
  const accessToken = getAccessToken();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) router.push('/login');
  }, []);


  return (
    <div>
      <Main />
      <div style={{ padding: "0 50px", marginTop: 64 }}>
        <Title level={3}>
          
        </Title>
      </div>
    </div>
  );
}