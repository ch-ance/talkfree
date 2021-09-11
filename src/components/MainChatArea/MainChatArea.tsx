import {
  Card,
  Container,
  Dialog,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReducerState, useEffect, useMemo, useReducer, useState } from "react";
import Messenger from "../../services/Messenger";
import state from "../../state";
import { IChannel, IMessage } from "../../types";
import ChatForm from "./ChatForm";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      backgroundColor: theme.palette.primary.main,
      height: "100%",
      maxWidth: "100vw",
      minHeight: "100vh",
      paddingTop: "25px",
      paddingBottom: "0px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    list: {
      paddingTop: "48px",
      // 100vh - form height - container padding - list padding
      height: "calc(100vh - 125px - 25px - 48px)",
      overflow: "auto",
      display: "flex",
      flexDirection: "column-reverse",
    },
    mine: {
      justifyContent: "flex-end",
      padding: "0rem",
      marginLeft: "0rem",
    },
    else: {
      justifyContent: "flex-start",
      padding: "0rem",
      marginLeft: "0rem",
    },
    messageCard: {
      // (height of list) / # of messages to display
      height: "calc((100vh - 125px - 25px - 48px) / 10)",
      wordBreak: "break-all",
      backgroundColor: theme.palette.secondary.main,
    },
  };
});

const initialState = {
  messages: [],
};

type ReducerType = "add" | "reset";

type stateType = {
  messages: IMessage[];
};

type actionType = {
  type: ReducerType;
  payload?: IMessage;
};
const reducer = (state: stateType, action: actionType) => {
  switch (action.type) {
    case "add":
      const msg = action.payload!;

      return {
        messages: [...state.messages, msg],
      };
    case "reset":
      return {
        messages: [],
      };
  }
};

interface MainChatAreaProps {
  isLoggedIn: boolean;
}

const MainChatArea = ({ isLoggedIn }: MainChatAreaProps) => {
  const [messagesState, dispatch] = useReducer(reducer, initialState);
  const [shouldDisplayLoading, setShouldDisplayLoading] = useState(true);
  const onCurrentChannelChange = async (channel: IChannel) => {
    if (!channel || !channel.name) return;
    dispatch({ type: "reset" });

    if (!channel || !channel.name) return;
    try {
      const res = await Messenger.getAllMessages(channel, (msg) => {
        // console.log("msg from callback", msg);

        dispatch({ type: "add", payload: msg });
      });
      console.log("Messenger.getAllMessages response", res);
      setShouldDisplayLoading(false);
    } catch (err) {
      console.error(err);
    } finally {
      console.log("done loading for real");
    }

    console.log("at least we got here?");

    // Messenger.subscribeToEachParticipant(channel, (msg) => {
    // dispatch({ type: "add", payload: msg });
    // });
  };

  useEffect(() => {
    console.log("component mounted");
    state.local.get("currentChannel").on(async (channel) => {
      await onCurrentChannelChange(channel);
    });
  }, []);

  // cleanup
  // return state.public.get("channels").off();
  const classes = useStyles();

  const Message = ({ id, from, text, timestamp, to }: IMessage) => {
    const date = new Date(timestamp);
    const mine = from === state.local.user().pair().pub;
    return (
      <ListItem className={mine ? classes.mine : classes.else}>
        <Typography>
          {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
        </Typography>
        <Card className={classes.messageCard}>
          <Typography variant="body1">{text}</Typography>
        </Card>
      </ListItem>
    );
  };

  return (
    <Container className={classes.container}>
      <div className={classes.list}>
        {shouldDisplayLoading ? (
          <h1>Loading</h1>
        ) : (
          [...new Set<IMessage>(messagesState.messages)]
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((msg) => {
              return <Message key={msg.id} {...msg} />;
            })
        )}
      </div>
      <ChatForm disabled={shouldDisplayLoading} />
    </Container>
  );
};

export default MainChatArea;
