import { useEffect } from "react";
import { useRouter } from 'next/router';
import { Typography } from "antd";
import { getAccessToken } from './../utils/cookies';
import PrivateLayout from './../components/PrivateLayout';
import Content from './../components/Content';

const { Title } = Typography;

export default function Home() {
  const accessToken = getAccessToken();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) router.push('/login');
  }, []);


  return (
    <div>
      <PrivateLayout>
        <Content />
      </PrivateLayout>
    </div>
  );
}
