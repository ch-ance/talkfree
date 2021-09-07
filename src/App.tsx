import React, { useEffect, useState } from "react";
import Auth from "./auth";
import Login from "./components/Auth/Login";
import state from "./state";
import {
  Container,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import HomeScreen from "./HomeScreen";

const auth = new Auth(state);

const theme = createTheme({
  palette: {
    primary: {
      main: "#36393ff1",
    },
    text: {
      primary: "#ffddee",
    },
  },
});

const useStyles = makeStyles((theme) => {
  return {
    container: {
      maxWidth: "100vw",
      minHeight: "100vh",
      paddingLeft: 0,
      paddingRight: 0,
    },
  };
});
function App() {
  const classes = useStyles();
  useEffect(() => {}, []);

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("user"));
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.container}>
        {isLoggedIn ? (
          <HomeScreen />
        ) : (
          <Login auth={auth} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
