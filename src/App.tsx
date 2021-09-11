import React, { useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import { Container, createTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import state from "./state";
import LandingPage from "./components/LandingPage/LandingPage";
import Blog from "./components/Blog/Blog";

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
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <Container className={classes.container}>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="/app">
              {isLoggedIn ? (
                <HomeScreen isLoggedIn={isLoggedIn} />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )}
            </Route>
          </Container>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
