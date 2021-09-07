import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ActivityFeed from "./components/ActivityFeed/ActivityFeed";
import ChannelsAndDMs from "./components/ChannelsAndDMs/ChannelsAndDMs";
import MainChatArea from "./components/MainChatArea/MainChatArea";
import Header from "./components/Header/Header";
import Auth from "./auth";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      maxWidth: "100vw",
      minHeight: "100vh",

      paddingLeft: 0,
      color: theme.palette.text.primary,
    },
    centerContent: {
      maxWidth: "100vw",
      height: "100%",
      minHeight: "100vh",

      paddingLeft: 0,
      paddingRight: 0,
    },
  };
});

interface HomeScreenProps {
  auth: Auth;
}

const HomeScreen = ({ auth }: HomeScreenProps) => {
  const classes = useStyles();

  return (
    <Grid xl={12} container className={classes.container}>
      <Header auth={auth} />
      <Grid sm={2} lg={2} item>
        <ChannelsAndDMs />
      </Grid>
      <Grid sm={8} lg={8} item className={classes.centerContent}>
        <MainChatArea />
      </Grid>
      <Grid sm={2} lg={2} item>
        <ActivityFeed />
      </Grid>
    </Grid>
  );
};
export default HomeScreen;
