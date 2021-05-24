import { UploadOutlined } from '@ant-design/icons';
import { Modal, notification, Row, Upload } from 'antd';
import React, { useState } from 'react';
import { storage, user } from '../api/firebase-client';
import { getCurrentUser } from '../utils/use-user';

const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

const openNotification = () => {
  notification.open({
    message: 'Cập nhật ảnh đại diện thành công',
  });
};

export default function ModalUploadImg(props) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [image, setImage] = useState('');
  const [lengthArr, setLengthArr] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState({imgUrl: ''});




  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleCancelPreview = () => {
    setPreviewVisible(false);
  };

  const handleChange = ({fileList}) => {
    setLengthArr(fileList);
    setImage( fileList.length != 0 ? fileList[0].originFileObj : null );
  };


  const uploadButton = (
    <div>
      <UploadOutlined />
      <div>Tải ảnh lên</div>
    </div>
  );


  const [isModalVisible, setIsModalVisible] = useState(true);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    props.toggleUpdate();
    getCurrentUser().then((values) => {
      const uploadTask = storage().ref(`/avatar/${values.uid}/${image.name}`).put(image);
      uploadTask.on('state_changed',
          (snapShot) => {
          // takes a snap shot of the process as it is happening
            console.log(snapShot);
          }, (err) => {
          // catches the errors
            console.log(err);
          }, () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
            storage().ref(`avatar/${values.uid}`).child(image.name).getDownloadURL()
                .then((fireBaseUrl) => {
                  user().updateProfile({
                    photoURL: fireBaseUrl,
                  }).catch((error) => {
                    console.log('loi' + error);
                  }).then( () => {
                    openNotification();
                    // setAvtUrl(fireBaseUrl);
                    setTimeout(window.location.reload.bind(window.location), 1500);
                  });
                });
          });
    });
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    props.toggleUpdate();
  };

  return (
    <>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={250}
        title="Cập nhật ảnh đại diện"
      >
        <Row justify='center'>
          <Upload
            id="file"
            // className={image.length == 0 ? styles.upload : null}
            listType="picture-card"
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {lengthArr.length >= 1 ? null : uploadButton}
          </Upload>
        </Row>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancelPreview}
        >
          <img alt="example" style={{width: '100%'}} src={previewImage} />
        </Modal>

      </Modal>
    </>
  );
}
