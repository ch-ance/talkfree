import { AppBar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import state from "../../state";
import { IChannel } from "../../types";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      backgroundColor: theme.palette.primary.main,
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  };
});

const Header = () => {
  const [currentChannel, setCurrentChannel] = useState<IChannel>();
  const classes = useStyles();

  useEffect(() => {
    state.local.get("currentChannel").on((channel) => {
      if (!channel.name) return;
      console.log("currently in channel", channel);
      setCurrentChannel(channel);
    });

    // return state.local.get("currentChannel").off();
  }, []);

  return (
    <AppBar className={classes.container}>
      <Typography>{currentChannel?.name}</Typography>
    </AppBar>
  );
};

export default Header;
