import {
  Typography,
  TextField,
  Divider,
  makeStyles,
  Container,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import state from "../../state";

const useStyles = makeStyles((theme) => {
  console.log("theme", theme);
  return {
    container: {},
    divider: {
      backgroundColor: theme.palette.secondary.main,
      marginBottom: theme.spacing(3),
    },
    captionText: {
      color: theme.palette.info.main,
      marginBottom: theme.spacing(1),
    },
    textField: {
      backgroundColor: theme.palette.action.focus,
    },
  };
});
const JoinNewChannel = () => {
  const [channelNameText, setChannelNameText] = useState("");
  const classes = useStyles();

  const joinChannel = () => {
    if (!channelNameText) {
      alert("provide a name for your new room!");
      return;
    }
    state.public.get("channels").set({ name: channelNameText });
  };

  return (
    <Container className={classes.container}>
      <Divider className={classes.divider} />

      <Typography className={classes.captionText}>
        Join a new channel
      </Typography>
      <TextField
        className={classes.textField}
        variant="outlined"
        value={channelNameText}
        onChange={(e) => setChannelNameText(e.target.value)}
        placeholder="channel name..."
      />
      <Button variant="contained" onClick={joinChannel}>
        JOIN
      </Button>
    </Container>
  );
};

export default JoinNewChannel;
