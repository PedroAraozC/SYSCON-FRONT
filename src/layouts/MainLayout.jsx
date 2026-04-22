import { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import "../index.css";

const drawerWidth = 240;

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: "Caja", path: "/caja" },
    { text: "Categorias", path: "/categorias" },
    { text: "Dashboard", path: "/" },
    { text: "Productos", path: "/productos" },
    { text: "MetodosDePago", path: "/metodosdepago" },
    { text: "Movimientos", path: "/movimientos" },
  ];

  return (
    <Box sx={{ display: "flex", backgroundColor: "var(--bg)" }}>
      {/* 🔹 AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "var(--surface)",
          color: "var(--on-surface)",
        }}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ fontFamily: "var(--mono)" }}>
            Sistema de Stock
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 🔹 Sidebar */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true, // mejora rendimiento
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "var(--surface)",
            color: "var(--on-surface)",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ marginTop: "15px" }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                sx={{ marginLeft: "2px" }}
                key={item.text}
                onClick={() => navigate(item.path)}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* 🔹 Contenido */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
