import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import state from "../../state";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    // TODO
    // change these max width values to something that makes sense.
    // for now I just want it to appear full width
    maxWidth: 4820,
    height: "100vh",
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface LoginProps {
  setIsLoggedIn: (flag: boolean) => void;
}

const Login = ({ setIsLoggedIn }: LoginProps) => {
  const [aliasText, setAliasText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const classes = useStyles();

  const createNew = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      state.local.user().create(aliasText, passwordText, (ack) => {
        // @ts-ignore
        if (ack.err) {
          // @ts-ignore
          alert(ack.err);
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  };

  const signIn = async () => {
    state.local
      .user()
      .recall({ sessionStorage: true })
      .auth(aliasText, passwordText, (ack) => {
        console.log(ack);
        // @ts-ignore
        if (ack.err) {
          // @ts-ignore
          alert(ack.err);
          return;
        }
        setIsLoggedIn(true);
      });
  };

  return (
    <Container className={classes.container} component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="alias"
            label="Alias"
            name="alias"
            autoFocus
            value={aliasText}
            onChange={(e) => setAliasText(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={passwordText}
            onChange={(e) => setPasswordText(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign In
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async (e) => {
              e.preventDefault();
              const newUser = await createNew();
              if (newUser) {
                signIn();
              }
            }}
          >
            Create New Account
          </Button>
          <Grid container></Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
