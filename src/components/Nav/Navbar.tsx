import { useEffect, useState } from "react";
import "./Navbar.css";
import LogoTSF from "../../assets/image/LogoTSF.png";
import perfil from "../../assets/image/perfil.png";
import iconcores1 from "../../assets/image/qdr2.png";
import iconcores2 from "../../assets/image/qdr3.png";
import iconcores3 from "../../assets/image/qdr4.png";
import iconcores4 from "../../assets/image/qdr5.png";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
  Avatar,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { motion } from "framer-motion";
import {
  Notifications,
  ExitToApp,
  Help,
  Dashboard,
  PeopleSharp,
  BookmarkAdded,
  Create,
  HelpCenter,
  Shortcut,
  Logout,
  AccountBox,
  SettingsApplications,
  NotificationImportant,
  ViewDay,
} from "@mui/icons-material";
import { colors } from "../../assets/colors";
import ApiProvider from "../../utils/provider/providerUtils";
import { useNavigate } from "react-router";
import { storageUtils } from "../../utils/localstorage/storageUtils";
import NotificationBox from "../Notification/notification";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpenUser, setMenuOpenUser] = useState(false);
  const [notif, setNotif] = useState(false);
  const [boards, setBoards] = useState<any>([{}]);
  const [options] = useState<any>([
    { name: "MainBoard", icon: <BookmarkAdded />, route: "/system" },
    { name: "Boards", icon: <Dashboard />, route: "/system/boards" },
    { name: "Members", icon: <PeopleSharp />, route: "/system/members" },
  ]);

  const [optionsUser] = useState<any>([
    { name: "Account", icon: <AccountBox />, route: "/system/me" },
    {
      name: "Activity",
      icon: <NotificationImportant />,
      route: "/system/me/activity",
    },
    { name: "Cards", icon: <ViewDay />, route: "/system/me/cards" },
    {
      name: "Settings",
      icon: <SettingsApplications />,
      route: "/system/me/settings",
    },
  ]);

  useEffect(() => {
    const fetchBoards = async () => {
      const quadros = [
        {
          name: "Ubmaps",
          icon: iconcores1,
          favorite: true,
          route: "/system/board/1",
        },
        {
          name: "Trabalho de Física",
          icon: iconcores1,
          favorite: false,
          route: "/system/board/2",
        },
        {
          name: "Trabalho de Cálculo",
          icon: iconcores2,
          favorite: false,
          route: "/system/board/3",
        },
        {
          name: "Provas 3° Semestre",
          icon: iconcores3,
          favorite: false,
          route: "/system/board/4",
        },
        {
          name: "Cursos de Programação",
          icon: iconcores4,
          favorite: false,
          route: "/system/board/5",
        },
      ];

      try {
        const mainWorkspace = storageUtils.getItem("mainWorkspace") as string;
        const responseBoards = (await new ApiProvider("/get-boards").getOne(
          mainWorkspace
        )) as any;

        if (responseBoards.status == 200) return setBoards(responseBoards);
        if (responseBoards.status !== 200) return setBoards(quadros);
      } catch (error) {
        setBoards(quadros);
      }
    };

    fetchBoards();
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleMenuUser = () => {
    setMenuOpenUser((prev) => !prev);
  };

  const toggleNotif = () => {
    setNotif((prev) => !prev);
  };

  return (
    <AppBar
      position="fixed"
      className="navbar"
      sx={{
        width: "100vw",
      }}
    >
      <Toolbar sx={{ width: "100vw", gap: 3 }}>
        <IconButton onClick={toggleMenu} color="inherit">
          <motion.div animate={{ rotate: menuOpen ? 180 : 0 }}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </motion.div>
        </IconButton>
        <img
          src={LogoTSF}
          alt="logo"
          id="img-logo"
          style={{ height: "30px", objectFit: "contain" }}
        />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TaskFlow
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IconButton color="inherit" onClick={() => toggleNotif()}>
            <Notifications />
          </IconButton>
          {notif && <NotificationBox onClick={toggleNotif} />}
        </Box>
        <IconButton
          color="inherit"
          onClick={() => console.log("Ajuda solicitada")}
        >
          <Help />
        </IconButton>
        <IconButton color="inherit" onClick={toggleMenuUser}>
          <Avatar alt="foto-perfil" src={perfil} />
        </IconButton>
      </Toolbar>

      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: menuOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          style={{
            width: 300,
            background: "rgb(24, 24, 24)",
            height: "100vh",
            overflowY: "auto",
            color: colors.white,
            gap: 3,
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Áreas de Trabalho</Typography>
            <IconButton onClick={toggleMenu}>
              <CloseIcon sx={{ color: colors.white }} />
            </IconButton>
          </Box>
          <Divider sx={{ margin: 2 }} />
          <List>
            {options.map((options: any, index: any) => (
              <ListItem
                component="li"
                key={index}
                sx={{
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.7)", // Efeito de brilho
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Leve mudança de fundo
                  },
                }}
                onClick={() => {
                  navigate(options.route);
                }}
              >
                <ListItemText primary={options.name} />
                {options.icon}
              </ListItem>
            ))}
          </List>
          <Divider sx={{ margin: 2 }} />
          <List>
            {boards.map((quadro: any, index: any) => (
              <ListItem
                component="li"
                key={index}
                sx={{
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.7)", // Efeito de brilho
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Leve mudança de fundo
                  },
                }}
                onClick={() => {
                  navigate(quadro.route);
                }}
              >
                <ListItemText primary={quadro.name} />
                {quadro.favorite ? (
                  <StarIcon color="warning" />
                ) : (
                  <StarBorderIcon />
                )}
              </ListItem>
            ))}
          </List>
        </motion.div>
      </Drawer>

      <Drawer anchor="right" open={menuOpenUser} onClose={toggleMenuUser}>
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: menuOpenUser ? 0 : 300 }}
          transition={{ duration: 0.3 }}
          style={{
            width: 300,
            background: "rgb(24, 24, 24)",
            height: "100vh",
            overflowY: "auto",
            color: colors.white,
            gap: 3,
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Conta</Typography>
            <IconButton onClick={toggleMenuUser}>
              <CloseIcon sx={{ color: colors.white }} />
            </IconButton>
          </Box>
          <Divider sx={{ margin: 2 }} />
          <List>
            {optionsUser.map((options: any, index: any) => (
              <ListItem
                component="li"
                key={index}
                sx={{
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.7)", // Efeito de brilho
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Leve mudança de fundo
                  },
                }}
                onClick={() => {
                  navigate(options.route);
                }}
              >
                <ListItemText primary={options.name} />
                {options.icon}
              </ListItem>
            ))}
          </List>
          <Divider sx={{ margin: 2 }} />
          <List>
            <ListItem
              component="li"
              sx={{
                cursor: "pointer",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.7)", // Efeito de brilho
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Leve mudança de fundo
                },
              }}
              onClick={() => {
                navigate("/system/me/create");
              }}
            >
              <ListItemText primary={"Create a Workspace"} />
              <Create />
            </ListItem>
          </List>
          <Divider sx={{ margin: 2 }} />
          <List>
            <ListItem
              component="li"
              sx={{
                cursor: "pointer",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.7)", // Efeito de brilho
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Leve mudança de fundo
                },
              }}
              onClick={() => {
                navigate("/system/me/help");
              }}
            >
              <ListItemText primary={"Help Me"} />
              <HelpCenter />
            </ListItem>
            <ListItem
              component="li"
              sx={{
                cursor: "pointer",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.7)", // Efeito de brilho
                  backgroundColor: "rgba(255, 255, 255, 0.1)", // Leve mudança de fundo
                },
              }}
              onClick={() => {
                navigate("/system/me/shortcut");
              }}
            >
              <ListItemText primary={"Shortcut"} />
              <Shortcut />
            </ListItem>
          </List>
          <Divider sx={{ margin: 2 }} />
          <List>
            <ListItem
              component="li"
              sx={{
                cursor: "pointer",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.7)", // Efeito de brilho
                  backgroundColor: "rgba(255, 103, 103, 0.49)", // Leve mudança de fundo
                },
              }}
              onClick={() => {
                console.log("logout");
              }}
            >
              <ListItemText primary={"Logout"} />
              <Logout />
            </ListItem>
          </List>
        </motion.div>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
