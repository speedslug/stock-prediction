import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Fade,
  useTheme,
  Paper,
  Divider,
  Tooltip,
} from "@mui/material";
import { ArrowUpward, ArrowDownward, ShowChart } from "@mui/icons-material";
import { motion } from "framer-motion";

const MarketSummary = ({ marketTrends = [] }) => {
  const theme = useTheme();
  const MotionCard = motion(Card);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        overflow: "hidden",
        position: "relative",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <ShowChart
          sx={{
            color: theme.palette.primary.main,
            mr: 1.5,
            fontSize: 28,
          }}
        />
        <Typography
          variant="h5"
          fontWeight="700"
          sx={{
            background: "linear-gradient(45deg, #1a237e 30%, #3949ab 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Market Trends
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {marketTrends.map((trend, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Fade in={true} timeout={500 + index * 100}>
              <Tooltip title={`Current ${trend.name} market trend`} arrow>
                <MotionCard
                  elevation={3}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    scale: 1.02,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    background:
                      trend.status === "up"
                        ? `linear-gradient(135deg, ${theme.palette.success.light}15, ${theme.palette.success.light}30)`
                        : `linear-gradient(135deg, ${theme.palette.error.light}15, ${theme.palette.error.light}30)`,
                    borderLeft: `4px solid ${
                      trend.status === "up"
                        ? theme.palette.success.main
                        : theme.palette.error.main
                    }`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    position: "relative",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -15,
                      right: -15,
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background:
                        trend.status === "up"
                          ? `radial-gradient(circle, ${theme.palette.success.light}20, transparent 70%)`
                          : `radial-gradient(circle, ${theme.palette.error.light}20, transparent 70%)`,
                      zIndex: 0,
                    }}
                  />
                  <CardContent sx={{ p: 2.5, position: "relative", zIndex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      {trend.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mt: 1.5 }}
                    >
                      {trend.status === "up" ? (
                        <ArrowUpward
                          sx={{
                            color: "success.main",
                            mr: 1,
                            animation: "pulse 1.5s infinite ease-in-out",
                            "@keyframes pulse": {
                              "0%": { opacity: 0.6 },
                              "50%": { opacity: 1 },
                              "100%": { opacity: 0.6 },
                            },
                          }}
                        />
                      ) : (
                        <ArrowDownward
                          sx={{
                            color: "error.main",
                            mr: 1,
                            animation: "pulse 1.5s infinite ease-in-out",
                            "@keyframes pulse": {
                              "0%": { opacity: 0.6 },
                              "50%": { opacity: 1 },
                              "100%": { opacity: 0.6 },
                            },
                          }}
                        />
                      )}
                      <Typography
                        variant="h5"
                        sx={{
                          color:
                            trend.status === "up"
                              ? "success.main"
                              : "error.main",
                          fontWeight: "bold",
                        }}
                      >
                        {trend.value}
                      </Typography>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Tooltip>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default MarketSummary;
