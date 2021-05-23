import React, { useState, useEffect } from "react";

import {
  Card,
  Image,
  Row,
  Col,
  Avatar,
  Skeleton,
  Typography,
  Tooltip,
} from "antd";

import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import { getListImage } from "./../api/image";
import Chatroom from "./Chatroom";
import styles from "./Content.module.scss";
const { Meta } = Card;

const { Text, Link } = Typography;
function Content() {
  const [listImg, setListImg] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const getData = (page) => {
    getListImage(page).then((res) => {
      console.log(res.data.data);
      setIsFetching(false);
      setListImg([...listImg, ...res.data.data.photos]);
    });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.scrollHeight ||
      isFetching
    ) {
      return;
    }
    setIsFetching(true);
  };

  useEffect(() => {
    getData(page);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    getData(page + 1);
    setPage(page + 1);
  }, [isFetching]);

  return (
    <div>
      <div style={{ "margin-top": "100px" }}>
        <Row justify="center">
          <Col xs={24} sm={23} md={16} lg={11} xl={13} xxl={13} style={{"margin-right":"16px", "margin-left":"16px"}}>
            <Row justify="end">
              {listImg &&
                listImg.map((items) => {
                  return (
                    <Card
                      hoverable
                      style={{
                        width: 614,
                        height: "auto",
                        marginBottom: "50px",
                      }}
                      cover={<Image alt="example" src={items.src.original} />}
                    >
                      <Meta
                        avatar={<Avatar size={40} src={items.avatar} />}
                        title={
                          <Link href={items.photographer_url} target="_blank">
                            {items.photographer}
                          </Link>
                        }
                        // description={<Text code>{'#'+items.id}</Text>}
                      />
                    </Card>
                  );
                })}
              {isFetching || (
                <Card
                  style={{ width: 614, height: "auto", marginBottom: "50px" }}
                >
                  <Skeleton active />
                </Card>
              )}{" "}
            </Row>
          </Col>
          <Col md={24} lg={8} xl={8} xxl={10}>
            <div className="App">
              <header>
                <span>Trash talk 💬</span>{" "}
                <ExclamationCircleOutlined
                  style={{
                    fontSize: "20px",
                    marginRight: "4px",
                    cursor: "pointer",
                  }}
                />
              </header>
              <section>
                <Chatroom />
              </section>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Content;
