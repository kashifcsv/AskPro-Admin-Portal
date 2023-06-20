import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

// Second page going to be load for 'SOCKETS'
// USER ENTER

// useEffect called when a component is made or when a state is changed 

let closeIcon = null;
let sendLogo = null;

let socket;
const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  console.log(messages);
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    // setting id of new user 
    socket.on("connect", () => {
      setid(socket.id);
    });

    // this chunk of code name as id
    socket.emit("joined", { user });

    // this chunk of code is present inside socket.on('joined',({user})=>{ at server index.js
    // and showing message that is admin said welocme to the chat
    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    // this chunk of code is present inside socket.on('joined',({user})=>{ at server index.js
    // and send message to everone, else the user that has joined 
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>C CHAT</h2>
          <a href="/">
            {" "}
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {/* we are sending user, message and his class to Message.js  */}
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user} // if id matches user is old else new user has joined
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
