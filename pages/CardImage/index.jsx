import React from "react";
import styles from "./index.module.scss";
import { Card, Image, Row, Col, Avatar, Skeleton } from "antd";

const { Meta } = Card;
function CardImage(){
    return (
        <Row justify="center">
            <Card
                title="Image"
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
                description="www.instagram.com"
                />
            </Card>
        </Row>
    );
}

export default CardImage;