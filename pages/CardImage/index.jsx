import React from "react";
import styles from "./index.module.scss";
import { Card, Image, Row, Col, Avatar, Skeleton } from "antd";

const { Meta } = Card;
function CardImage(){
    return (
        <Row justify="center">
            <Card
                hoverable
                style={{
                    width: "614px",
                    height: "auto",
                    marginBottom: "50px",
                }}
                cover={<Image alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            >
                <Meta
                avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="This is title"
                />
            </Card>
        </Row>
    );
}

export default CardImage;