import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Avatar,
  Chip,
  useTheme,
  Button,
  IconButton,
  Tabs,
  Tab,
  Tooltip,
  LinearProgress,
  Badge,
} from "@mui/material";
import {
  TrendingUp,
  ShowChart,
  Article,
  ArrowUpward,
  ArrowDownward,
  Dashboard as DashboardIcon,
  Refresh,
  Notifications,
  Favorite,
  FavoriteBorder,
  MoreVert,
  Timeline,
  Assessment,
  Bolt,
  Lightbulb,
  TrendingDown,
} from "@mui/icons-material";
import axios from "axios";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [marketNews, setMarketNews] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const performanceData = [
    { name: "Jan", value: 1000 },
    { name: "Feb", value: 1200 },
    { name: "Mar", value: 900 },
    { name: "Apr", value: 1500 },
    { name: "May", value: 1700 },
    { name: "Jun", value: 1400 },
    { name: "Jul", value: 1800 },
  ];

  const portfolioData = [
    { name: "Tech", value: 35 },
    { name: "Finance", value: 25 },
    { name: "Healthcare", value: 20 },
    { name: "Energy", value: 10 },
    { name: "Other", value: 10 },
  ];

  const marketTrends = [
    { name: "NASDAQ", value: "+2.4%", status: "up" },
    { name: "S&P 500", value: "+1.8%", status: "up" },
    { name: "DOW", value: "-0.3%", status: "down" },
    { name: "Russell 2000", value: "+0.7%", status: "up" },
  ];

  const aiInsights = [
    {
      title: "Bullish Signals for Tech Sector",
      description: "AI models predict 12% growth potential in next quarter",
      confidence: 87,
      icon: <TrendingUp />,
    },
    {
      title: "Volatility Alert: Energy Stocks",
      description: "Prepare for increased fluctuations in coming weeks",
      confidence: 73,
      icon: <Timeline />,
    },
    {
      title: "Emerging Market Opportunity",
      description: "Southeast Asian markets showing strong fundamentals",
      confidence: 81,
      icon: <Lightbulb />,
    },
  ];

  useEffect(() => {
    fetchMarketNews();
    fetchMarketData();
  }, []);

  const fetchMarketNews = async () => {
    setNewsLoading(true);
    try {
      // Using Alpha Vantage API for news sentiment
      const response = await axios.get(
        "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets&apikey=7VFME403WOXIE4TF"
      );

      if (response.data && response.data.feed) {
        const newsItems = response.data.feed.slice(0, 5).map((item) => ({
          title: item.title,
          summary: item.summary.slice(0, 100) + "...",
          change:
            item.overall_sentiment_score > 0
              ? `+${(item.overall_sentiment_score * 2).toFixed(1)}%`
              : `${(item.overall_sentiment_score * 2).toFixed(1)}%`,
          isPositive: item.overall_sentiment_score > 0,
          source: item.source,
          time: new Date(item.time_published).toLocaleTimeString(),
        }));
        setMarketNews(newsItems);
      }
    } catch (error) {
      console.error("Error fetching market news:", error);
      // Fallback data if API fails
      setMarketNews([
        {
          title: "Tech Stocks Rally as AI Boom Continues",
          summary:
            "Major tech companies see significant gains as AI investments pay off...",
          change: "+2.3%",
          isPositive: true,
          source: "Financial Times",
          time: "10:30 AM",
        },
        {
          title: "Federal Reserve Signals Potential Rate Changes",
          summary:
            "Central bank officials hint at possible policy shifts in response to economic indicators...",
          change: "-0.8%",
          isPositive: false,
          source: "Wall Street Journal",
          time: "9:15 AM",
        },
        {
          title: "Global Markets React to Economic Data",
          summary:
            "International markets show mixed reactions to latest employment and inflation figures...",
          change: "+1.2%",
          isPositive: true,
          source: "Bloomberg",
          time: "11:45 AM",
        },
        {
          title: "Renewable Energy Sector Outperforms Expectations",
          summary:
            "Clean energy stocks surge following new government incentives and strong quarterly results...",
          change: "+3.5%",
          isPositive: true,
          source: "Reuters",
          time: "2:20 PM",
        },
        {
          title: "Supply Chain Concerns Impact Manufacturing Outlook",
          summary:
            "Ongoing logistics challenges create uncertainty for industrial sector performance...",
          change: "-1.4%",
          isPositive: false,
          source: "CNBC",
          time: "1:05 PM",
        },
      ]);
    } finally {
      setNewsLoading(false);
      setLoading(false);
    }
  };

  const fetchMarketData = async () => {
    try {
      // Simulated market data
      setMarketData([
        { symbol: "AAPL", price: 182.63, change: "+1.24%", volume: "62.3M" },
        { symbol: "MSFT", price: 337.42, change: "+0.87%", volume: "28.1M" },
        { symbol: "GOOGL", price: 131.86, change: "-0.32%", volume: "19.7M" },
        { symbol: "AMZN", price: 127.74, change: "+2.15%", volume: "45.2M" },
      ]);
    } catch (error) {
      console.error("Error fetching market data:", error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMarketNews();
    fetchMarketData();
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleFavorite = (index) => {
    if (favorites.includes(index)) {
      setFavorites(favorites.filter((i) => i !== index));
    } else {
      setFavorites([...favorites, index]);
    }
  };

  const quickActions = [
    {
      title: "Stock Analysis",
      description: "Analyze stock performance and metrics",
      icon: <ShowChart />,
      color: "#3f51b5",
      badge: 3,
    },
    {
      title: "AI Predictions",
      description: "Get AI-powered market predictions",
      icon: <TrendingUp />,
      color: "#4caf50",
      badge: 5,
    },
    {
      title: "Portfolio Optimization",
      description: "Optimize your investment portfolio",
      icon: <Assessment />,
      color: "#ff9800",
      badge: 0,
    },
    {
      title: "Real-time Alerts",
      description: "Set up custom market alerts",
      icon: <Bolt />,
      color: "#e91e63",
      badge: 2,
    },
  ];

  const MotionCard = motion(Card);

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f7fa" }}>
      <Grid container spacing={3}>
        {/* Header with Refresh Button */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                <DashboardIcon />
              </Avatar>
              <Typography variant="h4" fontWeight="600" color="primary.dark">
                Market Dashboard
              </Typography>
            </Box>
            <Box>
              <Tooltip title="Notifications">
                <IconButton sx={{ mr: 1 }}>
                  <Badge badgeContent={4} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Refresh Data">
                <IconButton onClick={handleRefresh} disabled={refreshing}>
                  <Refresh
                    sx={{
                      animation: refreshing
                        ? "spin 1s linear infinite"
                        : "none",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Divider sx={{ mb: 3 }} />
        </Grid>

        {/* Market Summary Cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {marketTrends.map((trend, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <MotionCard
                  elevation={2}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    borderLeft: `4px solid ${
                      trend.status === "up"
                        ? theme.palette.success.main
                        : theme.palette.error.main
                    }`,
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {trend.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      {trend.status === "up" ? (
                        <ArrowUpward sx={{ color: "success.main", mr: 1 }} />
                      ) : (
                        <ArrowDownward sx={{ color: "error.main", mr: 1 }} />
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
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Portfolio Performance Chart */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              background: "linear-gradient(to bottom, #ffffff, #f9fafc)",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="500"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
                color: "text.primary",
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 4,
                  height: 24,
                  bgcolor: "primary.main",
                  mr: 1.5,
                  borderRadius: 1,
                  display: "inline-block",
                }}
              />
              Portfolio Performance
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <RechartsTooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Portfolio Allocation */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              background: "linear-gradient(to bottom, #ffffff, #f9fafc)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="500"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
                color: "text.primary",
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 4,
                  height: 24,
                  bgcolor: "secondary.main",
                  mr: 1.5,
                  borderRadius: 1,
                  display: "inline-block",
                }}
              />
              Portfolio Allocation
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}
            >
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* AI Insights */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              height: "100%",
              background: "linear-gradient(to bottom, #ffffff, #f9fafc)",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="500"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
                color: "text.primary",
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 4,
                  height: 24,
                  bgcolor: "info.main",
                  mr: 1.5,
                  borderRadius: 1,
                  display: "inline-block",
                }}
              />
              AI Market Insights
            </Typography>
            <List sx={{ p: 0 }}>
              {aiInsights.map((insight, index) => (
                <MotionCard
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  elevation={1}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    borderLeft: `4px solid ${theme.palette.info.main}`,
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <Avatar
                        sx={{
                          bgcolor: `${theme.palette.info.light}30`,
                          color: theme.palette.info.main,
                        }}
                      >
                        {insight.icon}
                      </Avatar>
                      <Box sx={{ ml: 2, width: "100%" }}>
                        <Typography fontWeight="600" variant="body1">
                          {insight.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {insight.description}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="caption" sx={{ mr: 1 }}>
                            Confidence:
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={insight.confidence}
                            sx={{
                              flexGrow: 1,
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: `${theme.palette.info.light}30`,
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: theme.palette.info.main,
                              },
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ ml: 1, fontWeight: "bold" }}
                          >
                            {insight.confidence}%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </MotionCard>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              height: "100%",
              background: "linear-gradient(to bottom, #ffffff, #f9fafc)",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="500"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
                color: "text.primary",
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 4,
                  height: 24,
                  bgcolor: "primary.main",
                  mr: 1.5,
                  borderRadius: 1,
                  display: "inline-block",
                }}
              />
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <MotionCard
                    elevation={2}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    sx={{
                      borderRadius: 2,
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardActionArea sx={{ p: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Badge
                          badgeContent={action.badge}
                          color="error"
                          invisible={action.badge === 0}
                        >
                          <Avatar
                            sx={{
                              bgcolor: action.color + "20",
                              color: action.color,
                              width: 48,
                              height: 48,
                            }}
                          >
                            {action.icon}
                          </Avatar>
                        </Badge>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="h6" fontWeight="500">
                            {action.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {action.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardActionArea>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Market News */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              background: "linear-gradient(to bottom, #ffffff, #f9fafc)",
            }}
          >
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
                fontWeight="500"
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
                    bgcolor: "secondary.main",
                    mr: 1.5,
                    borderRadius: 1,
                    display: "inline-block",
                  }}
                />
                Market News & Analysis
              </Typography>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{ minHeight: 40 }}
              >
                <Tab label="Latest News" sx={{ minHeight: 40 }} />
                <Tab label="Trending" sx={{ minHeight: 40 }} />
                <Tab label="Favorites" sx={{ minHeight: 40 }} />
              </Tabs>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {newsLoading ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 4,
                }}
              >
                <CircularProgress sx={{ mb: 2 }} />
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
                    elevation={1}
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateX(4px)",
                      },
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
                            sx={{ mr: 1, bgcolor: theme.palette.grey[200] }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {news.time}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => toggleFavorite(index)}
                            sx={{ mr: 0.5 }}
                          >
                            {favorites.includes(index) ? (
                              <Favorite fontSize="small" color="error" />
                            ) : (
                              <FavoriteBorder fontSize="small" />
                            )}
                          </IconButton>
                          <IconButton size="small">
                            <MoreVert fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Avatar
                            sx={{
                              bgcolor: news.isPositive
                                ? "success.light"
                                : "error.light",
                              color: news.isPositive
                                ? "success.dark"
                                : "error.dark",
                            }}
                          >
                            <Article />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography fontWeight="500" variant="body1">
                              {news.title}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 0.5 }}
                            >
                              {news.summary}
                            </Typography>
                          }
                        />
                        <Chip
                          icon={
                            news.isPositive ? (
                              <ArrowUpward />
                            ) : (
                              <ArrowDownward />
                            )
                          }
                          label={news.change}
                          size="small"
                          sx={{
                            bgcolor: news.isPositive
                              ? "success.light"
                              : "error.light",
                            color: news.isPositive
                              ? "success.dark"
                              : "error.dark",
                            fontWeight: "bold",
                            ml: 1,
                          }}
                        />
                      </ListItem>
                    </CardContent>
                  </MotionCard>
                ))}
              </List>
            )}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button variant="outlined" color="primary">
                View More News
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
