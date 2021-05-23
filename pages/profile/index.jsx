import React, { useState, useEffect } from "react";
import PrivateLayout from "../../components/PrivateLayout";
import styles from "./index.module.scss";
import { useUser } from "../../utils/use-user";
import { storage, user } from "../../api/firebase-client";
import { v4 as uuidv4 } from "uuid";

import { Upload, message, Button, Row, Avatar, Col, Grid, Modal } from "antd";
import {
  UploadOutlined,
  SettingOutlined,
  InsertRowAboveOutlined,
  BookOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { getSignedURL, putImage } from "../../api/image";

import CardImage from "../CardImage/index";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const openNotification = () => {
  notification.open({
    message: "Tải ảnh lên thành công",
  });
};

function profile() {
  const { user } = useUser();

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  );
  const [previewTitle, setPreviewTitle] = useState("[previewTitle");

  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancelPreview = () => {
    setPreviewVisible(false);
  };

  const handleChange = ({ fileList = [] }) => {
    console.log(fileList);
    setFileList(fileList);
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div>Tải ảnh lên</div>
    </div>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    fileList.map((items) => {
      const name =
        uuidv4(items.name.split(".")[0]) + "." + items.name.split(".")[1];
      console.log(name);
      getSignedURL(name)
        .then((res) => {
          console.log(res.data.data);
          putImage(res.data.data, items.originFileObj);
        })
        .catch((error) => console.log("error"));
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <PrivateLayout>
        <Row justify="center">
          <div className={styles.profile}>
            <div className={styles.profileContent}>
              <Avatar
                size={150}
                src={user ? user.photoURL : ""}
                className={styles.imgUser}
              />
              <div className={styles.profileControl}>
                <div
                  style={{
                    display: "flex",
                    height: "40px",
                    alignItems: " center",
                    marginTop: "16px",
                  }}
                >
                  <div className={styles.userName}>
                    <span>{user ? user.displayName : ""}</span>
                  </div>
                  <div className={styles.uploadImg}>
                    <Button
                      icon={<UploadOutlined />}
                      style={{ width: "180px", borderRadius: "5px" }}
                      onClick={showModal}
                    >
                      Thêm ảnh của bạn
                    </Button>
                    <Modal
                      visible={isModalVisible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      width={550}
                      title="Tải ảnh lên"
                    >
                      <Row justify="center">
                        <Upload
                          fileList={fileList}
                          listType="picture-card"
                          onPreview={handlePreview}
                          onChange={handleChange}
                        >
                          {fileList.length >= 5 ? null : uploadButton}
                        </Upload>
                      </Row>

                      <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancelPreview}
                      >
                        <img
                          alt="example"
                          style={{ width: "100%" }}
                          src={previewImage}
                        />
                      </Modal>
                    </Modal>
                  </div>
                  <SettingOutlined style={{ fontSize: "24px" }} />
                </div>
                <div className={styles.folow}>
                  <p className={styles.folowItem}>13 bài viết</p>
                  <p className={styles.folowItem}>48 Nguời theo dõi</p>
                  <p className={styles.folowItem}>
                    Đang theo dõi 37 người dùng
                  </p>
                </div>
                <div className={styles.menuContol}>
                  <div
                    style={{ color: "#000", borderBottom: "1px solid #000" }}
                    className={styles.menuItem}
                  >
                    {" "}
                    <InsertRowAboveOutlined /> Bài Viết
                  </div>
                  <div className={styles.menuItem}>
                    {" "}
                    <BookOutlined /> Đã Lưu
                  </div>
                  <div className={styles.menuItem}>
                    {" "}
                    <SolutionOutlined /> Được gắn thẻ
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.listImage}>
              <CardImage />
            </div>
          </div>
        </Row>
      </PrivateLayout>
    </div>
  );
}

export default profile;
