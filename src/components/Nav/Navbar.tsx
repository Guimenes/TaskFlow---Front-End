import React, { useState } from "react";
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
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Avatar,
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
  Contrast,
  Dashboard,
  PeopleSharp,
} from "@mui/icons-material";
import { colors } from "../../assets/colors";

const quadros = [
  { name: "Ubmaps", icon: iconcores1, favorite: true },
  { name: "Trabalho de Física", icon: iconcores1, favorite: false },
  { name: "Trabalho de Cálculo", icon: iconcores2, favorite: false },
  { name: "Provas 3° Semestre", icon: iconcores3, favorite: false },
  { name: "Cursos de Programação", icon: iconcores4, favorite: false },
];

const OptionsMenu = [
  { name: "Boards", icon: <Dashboard /> },
  { name: "Members", icon: <PeopleSharp /> },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar sx={{ width: "100%", gap: 3 }}>
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

        <IconButton
          color="inherit"
          onClick={() => console.log("Notificação clicada")}
        >
          <Notifications />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => console.log("Contraste ativado")}
        >
          <Contrast />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => console.log("Ajuda solicitada")}
        >
          <Help />
        </IconButton>
        <IconButton color="inherit" onClick={() => console.log("Saindo...")}>
          <ExitToApp />
        </IconButton>

        <Avatar alt="foto-perfil" src={perfil} />
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
            {OptionsMenu.map((options, index) => (
              <ListItem
                button
                key={index}
                sx={{
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.7)", // Efeito de brilho
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Leve mudança de fundo
                  },
                }}
              >
                <ListItemText primary={options.name} />
                {options.icon}
              </ListItem>
            ))}
          </List>
          <Divider sx={{ margin: 2 }} />
          <List>
            {quadros.map((quadro, index) => (
              <ListItem
                button
                key={index}
                sx={{
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.7)", // Efeito de brilho
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Leve mudança de fundo
                  },
                }}
              >
                <ListItemIcon>
                  <img
                    src={quadro.icon}
                    alt={quadro.name}
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
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
    </AppBar>
  );
};

export default Navbar;
