import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Avatar,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  useTheme,
  Tooltip,
} from "@mui/material";
import {
  Article,
  ArrowUpward,
  ArrowDownward,
  Favorite,
  FavoriteBorder,
  MoreVert,
  Newspaper,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const MarketNews = ({
  marketNews = [],
  loading = false,
  favorites = [],
  toggleFavorite,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const MotionCard = motion(Card);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
          top: 0,
          right: 0,
          width: "150px",
          height: "150px",
          background: `radial-gradient(circle, ${theme.palette.primary.light}15, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="600"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.primary",
            }}
          >
            <Box
              component="span"
              sx={{
                width: 4,
                height: 24,
                background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                mr: 1.5,
                borderRadius: 1,
                display: "inline-block",
              }}
            />
            <Newspaper sx={{ mr: 1, color: theme.palette.primary.main }} />
            Market News & Analysis
          </Typography>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              minHeight: 40,
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: "3px 3px 0 0",
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              },
            }}
          >
            <Tab
              label="Latest News"
              sx={{
                minHeight: 40,
                fontWeight: 500,
                transition: "all 0.2s",
                "&.Mui-selected": {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                },
              }}
            />
            <Tab
              label="Trending"
              sx={{
                minHeight: 40,
                fontWeight: 500,
                transition: "all 0.2s",
                "&.Mui-selected": {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                },
              }}
            />
            <Tab
              label="Favorites"
              sx={{
                minHeight: 40,
                fontWeight: 500,
                transition: "all 0.2s",
                "&.Mui-selected": {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                },
              }}
            />
          </Tabs>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 4,
            }}
          >
            <CircularProgress
              sx={{
                mb: 2,
                color: theme.palette.primary.main,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Fetching latest market news...
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {marketNews.map((news, index) => (
              <MotionCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                elevation={hoveredCard === index ? 3 : 1}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  transform: hoveredCard === index ? "translateX(8px)" : "none",
                  borderLeft:
                    hoveredCard === index
                      ? `4px solid ${
                          news.isPositive
                            ? theme.palette.success.main
                            : theme.palette.error.main
                        }`
                      : "none",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Chip
                        label={news.source}
                        size="small"
                        sx={{
                          mr: 1,
                          bgcolor: theme.palette.grey[100],
                          fontWeight: 500,
                          border: `1px solid ${theme.palette.grey[200]}`,
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {news.time}
                      </Typography>
                    </Box>
                    <Box>
                      <Tooltip
                        title={
                          favorites.includes(index)
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        <IconButton
                          size="small"
                          onClick={() => toggleFavorite(index)}
                          sx={{
                            mr: 0.5,
                            transition: "all 0.2s",
                            "&:hover": {
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          {favorites.includes(index) ? (
                            <Favorite fontSize="small" color="error" />
                          ) : (
                            <FavoriteBorder fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="More options">
                        <IconButton
                          size="small"
                          sx={{
                            transition: "all 0.2s",
                            "&:hover": {
                              transform: "scale(1.1)",
                              background: theme.palette.grey[100],
                            },
                          }}
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Avatar
                        sx={{
                          bgcolor: news.isPositive
                            ? `${theme.palette.success.light}30`
                            : `${theme.palette.error.light}30`,
                          color: news.isPositive
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                          boxShadow: `0 4px 12px ${
                            news.isPositive
                              ? `${theme.palette.success.main}30`
                              : `${theme.palette.error.main}30`
                          }`,
                          transition: "all 0.3s ease",
                          transform:
                            hoveredCard === index ? "scale(1.1)" : "scale(1)",
                        }}
                      >
                        <Article />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          fontWeight="600"
                          variant="body1"
                          sx={{
                            transition: "color 0.3s ease",
                            color:
                              hoveredCard === index
                                ? theme.palette.primary.main
                                : "text.primary",
                          }}
                        >
                          {news.title}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5, lineHeight: 1.6 }}
                        >
                          {news.summary}
                        </Typography>
                      }
                    />
                    <Chip
                      icon={
                        news.isPositive ? <ArrowUpward /> : <ArrowDownward />
                      }
                      label={news.change}
                      size="small"
                      sx={{
                        bgcolor: news.isPositive
                          ? `${theme.palette.success.light}20`
                          : `${theme.palette.error.light}20`,
                        color: news.isPositive
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                        fontWeight: "bold",
                        ml: 1,
                        border: `1px solid ${
                          news.isPositive
                            ? theme.palette.success.light
                            : theme.palette.error.light
                        }`,
                        transition: "all 0.3s ease",
                        transform:
                          hoveredCard === index ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                  </ListItem>
                </CardContent>
              </MotionCard>
            ))}
          </List>
        )}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 6px 16px ${theme.palette.primary.main}60`,
              },
            }}
          >
            View More News
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default MarketNews;
