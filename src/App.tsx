import React, { useEffect, useState } from "react";
import Auth from "./auth";
import Login from "./components/Auth/Login";
import state from "./state";
import { Container, createTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("user"))
  );
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.container}>
        {isLoggedIn ? (
          <HomeScreen auth={auth} />
        ) : (
          <Login auth={auth} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
