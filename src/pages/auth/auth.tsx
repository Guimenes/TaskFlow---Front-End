import { MouseEvent, Key, SetStateAction, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Container as Div,
  Popover,
} from "@mui/material";
import { styled } from "@mui/system";
import Root from "../../components/Root/root";
{
  /* import { Login, SignUp, verificarEmail } from "../utils/auth/auth"; */
}
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

//colors
import { colors } from "../../assets/colors";

//imgs e icons
import imagem from "../../assets/image/3227472.jpg";
import { Google, Apple, Microsoft } from "@mui/icons-material";
import { Check, Error } from "@mui/icons-material";

const FormContainer = styled(Paper)(({ theme }) => ({
  maxWidth: "70vw",
  [theme.breakpoints.down("md")]: {
    width: "70vw",
  },
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  textAlign: "center",
  height: "80vh",
  borderRadius: 20,
}));

const Container = styled(Paper)(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    borderRadius: 20,
    justifyContent: "center",
  },
  padding: "5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  height: "80vh",
  color: colors.pink,
}));

const alertVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
};

const icons = [
  { Component: Google, name: "Google" },
  { Component: Microsoft, name: "Microsoft" },
  { Component: Apple, name: "Apple" },
];

const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [status, setStatus] = useState<any>({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverText, setPopoverText] = useState("");
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (
    event: MouseEvent<HTMLDivElement, MouseEvent>,
    text: SetStateAction<string>
  ) => {
    setAnchorEl(event.currentTarget as SetStateAction<any>);
    setPopoverText(text);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverText("");
  };

  const handleEmailChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPasswordConfirm(event.target.value);
  };

  const handleLoginOrSignUp = async () => {
    {
      /* const isValidEmail = verificarEmail(email) as string; VALIDAR EMAIL */
    }
    let isValidEmail = true; //Força o email valido APAGAR

    if (isValidEmail) {
      setStatus({
        msg: "Error: Email is not valid",
        status: false,
      });
      setTimeout(() => {
        setStatus({});
      }, 3000);
      return;
    }

    if (isSignUp && (!email || !password || !passwordConfirm)) {
      setStatus({
        msg: "Error: Fill all options",
        status: false,
      });
      setTimeout(() => {
        setStatus({});
      }, 3000);
      return;
    }
    if (isSignUp && email && password && passwordConfirm) {
      try {
        {
          /* await SignUp(email, password); CADASTROO */
        }
        setStatus({
          msg: "SignUp successfull",
          status: true,
        });
        setTimeout(() => {
          setStatus({});
        }, 3000);
        navigate("/system");
      } catch (error: any) {
        setStatus({
          msg: `Error: Invalid SignUp`,
          status: false,
        });
        setTimeout(() => {
          setStatus({});
        }, 3000);
      }
      return;
    }
    try {
      if (!email || !password) {
        setStatus({
          msg: "Error: Fill all options",
          status: false,
        });
        setTimeout(() => {
          setStatus({});
        }, 3000);
        return;
      }

      {
        /*   await Login(email, password); LOGINNN */
      }

      setStatus({
        msg: "Login successful",
        status: true,
      });
      setTimeout(() => {
        setStatus({});
      }, 3000);
      navigate("/system");
    } catch (error: any) {
      setStatus({
        msg: `Error: Invalid Login`,
        status: false,
      });
      setTimeout(() => {
        setStatus({});
      }, 3000);
    }
  };

  return (
    <>
      {status.status === true && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={alertVariants}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            marginTop: 20,
          }}
        >
          <Alert icon={<Check fontSize="inherit" />} severity="success">
            {status.msg}.
          </Alert>
        </motion.div>
      )}

      {status.status === false && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={alertVariants}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            marginTop: 20,
          }}
        >
          <Alert icon={<Error fontSize="inherit" />} severity="error">
            {status.msg}.
          </Alert>
        </motion.div>
      )}

      <Root direction="column">
        <FormContainer elevation={3}>
          <Container
            sx={{
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                lg: "block",
                xl: "block",
              },
            }}
          >
            <img
              src={imagem}
              alt="Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Container>

          <Container
            sx={{
              backgroundColor: colors.pink,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: colors.white, fontWeight: "bold" }}
            >
              {isSignUp ? "Create Account" : "Login"}
            </Typography>

            <Box sx={{ width: "100%" }}>
              {!isSignUp && (
                <Div
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    padding: 2,
                    mt: 2,
                    mb: -1
                  }}
                >
                  {icons.map(
                    (
                      { Component, name }: any,
                      index: Key | null | undefined
                    ) => (
                      <Box
                        key={index}
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "#f0f0f0",
                          cursor: "pointer",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.1)",
                            boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                          },
                          "&:hover svg": {
                            filter: "brightness(1.5)",
                          },
                        }}
                        onMouseEnter={(event) => handlePopoverOpen(event, name)}
                      >
                        <Component fontSize="medium" />
                      </Box>
                    )
                  )}

                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    disableRestoreFocus
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Typography sx={{ p: 1 }}>
                      Login or Sign Up with {popoverText}
                    </Typography>
                  </Popover>
                </Div>
              )}
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={email}
                onChange={handleEmailChange}
                sx={{
                  input: {
                    color: colors.white, // Cor padrão do input
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.white, // Cor da label
                  },
                  "&:hover .MuiOutlinedInput-root": {
                    "& input": {
                      color: colors.white, // Cor ao passar o mouse (hover)
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.white,
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={handlePasswordChange}
                sx={{
                  input: {
                    color: colors.white,
                  },
                  "& .MuiInputLabel-root": {
                    color: colors.white,
                  },
                  "&:hover .MuiOutlinedInput-root": {
                    "& input": {
                      color: colors.white,
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.white,
                    },
                  },
                }}
              />

              {isSignUp && (
                <TextField
                  fullWidth
                  label="Password Confirm"
                  type="password"
                  margin="normal"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  sx={{
                    input: {
                      color: colors.white,
                    },
                    "& .MuiInputLabel-root": {
                      color: colors.white,
                    },
                    "&:hover .MuiOutlinedInput-root": {
                      "& input": {
                        color: colors.white,
                      },
                      "& .MuiInputLabel-root": {
                        color: colors.white,
                      },
                    },
                  }}
                />
              )}
            </Box>

            <Button
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: "20px",
                width: "100%",
                background: colors.bg,
              }}
              onClick={() => handleLoginOrSignUp()}
            >
              {isSignUp ? "SignUp" : "Login"}
            </Button>

            <Typography
              variant="body2"
              sx={{ mt: 2, color: colors.white, fontWeight: "bold" }}
            >
              {isSignUp
                ? "Do you have an account? "
                : "Don't you have an account?"}
              <Button
                style={{ color: colors.white, fontWeight: "bold" }}
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Login" : "SignUp"}
              </Button>
            </Typography>
          </Container>
        </FormContainer>
      </Root>
    </>
  );
};

export default Auth;
