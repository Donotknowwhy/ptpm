import Main from "../components";
import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
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
