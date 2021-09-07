import React, { useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import { Container, createTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeScreen from "./HomeScreen";
import state from "./state";

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

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  useEffect(() => {
    const user = state.local.user().recall({ sessionStorage: true });
    console.log("user", user);
    // @ts-ignore
    if (user.is) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.container}>
        {isLoggedIn ? (
          <HomeScreen isLoggedIn={isLoggedIn} />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
