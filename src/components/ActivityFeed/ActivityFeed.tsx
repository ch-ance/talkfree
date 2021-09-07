import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  console.log("theme", theme);
  return {
    container: {
      paddingTop: "60px",
      backgroundColor: theme.palette.primary.dark,
      minHeight: "100vh",
    },
  };
});

const ActivityFeed = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography>Activity Feed</Typography>
    </Container>
  );
};

export default ActivityFeed;
