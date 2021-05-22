import React from 'react'
import PrivateLayout from '../../components/PrivateLayout'
import styles from "./index.module.scss";
import { useUser } from "../../utils/use-user";

import { Upload, message, Button, Row, Avatar } from 'antd';

import { UploadOutlined ,SettingOutlined ,InsertRowAboveOutlined ,BookOutlined,SolutionOutlined} from '@ant-design/icons';


function profile() {
    const { user } = useUser();
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
    return (
        <div>
            <PrivateLayout>
                <Row justify = "center">
                <div className={styles.profile}>
                   <div className={styles.profileContent}>
                        <Avatar size={150} src={user ? user.photoURL : ''} className={styles.imgUser}/>
                        <div className={styles.profileControl}>
                            <div style = {{display: "flex",height: "40px",alignItems:" center",marginTop: "16px"}}>
                                <div className={styles.userName}>
                                    <span>{user ? user.displayName : ''}</span>
                                </div>
                                <div className={styles.uploadImg}>
                                        <Upload {...props}>
                                            <Button icon={<UploadOutlined />} style = {{width:"180px", borderRadius: "5px"}} >Thêm ảnh của bạn</Button>
                                        </Upload>
                                </div>
                                <SettingOutlined style= {{fontSize:"24px"}} />
                            </div>
                            <div className = {styles.folow}>
                                <p className= {styles.folowItem} >13 bài viết</p>
                                <p className= {styles.folowItem} >48 Nguời theo dõi</p>
                                <p className= {styles.folowItem} >Đang theo dõi 37 người dùng</p>
                            </div>
                            <div className= {styles.menuContol}>
                                <div style={{color:"#000", borderBottom:"1px solid #000"}} className= {styles.menuItem}> <InsertRowAboveOutlined /> Bài Viết</div>
                                <div className= {styles.menuItem}> <BookOutlined /> Đã Lưu</div>
                                <div className= {styles.menuItem}> <SolutionOutlined /> Được gắn thẻ</div>
                            </div>
                        </div>
                   </div>
                   <div className={styles.listImage}>

                   </div>
               </div>
                </Row>
            </PrivateLayout>
        </div>
    )
}

export default profile;
