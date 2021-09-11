import { Container, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {},
}));

const LandingPage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography className={classes.title} variant="h1">
        talk free
      </Typography>
      <List>
        <ListItem>
          <Link to="/app">
            <Typography variant="h4">app</Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/blog">
            <Typography variant="h4">blog</Typography>
          </Link>
        </ListItem>
      </List>
    </Container>
  );
};

export default LandingPage;
