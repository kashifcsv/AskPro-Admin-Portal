import React, { useCallback, useEffect, useState } from "react";
import SmartTable from "../Tables/sharedTable/sharedTable";
import "./Messages.css";
import moment from "moment";
import { TwilioService } from "./twilioService";

const headCells = [
  {
    id: "clientName",
    numeric: false,
    label: "Name",
    // width: 50,
  },
  {
    id: "clientOrEstimator",
    numeric: false,
    label: "User Type",
    // width: 50,
  },
  {
    id: "message",
    numeric: false,
    label: "Message",
    // width: 50,
  },
  {
    id: "sid",
    numeric: false,
    label: "Channel Id",
    // width: 30,
  },
  {
    id: "time",
    numeric: true,
    label: "Time",
    // width: 120,
  },
];

const Messages = () => {
  const [messagesList, setMessageList] = useState([]);
  const [token] = useState(localStorage.getItem("twillio_token"));

  useEffect(() => {
    conversationStart();
  }, []);

  const conversationStart = async () => {
    const client = await TwilioService.getInstance().getChatClient(token);
    getSubscribedConversations(client);
  };

  const getSubscribedConversations = useCallback(
    (client) =>
      client.getSubscribedConversations().then(async (paginator) => {
        const data1 = await Promise.all(
          paginator.items.map(async (channel, index) => {
            let conversationData = {
              clientName: channel?.uniqueName
                ? channel?.uniqueName
                    ?.split(localStorage.getItem("username"))[1]
                    ?.split("-")[0]
                    ?.split("&&")
                    .toString()
                    .replace(",", "")
                : "Unique name loaded",
              clientOrEstimator: channel?.uniqueName.includes("-")
                ? channel?.uniqueName.split("-")[1].toString()
                : "Unknown",
              message: channel?.lastMessage?.index
                ? channel?.lastMessage?.index.toString()
                : "Start Conversation",
              time: channel?.lastMessage?.dateCreated
                ? channel?.lastMessage?.dateCreated
                : channel.dateUpdated,
              sid: channel?.sid,
            };
            return await getLastMessage(conversationData, channel);
          })
        );
        sortData(data1);
      }),
    []
  );

  const getLastMessage = async (conversationData, conversation) => {
    const participants = await conversation.getParticipants();
    const findParticipant = participants.find(
      (participant) => participant.identity != localStorage.getItem("username")
    );
    if (findParticipant) {
      conversationData.name = findParticipant.identity;
    }
    let messagesPaginator = await conversation.getMessages(1, undefined, "backwards");
    const messages = messagesPaginator.items;
    const newMessages = TwilioService.getInstance().parseMessages(messages);
    if (newMessages.length) {
      conversationData.message = newMessages[0].text;
    }
    return conversationData;
  };

  const sortData = (data1) => {
    let data = data1;

    data = data.sort((a, b) => {
      return a.time - b.time;
    });

    const finalData = data.map((obj) => ({
      ...obj,
      message: obj.message === null ? "Media" : obj.message,
      time: moment(obj.time).format("HH:mm | DD-MM-YY"),
    }));

    setMessageList(finalData.reverse());
  };

  return (
    <>
      <SmartTable
        title="Messages"
        data={messagesList}
        fiveRows={messagesList}
        headCells={headCells}
        paginator={false}
        navigation={true}
        pageLink={"Chat"}
        search={true}
        smartCssId="message"
        smartCssClass="smartTableCss"
      />
    </>
  );
};

export default Messages;
