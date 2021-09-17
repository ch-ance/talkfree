import { Button, Input, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Messenger from "../../services/Messenger";
import state from "../../state";
import { IChannel, IMessage } from "../../types";

const useStyles = makeStyles((theme) => {
  return {
    form: {
      height: "125px",
    },
    textInput: {
      borderRadius: "15px",
    },
  };
});

interface ChatFormProps {
  disabled: boolean;
}

const ChatForm = (props: ChatFormProps) => {
  const [formText, setFormText] = useState("");
  const [currentChannel, setCurrentChannel] = useState<IChannel>();
  const isChatDisabled = !currentChannel || !currentChannel.name;
  const classes = useStyles();

  const sendMessage = async () => {
    if (!currentChannel || !currentChannel.name) return;
    console.log("sending message. current channel", currentChannel);
    await Messenger.send(formText, currentChannel);
    setFormText("");
  };

  useEffect(() => {
    state.local.get("currentChannel").on((channel) => {
      if (!channel.name) return;
      setCurrentChannel(channel);
      console.log("channel", channel);
    });
  }, []);

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <TextField
        className={classes.textInput}
        fullWidth
        variant="filled"
        autoFocus
        value={formText}
        onChange={(e) => setFormText(e.target.value)}
        disabled={isChatDisabled || props.disabled}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        disabled={isChatDisabled || props.disabled}
      >
        Send
      </Button>
    </form>
  );
};

export default ChatForm;
