import React from "react";
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardActionArea,
  Avatar,
  Badge,
  useTheme,
  Divider,
  Tooltip,
} from "@mui/material";
import { ShowChart, AutoGraph, Analytics, Bolt } from "@mui/icons-material";
import { motion } from "framer-motion";

const QuickActions = () => {
  const theme = useTheme();
  const MotionCard = motion(Card);

  const quickActions = [
    {
      title: "Stock Analysis",
      description: "Analyze stock performance and metrics",
      icon: <ShowChart />,
      color: "#6a11cb",
      badge: 3,
      tooltip: "View detailed stock analysis tools",
    },
    {
      title: "AI Predictions",
      description: "Get AI-powered market predictions",
      icon: <AutoGraph />,
      color: "#2575fc",
      badge: 5,
      tooltip: "Access machine learning market forecasts",
    },
    {
      title: "Portfolio Optimization",
      description: "Optimize your investment portfolio",
      icon: <Analytics />,
      color: "#ff9800",
      badge: 0,
      tooltip: "Rebalance and optimize your investments",
    },
    {
      title: "Real-time Alerts",
      description: "Set up custom market alerts",
      icon: <Bolt />,
      color: "#e91e63",
      badge: 2,
      tooltip: "Configure personalized market notifications",
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        height: "100%",
        background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative element */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.primary.light}15, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          fontWeight="600"
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            color: "text.primary",
          }}
        >
          <Bolt sx={{ mr: 1.5, color: theme.palette.primary.main }} />
          Quick Actions
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Access frequently used tools and features
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2.5}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Tooltip title={action.tooltip} arrow placement="top">
              <MotionCard
                elevation={2}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  y: -5,
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                }}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  borderLeft: `4px solid ${action.color}`,
                  background: `linear-gradient(135deg, white, ${action.color}10)`,
                  position: "relative",
                }}
              >
                <CardActionArea
                  sx={{
                    p: 2.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: `linear-gradient(135deg, white, ${action.color}20)`,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Badge
                      badgeContent={action.badge}
                      color="error"
                      invisible={action.badge === 0}
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: 10,
                          height: 18,
                          minWidth: 18,
                          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: `${action.color}20`,
                          color: action.color,
                          width: 52,
                          height: 52,
                          boxShadow: `0 4px 14px ${action.color}30`,
                          transition: "all 0.3s ease",
                          "& .MuiSvgIcon-root": {
                            fontSize: 28,
                          },
                        }}
                      >
                        {action.icon}
                      </Avatar>
                    </Badge>
                    <Box sx={{ ml: 2.5 }}>
                      <Typography
                        variant="h6"
                        fontWeight="600"
                        sx={{
                          mb: 0.5,
                          background: `linear-gradient(45deg, ${action.color}, ${theme.palette.text.primary})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {action.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.4 }}
                      >
                        {action.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardActionArea>
              </MotionCard>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default QuickActions;
