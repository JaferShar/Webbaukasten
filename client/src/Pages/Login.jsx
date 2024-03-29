import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "../assets/bookShelf.jpg";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { useEffect } from "react";
import Kursify from "../assets/Kursify.jpg";
/**
 * This component provides a registration form, allowing users to sign up for an account.
 * It also includes Google OAuth login functionality.
 * Upon successful registration, the user is redirected to the course overview page.
 *
 * @returns a registration form with Google OAuth login button,
 */

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { account, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // if one of these changes (out of the dependency array), run the function
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || account) {
      navigate("/kursuebersicht");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch, account]);

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://youtu.be/dQw4w9WgXcQ">
          Kursify
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const theme = createTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img style={{ width: "30vw" }} src={Kursify} alt="Kursify" />
            <Box sx={{ mb: 10 }} />
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon data-testid="lockOutIcon" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <h1>Kursify</h1>
            <GoogleOAuthProvider clientId="852695826269-326bgl5c4t0sojrcoqq3kqtentjo7hqp.apps.googleusercontent.com">
              <GoogleLogin
                data-testid="googleLogin"
                onSuccess={(credentialResponse) => {
                  const { email, given_name, family_name, picture } = jwtDecode(
                    credentialResponse.credential
                  );
                  const accountData = {
                    email,
                    firstName: given_name,
                    lastName: family_name,
                    picture: picture,
                  };
                  dispatch(register(accountData));
                }}
              />
            </GoogleOAuthProvider>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Register;
