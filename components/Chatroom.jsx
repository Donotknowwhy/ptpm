import React, { useState, useEffect, useRef } from "react";
import { formatRelative } from 'date-fns';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import {
  Row, Col, Avatar, Dropdown, Space,
  Typography, Card, Image, Menu, Modal, Button,
} from 'antd';
import { SendOutlined , SmileOutlined} from "@ant-design/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const auth = firebase.auth();
const firestore = firebase.firestore();


const {Text} = Typography;
const formatDate = date => {
  let formattedDate = '';
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

function Chatroom() {
  const [user] = useAuthState(auth);
  const dummy = useRef();
  const messagesRef = firestore.collection("demo1");
  const query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chatbox">
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Nhắn tin..."
        />

        <button type="submit" disabled={!formValue}>
          <SendOutlined/>
        </button>
      </form>
    </div>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL, createdAt, displayName } = props.message;

  useEffect(() => {
    console.log("aa "+firebase.firestore.FieldValue.serverTimestamp())
  },[])

  const messageClass = auth.currentUser
    ? uid === auth.currentUser.uid
      ? "sent"
      : "received"
    : "";


  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          className="imgchat"
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <div className = "linechat">
          <div className = "timechat">
            {displayName ? (
                  <span className="namechat"><Text strong>{displayName}</Text></span>
                ) : null}
            {createdAt?.seconds ? (
                <span className="createdAt">
                  <Text disabled>{formatDate(new Date(createdAt.seconds * 1000))}</Text>
                </span>
              ) : null}
          </div>
             <p>{text}</p>
        </div>
      </div>
    </>
  );
}

export default Chatroom;
