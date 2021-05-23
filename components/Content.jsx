import React, { useState, useEffect } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { Card, Image, Row, Col, Avatar, Skeleton, Typography } from "antd";
=======
import { Card, Image, Row, Col, Avatar, Skeleton } from "antd";
>>>>>>> refactor api
=======
import { Card, Image, Row, Col, Avatar, Skeleton, Typography } from "antd";
>>>>>>> style for content index
import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
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
          <Col  lg={11} xl={11} xxl={12}>
            {listImg &&
              listImg.map((items) => {
                return (
                    <Row justify="end">
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
                        avatar={
                          <Avatar size={40} src={items.avatar}  />
                        }
                        title={<Link href={items.photographer_url} target="_blank">{items.photographer}</Link>}
                        // description={<Text code>{'#'+items.id}</Text>}
                      />
                    </Card>
                    </Row>
                );
              })}
          </Col>
          <Col  lg={8} xl={8} xxl={12}>
            <div className="App">
              <header><span>Trash talk  💬</span> <ExclamationCircleOutlined style={{fontSize:"20px", marginRight: "4px", cursor: "pointer"}}/></header>
              <section>
                <Chatroom />
              </section>
            </div>
          </Col>
        </Row>
      </div>
      {isFetching || (
        <Row justify="center">
          <Card style={{ width: 614, height: "auto", marginBottom: "50px" }}>
            <Skeleton active />
          </Card>
        </Row>
      )}
    </div>
  );
}

export default Content;
