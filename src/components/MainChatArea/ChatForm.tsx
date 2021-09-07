import { Button, Input, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import state from "../../state";
import { IChannel } from "../../types";

const useStyles = makeStyles((theme) => {
  return {
    form: {
      // backgroundColor: theme.palette.getContrastText(
      //   theme.palette.primary.main
      // ),
    },
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
    if (!currentChannel) {
      console.log("uh oh");
      return;
    }
    state.public
      .get("chatty1")
      .get("channels")
      .get(currentChannel.name)
      .get("messages")
      .set({ text: formText });
    setFormText("");
  };

  useEffect(() => {
    state.local.get("currentChannel").on((channel) => {
      setCurrentChannel(channel);
      console.log("channel line ~37", channel);
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
      <Button>Send</Button>
    </form>
  );
};

export default ChatForm;
