import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  List,
  Avatar,
  Card,
  CardContent,
  LinearProgress,
  useTheme,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { Info, TrendingUp, MoreVert } from "@mui/icons-material";

const AIInsights = ({ aiInsights = [] }) => {
  const theme = useTheme();
  const MotionCard = motion(Card);
  const [hoveredCard, setHoveredCard] = useState(null);

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
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "150px",
          height: "150px",
          background: `radial-gradient(circle, ${theme.palette.info.light}15, transparent 70%)`,
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
            mb: 3,
            color: theme.palette.text.primary,
          }}
        >
          <Box
            component="span"
            sx={{
              width: 5,
              height: 28,
              background: `linear-gradient(to bottom, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
              mr: 1.5,
              borderRadius: 1,
              display: "inline-block",
            }}
          />
          AI Market Insights
          <Chip
            size="small"
            label="BETA"
            color="info"
            variant="outlined"
            sx={{ ml: 1.5, height: 20, fontSize: "0.65rem" }}
          />
        </Typography>

        <Divider sx={{ mb: 2, opacity: 0.6 }} />

        <List sx={{ p: 0 }}>
          {aiInsights.map((insight, index) => (
            <MotionCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              elevation={hoveredCard === index ? 3 : 1}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              sx={{
                mb: 2.5,
                borderRadius: 2,
                borderLeft: `4px solid ${theme.palette.info.main}`,
                transition: "all 0.3s ease",
                transform: hoveredCard === index ? "translateY(-3px)" : "none",
                background:
                  hoveredCard === index
                    ? `linear-gradient(to right, ${theme.palette.info.light}10, ${theme.palette.background.paper})`
                    : theme.palette.background.paper,
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Avatar
                    sx={{
                      bgcolor: `${theme.palette.info.main}15`,
                      color: theme.palette.info.main,
                      boxShadow: `0 0 0 1px ${theme.palette.info.main}30`,
                      transition: "all 0.2s ease",
                      transform:
                        hoveredCard === index ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    {insight.icon}
                  </Avatar>
                  <Box sx={{ ml: 2, width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        fontWeight="600"
                        variant="body1"
                        sx={{ color: theme.palette.text.primary }}
                      >
                        {insight.title}
                      </Typography>
                      <Tooltip title="More options">
                        <IconButton size="small" sx={{ opacity: 0.7 }}>
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1.5, lineHeight: 1.4 }}
                    >
                      {insight.description}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="caption"
                        sx={{
                          mr: 1,
                          fontWeight: 500,
                          color: theme.palette.text.secondary,
                        }}
                      >
                        Confidence:
                      </Typography>
                      <Box sx={{ flexGrow: 1, position: "relative" }}>
                        <LinearProgress
                          variant="determinate"
                          value={insight.confidence}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: `${theme.palette.grey[200]}`,
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: getConfidenceColor(
                                insight.confidence,
                                theme
                              ),
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                      <Chip
                        size="small"
                        label={`${insight.confidence}%`}
                        sx={{
                          ml: 1.5,
                          fontWeight: "bold",
                          backgroundColor: getConfidenceColor(
                            insight.confidence,
                            theme
                          ),
                          color: "#fff",
                          minWidth: 48,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </MotionCard>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

// Helper function to get color based on confidence level
const getConfidenceColor = (confidence, theme) => {
  if (confidence >= 80) return theme.palette.success.main;
  if (confidence >= 60) return theme.palette.info.main;
  if (confidence >= 40) return theme.palette.warning.main;
  return theme.palette.error.main;
};

export default AIInsights;
