import React, { useState, useEffect } from "react";
import PrivateLayout from "../../components/PrivateLayout";
import styles from "./index.module.scss";
import { getCurrentUser, useUser } from "../../utils/use-user";
import { storage, user } from "../../api/firebase-client";
import { v4 as uuidv4 } from "uuid";

import {
  Upload,
  message,
  Button,
  Row,
  Avatar,
  Col,
  Grid,
  Modal,
  notification,
  Card,
  Image,
  Skeleton,
} from "antd";
import {
  UploadOutlined,
  SettingOutlined,
  InsertRowAboveOutlined,
  BookOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import {
  getSignedURL,
  putImage,
  saveUser,
  getImageByUser,
} from "../../api/image";

const { Meta } = Card;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const successNotification = () => {
  notification.success({
    message: "Tải ảnh lên thành công",
  });
};

function profile() {
  const { user } = useUser();

  const [image, setImage] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getCurrentUser().then((values) => {
      getImageByUser(values.uid).then((res) => {
        console.log(values.uid);
        console.log(res.data.data.images);
        setImage(res.data.data.images.reverse());
        setIsFetching(true);
      });
    });
  }, []);

  // useEffect(() => {
  //   getCurrentUser().then((values) => {
  //     getImageByUser(values.uid).then((res) => {
  //       console.log(res.data.data.images);
  //       setImage(res.data.data.images.reverse());
  //     });
  //   });
  // }, [change]);

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
    getCurrentUser().then((values) => {
      fileList.map((items) => {
        const name =
          uuidv4(items.name.split(".")[0]) + "." + items.name.split(".")[1];
        console.log(name);
        getSignedURL(name)
          .then((res) => {
            console.log(res.data.data);
            putImage(res.data.data, items.originFileObj)
              .then(() => {
                successNotification();
                saveUser(values.uid, name)
                  .then(() => console.log("save user success"))
                  .catch((error) => {
                    console.log("error: " + error);
                  });
                setTimeout(window.location.reload.bind(window.location), 1500);
              })
              .catch((error) => {
                console.log("error: " + error);
              });
          })
          .catch((error) => console.log("error: " + error));
      });
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <PrivateLayout>
        <Row justify="center" style = {{backgroundColor: '#fff' , width: '100%'}}>
            <div className={styles.profileContent}>
            <Row justify="center" style = {{backgroundColor: '#fff' , width: '100%'}}>
              <Col xs = {24} sm = {24} md = {8}>
                <div style = {{display: 'flex', justifyContent: 'center'}}>
                    <Avatar
                    size={150}
                    src={user ? user.photoURL : ""}
                    className={styles.imgUser}
                  />
                </div>
              </Col>
              <Col xs = {24} sm={24} md={16}>
              <div className={styles.profileControl}>
                <div 
                  className={styles.profileControlUpload}
                  style={{
                    display: "flex",
                    height: "40px",
                    alignItems: " center",
                    marginTop: "16px",
                    width: "100%"
                  }}
                >
                  <div className={styles.userName}>
                    <span>{user ? user.displayName : ""}</span>
                  </div>
                  <div className={styles.uploadImg}>
                    <Button
                    className = {styles.btnUpload}
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
                  <SettingOutlined style={{ fontSize: "24px" }} className = {styles.iconSeting} />
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
              </Col>
              </Row>
            </div>
            
            <div className={styles.listImage}>
              <Row  gutter={[8, 8]} style = {{backgroundColor: '#fff' , width: '100%'}}>
                {image && image.map((items) => {
                    return (
                      
                      <Col span={8} xs = {24} sm = {12} lg={8} md={8} className={styles.colImage}>
                        <div className={styles.boxImg}>
                          <Image
                              className = {styles.ImgItem}
                              width={294}
                              src={items}
                              style={{display:"flex", justifyContent: "center"}}
                          />
                        </div>
                      </Col>
                     
                    );
                  })}
                {isFetching == false && (
                  <Row justify="center">
                    <Card
                      style={{
                        width: 614,
                        height: "auto",
                        marginBottom: "50px",
                      }}
                    >
                      <Skeleton active />
                    </Card>
                  </Row>
                )}
              </Row>
            </div>
        </Row>
      </PrivateLayout>
    </div>
  );
}

export default profile;
