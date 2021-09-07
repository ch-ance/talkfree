import { Button, Input, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import state from "../../state";
import { IChannel, IMessage } from "../../types";

const useStyles = makeStyles((theme) => {
  return {
    form: {},
    textInput: {
      borderRadius: "15px",
    },
  };
});

const ChatForm = () => {
  const [formText, setFormText] = useState("");
  const [currentChannel, setCurrentChannel] = useState<IChannel>();
  const classes = useStyles();

  const sendMessage = () => {
    if (!currentChannel || !currentChannel.id) {
      console.log("uh oh");
      return;
    }
    const message: IMessage = {
      id: uuidv4(),
      from: state.local.user().pair().pub,
      text: formText,
      timestamp: Date.now(),
      to: currentChannel.id,
    };
    state.public
      .get("channels")
      .get(currentChannel.name)
      .get("messages")
      .set(message);
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
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        Send
      </Button>
    </form>
  );
};

export default ChatForm;
