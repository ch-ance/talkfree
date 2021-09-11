import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ActivityFeed from "./components/ActivityFeed/ActivityFeed";
import ChannelsAndDMs from "./components/ChannelsAndDMs/ChannelsAndDMs";
import MainChatArea from "./components/MainChatArea/MainChatArea";
import Header from "./components/Header/Header";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      maxWidth: "100vw",
      minHeight: "100%",
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
  isLoggedIn: boolean;
}

const HomeScreen = ({ isLoggedIn }: HomeScreenProps) => {
  const classes = useStyles();

  return (
    <Grid xl={12} container className={classes.container}>
      <Header isLoggedIn={isLoggedIn} />
      <Grid sm={2} lg={2} item>
        <ChannelsAndDMs isLoggedIn={isLoggedIn} />
      </Grid>
      <Grid sm={8} lg={8} item className={classes.centerContent}>
        <MainChatArea isLoggedIn={isLoggedIn} />
      </Grid>
      <Grid sm={2} lg={2} item>
        <ActivityFeed />
      </Grid>
    </Grid>
  );
};
export default HomeScreen;
