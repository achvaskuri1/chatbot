import React, { Component } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";

import { dialogflowConfig } from "./env";
const botProfile = require("./assets/botProfile.jpg");

const BOT_USER = {
  _id: 2,
  name: "FAQ Bot",
  avatar: botProfile,
};

class ChatScreen extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: `  שלום!
    `,
        createdAt: new Date(),
        user: BOT_USER,
      },
    ],
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    let message = messages[0].text;
    message === "תודה"
      ? this.setState({ messages: [] })
      : Dialogflow_V2.requestQuery(
          message,
          (result) => this.handleGoogleResponse(result),
          (error) => console.log(error)
        );
  }
  onQuickReply(quickReply) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, quickReply),
    }));
    let message = quickReply[0].value;
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    );
  }

  sendBotResponse(text) {
    let msg;
    if (text.startsWith("אינטרנט")) {
      text = text.substring("אינטרנט".length).trim();
      text +=
        ", בגלל שהמודעה התפרסמה באינטרנט באפשררותך ללכת לבית משפט בכל מחוז שתבחר להלן קישור לאתר בו תוכל למצוא פרטים אודות המחוזות ומיקומי בתי המשפט: https://www.nevo.co.il/Nafa.aspx?id=3162";
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
      };
    } else if (text.startsWith("מקומי")) {
      text = text.substring("מקומי".length).trim();
      text +=
        ", בגלל שהמודעה התפרסמה באופן מקומי עליך ללכת לבית המשפט המתאים במחוז בו התפרסמה המודעה, להלן קישור לאתר בו תוכל למצוא פרטים אודות המחוזות ומיקומי בתי המשפט: https://www.nevo.co.il/Nafa.aspx?id=3162 ";
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
      };
    } else if (text.startsWith("יאללה")) {
      text = text.substring("יאללה".length).trim();
      text +=
        ", באפשררותך ללכת לבית משפט בכל מחוז שתבחר , להלן קישור לאתר בו תוכל למצוא פרטים אודות המחוזות ומיקומי בתי המשפט: https://www.nevo.co.il/Nafa.aspx?id=3162 ";
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
      };
    } else if (text.startsWith("ספאם ייצוגית")) {
      const parts = text.split(":");

      const num1 = parseInt(parts[1]);
      const num2 = parseInt(parts[2]);
      const amount = num1 * num2 * 12000;
      const txt =
        amount < 30000 ? "תביעות קטנות" : amount < 2500000 ? "שלום" : "מחוזי";

      finalText = ` לפי הנתונים ההמלצה שלי היא ללכת לבית משפט ${txt} ולהגיש תביעה על סך ${amount.toString()} שקלים`;
      finalText +=
        ", עליך ללכת לבית המשפט המתאים במחוז בו יושב מפיץ הספאם או משרדי החברה המפיצה, להלן קישור לאתר בו תוכל למצוא פרטים אודות המחוזות ומיקומי בתי המשפט: https://www.nevo.co.il/Nafa.aspx?id=3162 ";

      msg = {
        _id: this.state.messages.length + 1,
        text: finalText,
        createdAt: new Date(),
        user: BOT_USER,
      };
    } else if (text.startsWith("ספאם פרטית")) {
      text = text.substring("ספאם פרטית".length).trim();
      text += ` שקלים, עליך ללכת לבית המשפט המתאים במחוז בו יושב מפיץ הספאם או משרדי החברה המפיצה, להלן קישור לאתר בו תוכל למצוא פרטים אודות המחוזות ומיקומי בתי המשפט: https://www.nevo.co.il/Nafa.aspx?id=3162 `;

      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
      };
    } else if (text.startsWith("לשון הרע באיזה סכום תרצה לתבוע")) {
      text = text.substring("לשון הרע ".length).trim();
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              _id: this.state.messages.length + 1.1,
              title: "30,000",
              value: "30,000",
              user: BOT_USER,
            },
            {
              _id: this.state.messages.length + 1.2,
              title: "3,000,000",
              value: "3,000,000",
              user: BOT_USER,
            },
            {
              _id: this.state.messages.length + 1.3,
              title: "100,000",
              value: "100,000",
              user: BOT_USER,
            },
          ],
        },
      };
    } else if (text.startsWith("כמה הודעות נשלחו לאחר")) {
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              _id: this.state.messages.length + 1.1,
              title: "פחות מ30",
              value: "פחות מ30",
              user: BOT_USER,
            },
            {
              _id: this.state.messages.length + 1.2,
              title: "בין 30 ל2,500",
              value: "בין 30 ל2,500",
              user: BOT_USER,
            },
            {
              _id: this.state.messages.length + 1.3,
              title: "מעל 2,500",
              value: "מעל 2,500",
              user: BOT_USER,
            },
          ],
        },
      };
    } else if (text.startsWith("באיזו דרך התקבלו ההודעות")) {
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              _id: this.state.messages.length + 1.1,
              title: "דואר",
              value: "דואר",
              user: BOT_USER,
            },
            {
              _id: this.state.messages.length + 1.2,
              title: "דואר אלקטרוני",
              value: "דואר אלקטרוני",
              user: BOT_USER,
            },
            {
              _id: this.state.messages.length + 1.3,
              title: "SMS",
              value: "SMS",
              user: BOT_USER,
            },
          ],
        },
      };
    } else if (text.startsWith("איזה חומרים")) {
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              _id: this.state.messages.length + 1.1,
              title: "מאמר",
              value: "מאמר",
              user: BOT_USER,
            },
            {
              _id: this.state.messages.length + 1.2,
              title: "תסריט",
              value: "תסריט",
              user: BOT_USER,
            },
            {
              _id: this.state.messages.length + 1.3,
              title: "תמונה",
              value: "תמונה",
              user: BOT_USER,
            },
          ],
        },
      };
    } else if (text.startsWith("קניין קטן")) {
      text = text.substring("קניין קטן ".length).trim();
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              _id: this.state.messages.length + 1.1,
              title: "30,000",
              value: "30,000",
              user: BOT_USER,
            },
            {
              _id: this.state.messages.length + 1.2,
              title: "100,000",
              value: "100,000",
              user: BOT_USER,
            },
            {
              _id: this.state.messages.length + 1.3,
              title: "250,000",
              value: "250,000",
              user: BOT_USER,
            },
          ],
        },
      };
    } else if (text.startsWith("קניין גדול")) {
      text = text.substring("קניין גדול ".length).trim();
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              _id: this.state.messages.length + 1.1,
              title: "200,000",
              value: "200,000",
              user: BOT_USER,
            },
            {
              _id: this.state.messages.length + 1.2,
              title: "4,000,000",
              value: "4,000,000",
              user: BOT_USER,
            },
          ],
        },
      };
    } else if (text.startsWith("מקום פרסום החומרים")) {
      text = text.substring("מקום פרסום החומרים ".length).trim();
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              _id: this.state.messages.length + 1.1,
              title: "רשת חברתית",
              value: "רשת חברתית",
              user: BOT_USER,
            },
            {
              _id: this.state.messages.length + 1.2,
              title: "עיתון",
              value: "עיתון",
              user: BOT_USER,
            },
          ],
        },
      };
    } else {
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
      };
    }
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }
  renderBubble = (props) => (
    <Bubble
      {...props}
      textStyle={{
        left: { fontSize: 19 },
        right: { fontSize: 19 },
      }}
      wrapperStyle={{
        left: { backgroundColor: "#F2E1B9" },
        right: { backgroundColor: "#A0A0A0" },
      }}
    />
  );
  render() {
    return (
      <View style={{ paddingTop: 40, flex: 1, backgroundColor: "#fff" }}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{ opacity: 0.2 }}
          source={require("./assets/background1.png")}
          style={{ flex: 1 }}
        >
          <GiftedChat
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
            user={{
              _id: 1,
            }}
            renderBubble={this.renderBubble}
          />
        </ImageBackground>
      </View>
    );
  }
}

export default ChatScreen;
