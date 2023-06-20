import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Chat.css";
import sendMessageIcon from "../../Assets/Images/sendMessage.png";
import paperClip from "../../Assets/Images/paperclip.png";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "emoji-picker-react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Client } from "@twilio/conversations";
import { TwilioService } from "../Messages/twilioService";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const ALLOWED_FILE_TYPES = ["image", "Image", "video", "Video"];
const Chat = () => {
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [conversationId] = useState(location.state.fullData.sid);
  const chatClientChannel = useRef();
  const chatMessagesPaginator = useRef();
  const [messagesList, setMessageList] = useState([]);
  const [conversation, setConversation] = useState();
  const [token] = useState(localStorage.getItem("twillio_token"));
  const [isMedia] = useState([]);
  const [isMediaIndex] = useState([]);
  const [paginator, setPaginator] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState([]);

  useEffect(() => {
    conversationStart();
  }, [location.state.fullData]);

  const setConversationEvents = useCallback((channel) => {
    chatClientChannel.current = channel;
    chatClientChannel.current.on("messageAdded", (message) => {
      const newMessage = TwilioService.getInstance().parseMessage(message);
      loadMessages();
    });
    return chatClientChannel.current;
  }, []);

  const bottomOfPage = () => {
    var objDiv = document.getElementById("thisDiv");
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  const loadMessages = async () => {
    TwilioService.getInstance()
      .getChatClient(token)
      .then((client) => client.getConversationBySid(conversationId))
      .then((conversation) => setConversationEvents(conversation))
      .then((currentChannel) => currentChannel.getMessages())
      .then((paginator) => {
        setPaginator(paginator);
        chatMessagesPaginator.current = paginator;
        const newMessages = TwilioService.getInstance().parseMessages(paginator.items);
        setMessageList(newMessages.reverse());
        bottomOfPage();
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
  };

  useEffect(async () => {
    bottomOfPage();
    loadMessages();
  }, [conversationId, setConversationEvents]);

  const conversationStart = async () => {
    const conversationsClient = await Client.create(token);
    const convo = await conversationsClient.getConversationBySid(conversationId);
    setConversation(convo);
  };

  const messageAdded = async (e) => {
    e.preventDefault();
    const message = inputValue.trim();
    let image = uploadedMedia;
    let formData = new FormData();

    for (let index = 0; index < image.length; index++) {
      formData.append(image[index].type, image[index]);
      conversation.sendMessage(formData);
    }

    if (message) {
      conversation.sendMessage(message);
    }
    setUploadedMedia([]);
    setInputValue("");
  };

  const getInputValue = (e) => {
    setShowEmoji(false);
    setInputValue(e.target.value);

    if (e.which === 13) {
      setInputValue("");
      messageAdded(e);
    }
  };

  const showEmojiFunc = () => {
    setShowEmoji(!showEmoji);
  };

  const onEmojiClick = (event, emojiObject) => {
    let newString = inputValue + emojiObject.emoji;
    setInputValue(newString);
  };

  const checkImage = (image) => {
    let file_type = image.type.split("/")[0];
    return ALLOWED_FILE_TYPES.some((x) => {
      return x == file_type;
    });
  };

  const uploadPicture = async (event) => {
    let images = [];
    for (let index = 0; index < event.target.files.length; index++) {
      const bool = checkImage(event.target.files[index]);
      if (bool) {
        images[index] = event.target.files[index];
        toast.success(`${images[index].name} uploaded successfully`);
      } else {
        toast.info("You are allowed to upload only pictures and video files");
      }
    }
    setUploadedMedia(images);
  };

  const mediaShow = (message) => {
    message.media.getContentTemporaryUrl().then(function (url) {
      window.open(url);
    });
  };

  return (
    <>
      <div className="card d-flex align-self-stretch notificationCard mbottom">
        <h6 className="card-title notificationBar">Messages</h6>
        <div className="card-body text-center">
          <div id="thisDiv" className="notificationBody messageNotificationBody">
            {messagesList.length ? (
              messagesList.map((item, index) => (
                <>
                  {item.user.name === localStorage.getItem("username") ? (
                    <div className="row divRight">
                      <Stack direction="row" className="pictureRight" spacing={2}>
                        <span className="userNameChatRight">{item.user.name}</span>
                        <Avatar alt={item.user.name} src="/static/images/avatar/1.jpg" />
                      </Stack>

                      <span className="right shareRightLeft mt-2">
                        {paginator.items[index].type !== "text" ? (
                          <>
                            {item?.text ? item.text : null}
                            <p
                              className="pointer"
                              onClick={() => mediaShow(paginator.items[index])}
                            >
                              Click To View Media
                            </p>
                          </>
                        ) : (
                          item.text
                        )}
                      </span>
                      <span className="rightTime shareRightLeftTime">
                        {moment(item.createdAt).format("hh:mm A")}
                      </span>
                    </div>
                  ) : (
                    <div className="row divLeft">
                      <span className="userNameChatLeft">{item.user.name}</span>
                      <Stack direction="row" className="pictureLeft" spacing={2}>
                        <Avatar alt={item.user.name} src="/static/images/avatar/1.jpg" />

                        <span className="left row shareRightLeft mt-2">
                          {paginator.items[index].type !== "text" ? (
                            <>
                              {item?.text ? item.text : null}
                              <p
                                className="pointer"
                                onClick={() => mediaShow(paginator.items[index])}
                              >
                                Click To View Media
                              </p>
                            </>
                          ) : (
                            item.text
                          )}
                        </span>
                        <span className="leftTime shareRightLeftTime">
                          {moment(item.createdAt).format("hh:mm A")}
                        </span>
                      </Stack>
                    </div>
                  )}
                </>
              ))
            ) : (
              <h5 className="d-flex justify-content-center">Start Your Conversation</h5>
            )}
          </div>
          {/* <div className="row messageInputField sameLine"> */}
          <form onSubmit={(e) => messageAdded(e)} className="row messageInputField sameLine">
            <span className=" emojiPicker">
              {showEmoji ? <Picker onEmojiClick={onEmojiClick} /> : null}
            </span>
            <div className="col-10">
              <textarea
                required
                className="borderNone d-flex"
                type="text"
                placeholder={
                  uploadedMedia.length
                    ? `${uploadedMedia.length} file uploaded `
                    : "enter your message here"
                }
                onKeyPress={(e) => getInputValue(e)}
                onChange={(e) => getInputValue(e)}
                onClick={() => setShowEmoji(false)}
                value={inputValue}
              />
            </div>
            <div className="col-2 fieldsCss ">
              <span className="">
                <BsEmojiSmile
                  onClick={showEmojiFunc}
                  className="marginLeft"
                  style={{ height: "2rem", width: "35px" }}
                />

                <label htmlFor="attachment">
                  <img src={paperClip} alt="notFound" className="marginLeft" />
                </label>
                <input
                  id="attachment"
                  style={{ display: "none" }}
                  type="file"
                  multiple
                  onChange={uploadPicture}
                />

                <label htmlFor="sendMessage">
                  <img
                    src={sendMessageIcon}
                    alt="ImageNotFound"
                    height={35}
                    className="marginLeft"
                  />
                </label>
                <input id="sendMessage" style={{ display: "none" }} type="submit" />
              </span>
            </div>
          </form>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
export default Chat;
