import React from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Badge,
  Tooltip,
  Zoom,
  useTheme,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Refresh,
  Notifications,
  LightMode,
} from "@mui/icons-material";

const Header = ({ refreshing, onRefresh }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 3,
        justifyContent: "space-between",
        p: 2,
        borderRadius: 2,
        background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative element */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          left: -20,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.primary.light}20, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Avatar
          sx={{
            background: "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
            mr: 2,
            boxShadow: "0 4px 20px rgba(106, 17, 203, 0.3)",
            width: 48,
            height: 48,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <DashboardIcon />
        </Avatar>
        <Box>
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{
              background: "linear-gradient(45deg, #1a237e 30%, #3949ab 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
          >
            Market Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: -0.5 }}>
            Real-time market insights and analysis
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Tooltip title="Toggle Theme" TransitionComponent={Zoom} arrow>
          <IconButton
            sx={{
              mr: 1.5,
              background: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              transition: "all 0.2s ease",
              "&:hover": {
                background: "rgba(255, 255, 255, 1)",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
            }}
          >
            <LightMode sx={{ color: theme.palette.warning.main }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications" TransitionComponent={Zoom} arrow>
          <IconButton
            sx={{
              mr: 1.5,
              background: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              transition: "all 0.2s ease",
              "&:hover": {
                background: "rgba(255, 255, 255, 1)",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Badge
              badgeContent={4}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: 10,
                  height: 18,
                  minWidth: 18,
                },
              }}
            >
              <Notifications />
            </Badge>
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24 }} />

        <Tooltip title="Refresh Data" TransitionComponent={Zoom} arrow>
          <IconButton
            onClick={onRefresh}
            disabled={refreshing}
            sx={{
              background: "linear-gradient(45deg, #3949ab 0%, #1a237e 100%)",
              color: "white",
              boxShadow: "0 4px 12px rgba(57, 73, 171, 0.3)",
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: "0 6px 14px rgba(57, 73, 171, 0.4)",
                transform: "translateY(-2px)",
              },
              "&:disabled": {
                background: "linear-gradient(45deg, #9fa8da 0%, #7986cb 100%)",
                color: "rgba(255, 255, 255, 0.8)",
              },
            }}
          >
            <Refresh
              sx={{
                animation: refreshing ? "spin 1s linear infinite" : "none",
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;
