import React, { useState } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Tooltip,
  Badge,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Timeline,
  ShowChart,
  TrendingUp,
  Assessment,
  Dashboard,
  Menu as MenuIcon,
  ChevronLeft,
  Notifications,
  Settings,
  Person,
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open, isMobile }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: isMobile ? 0 : drawerWidth,
    ...(isMobile && {
      marginLeft: 0,
    }),
    ...(isMobile &&
      open && {
        marginLeft: drawerWidth,
      }),
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    minHeight: "100vh",
  })
);

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, isMobile }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "linear-gradient(90deg, #1a237e, #3949ab)",
  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.15)",
  ...(open && {
    width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
    marginLeft: isMobile ? 0 : drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  background: "linear-gradient(90deg, #1a237e, #3949ab)",
  color: "white",
  height: 64,
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const HomeScreen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Stock Analysis", icon: <ShowChart />, path: "/stock-analysis" },
    { text: "AI Predictions", icon: <TrendingUp />, path: "/predictions" },
    { text: "Market Trends", icon: <Timeline />, path: "/trends" },
    { text: "Reports", icon: <Assessment />, path: "/reports" },
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar */}
      <AppBarStyled position="fixed" open={open} isMobile={isMobile}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600, letterSpacing: 0.5 }}
          >
            AI Stock Analysis & Prediction
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <Badge badgeContent={4} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton color="inherit" sx={{ mr: 2 }}>
                <Settings />
              </IconButton>
            </Tooltip>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                sx={{
                  bgcolor: "primary.light",
                  boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                  cursor: "pointer",
                }}
              >
                SA
              </Avatar>
            </StyledBadge>
          </Box>
        </Toolbar>
      </AppBarStyled>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
            boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
      >
        <DrawerHeader>
          <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
            <Avatar
              sx={{
                bgcolor: "#fff",
                color: "#1a237e",
                mr: 2,
                width: 40,
                height: 40,
                boxShadow: "0 0 10px rgba(255,255,255,0.2)",
              }}
            >
              S
            </Avatar>
            <Typography variant="h6" noWrap component="div" fontWeight="bold">
              StockAI
            </Typography>
          </Box>
          {isMobile && (
            <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
              <ChevronLeft />
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />

        <Box sx={{ p: 3, background: "#f5f7fa" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ width: 50, height: 50, mr: 2 }}>SA</Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="600">
                Sam Anderson
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Premium Member
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Person />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              mt: 1,
            }}
          >
            View Profile
          </Button>
        </Box>

        <Box sx={{ p: 2, background: "#f5f7fa" }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight="600"
            sx={{ letterSpacing: 0.5, pl: 1 }}
          >
            MAIN NAVIGATION
          </Typography>
        </Box>
        <List sx={{ background: "#fff", px: 1 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  backgroundColor: isActive
                    ? "rgba(26, 35, 126, 0.08)"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(26, 35, 126, 0.12)",
                    transform: "translateY(-2px)",
                    transition: "transform 0.2s",
                    boxShadow: isActive
                      ? "none"
                      : "0 4px 10px rgba(0,0,0,0.05)",
                  },
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s",
                  padding: "10px 16px",
                  ...(isActive && {
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      backgroundColor: "#1a237e",
                      borderRadius: "4px",
                    },
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#1a237e" : "text.secondary",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#1a237e" : "text.primary",
                    fontSize: "0.95rem",
                  }}
                />
                {isActive && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "#1a237e",
                      ml: 1,
                    }}
                  />
                )}
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ mt: "auto", p: 2, background: "#f5f7fa" }}>
          <Typography variant="body2" color="text.secondary" align="center">
            StockAI v1.2.0 © 2023
          </Typography>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Main open={open} isMobile={isMobile}>
        <Toolbar /> {/* This creates space below the AppBar */}
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            background: "#fff",
            maxWidth: 1400,
            mx: "auto",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
};

export default HomeScreen;
