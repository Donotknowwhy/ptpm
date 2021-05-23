import React from "react";
import styles from "./index.module.scss";
import PrivateLayout from '../../components/PrivateLayout'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Chatroom from "../../components/Chatroom";
import {Row} from "antd";


function ChatBox(){
    return (
      <div>
           <PrivateLayout>
              <Row justify="center" style = {{marginTop: "100px", backgroundColor: "#FFF"}}>
                <div className={styles.App}>
                  <header><span>Trash talk  💬</span> <ExclamationCircleOutlined style={{fontSize:"20px", marginRight: "4px", cursor: "pointer"}}/></header>
                  <section>
                    <Chatroom />
                  </section>
                </div>
              </Row>
          </PrivateLayout>
        
      </div>
    );
}

export default ChatBox;