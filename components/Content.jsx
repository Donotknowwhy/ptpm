import React, { useState, useEffect } from "react";
import { Card, Image, Row, Col, Avatar, Skeleton } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getListImage } from "./../api/image";
import Chatroom from "./Chatroom";
import styles from "./Content.module.scss";
const { Meta } = Card;

function Content() {
  const [listImg, setListImg] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const getData = (page) => {
    console.log("vao day");
    getListImage(page).then((res) => {
      console.log("res", res.data);
      console.log("page", page);
      setIsFetching(false);
      setListImg([...listImg, ...res.data]);
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
          <Col  lg={16} xl={10} xxl={11}>
            {listImg &&
              listImg.map((items) => {
                return (
                    <Row justify="end">
                    <Card
                      title="Image"
                      hoverable
                      style={{
                        width: 614,
                        height: "auto",
                        marginBottom: "50px",
                      }}
                      cover={<Image alt="example" src={items.download_url} />}
                    >
                      <Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={items.author}
                        description="www.instagram.com"
                      />
                    </Card>
                    </Row>
                );
              })}
          </Col>
          <Col  lg={5} xl={6} xxl={6}>
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
        <Row>
          <Card style={{ width: 614, height: "auto", marginBottom: "50px" }}>
            <Skeleton active />
          </Card>
        </Row>
      )}
    </div>
  );
}

export default Content;
