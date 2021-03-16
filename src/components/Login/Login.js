import React, { useContext, useState } from "react";

import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./LoginManager";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Icon } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Search } from "@trejgun/material-ui-icons-google";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
    error: "",
    success: false,
  });
  initializeLoginFramework();

  //Context Api
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  //For Private Route redirect

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [newPassword, setNewPassword] = useState({
    isPasswordMatch: false,
    myPassword: "",
  });

  //Response  from SignIn Method
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  //Google Sign In
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  //Facebook Sign In
  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  //Signout
  const handleSignOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  //Regular Sign In Method

  const handleSubmit = (e) => {
    console.log("handle Submit Click");
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      console.log(user.email, user.password);
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  //Check Registration Form
  const handleBlur = (event) => {
    let isFieldValid = true;

    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;

      newPassword.myPassword = event.target.value;
      setNewPassword(newPassword);
    }
    if (event.target.name === "confirm-password") {
      let isMatch = false;

      if (
        event.target.value === newPassword.myPassword &&
        event.target.value !== ""
      ) {
        isMatch = true;
      }
      if (!isMatch) {
        alert("Password not matching!");
      }
      isFieldValid = isMatch;
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
    console.log(isFieldValid, newPassword);
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              value="newUser"
              onChange={() => setNewUser(!newUser)}
              name="newUser"
              color="primary"
              id="switchForm"
            />
          }
          label="New user Sign up"
        />

        <form className={classes.form} onSubmit={handleSubmit}>
          {newUser && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Enter your name"
              name="name"
              onBlur={handleBlur}
            />
          )}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onBlur={handleBlur}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onBlur={handleBlur}
          />

          {newUser && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="confirm-password"
              label="Confirm password"
              name="confirm-password"
              type="password"
              onBlur={handleBlur}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {newUser ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
          startIcon={<Search />}
          onClick={googleSignIn}
          style={{ marginBottom: "20px" }}
        >
          Google Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
          startIcon={<FacebookIcon />}
          onClick={fbSignIn}
          style={{ marginBottom: "20px" }}
        >
          Facebook Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          className={classes.button}
          startIcon={<ExitToAppIcon />}
          onClick={handleSignOut}
          style={{ marginBottom: "20px" }}
        >
          Log out
        </Button>
        <Grid container>
          <Grid item>
            <Typography style={{ color: "red" }} component="p" variant="h5">
              {user.error}
            </Typography>
            {user.success && (
              <Typography style={{ color: "green" }} component="p" variant="h5">
                User {newUser ? "Created" : "Loged In"} Successfullly!!!
              </Typography>
            )}
          </Grid>
          <Grid item>
            <Typography style={{ color: "red" }} component="p" variant="h5">
              {user.error}
            </Typography>
            {user.isSignedIn && (
              <>
                <Typography
                  style={{ color: "green" }}
                  component="p"
                  variant="h5"
                >
                  Welcome, {user.name}
                </Typography>
                <Typography
                  style={{ color: "green" }}
                  component="p"
                  variant="h5"
                >
                  Email : {user.email}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        {/* {user.isSignedIn && (
          <div>
            <p>Welcome, {user.name} </p>
            <p>Email : {user.email}</p>
            <img src={user.photo} alt="" />
          </div>
        )} */}
        {/* <h1>Our own Authentication</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p> */}
      </Box>
    </Container>
  );
};

export default Login;
