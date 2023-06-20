import { Client } from "@twilio/conversations";
import { toast } from "react-toastify";

export class TwilioService {
  static serviceInstance;
  static chatClient;
  // static appToken;

  constructor() {}

  static getInstance() {
    if (!TwilioService.serviceInstance) {
      TwilioService.serviceInstance = new TwilioService();
    }
    return TwilioService.serviceInstance;
  }

  // async setAppToken(aToken) {
  //   if (!TwilioService.appToken) {
  //     TwilioService.appToken = aToken;
  //   }
  //   return TwilioService.appToken;
  // }

  async getChatClient(twilioToken) {
    if (!TwilioService.chatClient && !twilioToken) {
      toast.error("token null called");
      throw new Error("Twilio token is null or undefined");
    }
    if (!TwilioService.chatClient && twilioToken) {
      const client = new Client(twilioToken);
      let newPromise = new Promise((resolve, reject) => {
        client.on("stateChanged", (state) => {
          if (state === "initialized") {
            TwilioService.chatClient = client;
            return resolve(TwilioService.chatClient);
          }
        });
      });

      return newPromise;
    }
    return Promise.resolve().then(() => TwilioService.chatClient);
  }

  addTokenListener(getToken) {
    if (!TwilioService.chatClient) {
      throw new Error("Twilio client is null or undefined");
    }
    TwilioService.chatClient.on("tokenAboutToExpire", () => {
      getToken().then(TwilioService.chatClient.updateToken);
    });

    TwilioService.chatClient.on("tokenExpired", () => {
      getToken().then(TwilioService.chatClient.updateToken);
    });
    return TwilioService.chatClient;
  }
  parseMessages(messages) {
    return messages.map(this.parseMessage).reverse();
  }

  parseMessage(message) {
    return {
      _id: message.sid,
      text: message.body,
      createdAt: message.dateCreated,
      user: {
        _id: message.author,
        name: message.author,
      },
      received: true,
    };
  }
}
