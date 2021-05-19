import React, { useState, useEffect } from "react";
import { Card, Image, Row, Col, Avatar, Skeleton } from "antd";
import { getListImage } from "./../api/image";

const { Meta } = Card;

function Content() {
  const [listImg, setListImg] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const getData = (page) => {
    console.log("vao day")
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
        {listImg &&
          listImg.map((items) => {
            return (
              <Row justify="center"
                  key={items.id}
              >
                <Card
                  title="Image"
                  hoverable
                  style={{ width: 614, height: "auto", marginBottom: "50px" }}
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
      </div>
      {isFetching || (
        <Row justify="center">
          <Card style={{ width: 500, height: "auto", marginBottom: "50px" }}>
            <Skeleton active />
          </Card>
        </Row>
      )}
    </div>
  );
}

export default Content;
