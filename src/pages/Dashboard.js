import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Divider,
  Container,
  useMediaQuery,
  useTheme,
  Paper,
  Typography,
  Fade,
} from "@mui/material";
import Header from "../components/Header";
import MarketSummary from "../components/MarketSummary";
import PortfolioPerformance from "../components/PortfolioPerformance";
import PortfolioAllocation from "../components/PortfolioAllocation";
import QuickActions from "../components/QuickActions";
import MarketNews from "../components/MarketNews";
import {
  fetchMarketNews,
  fetchMarketData,
  fetchPerformanceData,
  fetchPortfolioData,
  fetchMarketTrends,
  fetchAiInsights,
} from "../api/dataFetchers";

const Dashboard = () => {
  const [marketNews, setMarketNews] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [performanceData, setPerformanceData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [marketTrends, setMarketTrends] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setNewsLoading(true);

    try {
      const newsData = await fetchMarketNews();
      setMarketNews(newsData);

      const marketDataResult = await fetchMarketData();
      setMarketData(marketDataResult);

      const performanceResult = await fetchPerformanceData();
      setPerformanceData(performanceResult);

      const portfolioResult = await fetchPortfolioData();
      setPortfolioData(portfolioResult);

      const trendsResult = await fetchMarketTrends();
      setMarketTrends(trendsResult);

      const insightsResult = await fetchAiInsights();
      setAiInsights(insightsResult);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setNewsLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAllData();
    setTimeout(() => setRefreshing(false), 1500);
  };

  const toggleFavorite = (index) => {
    setFavorites(
      favorites.includes(index)
        ? favorites.filter((i) => i !== index)
        : [...favorites, index]
    );
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.primary.light}15 100%)`,
        pt: 3,
        pb: 5,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.primary.light}20, transparent 70%)`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.secondary.light}20, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in={true} timeout={800}>
          <Box>
            <Grid container spacing={3}>
              {/* Welcome Message */}
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  fontWeight="700"
                  sx={{
                    mb: 1,
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Financial Dashboard
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: "800px" }}
                >
                  Track your investments, analyze market trends, and get
                  AI-powered insights to optimize your portfolio.
                </Typography>
              </Grid>

              {/* Market Summary Cards - Full width and prominent */}
              <Grid item xs={12}>
                <MarketSummary marketTrends={marketTrends} />
              </Grid>

              {/* Main Content Area */}
              <Grid item xs={12} lg={8}>
                <Grid container spacing={3}>
                  {/* Portfolio Performance Chart */}
                  <Grid item xs={12} md={8}>
                    <PortfolioPerformance performanceData={performanceData} />
                  </Grid>

                  {/* Portfolio Allocation */}
                  <Grid item xs={12} md={4}>
                    <PortfolioAllocation portfolioData={portfolioData} />
                  </Grid>

                  {/* Quick Actions */}
                  <Grid item xs={12}>
                    <QuickActions />
                  </Grid>

                  {/* Market News - Full width in this column */}
                  <Grid item xs={12}>
                    <MarketNews
                      marketNews={marketNews}
                      loading={newsLoading}
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Right Sidebar */}
              <Grid item xs={12} lg={4}>
                <Grid container spacing={3}>
                  {/* Portfolio Allocation - moved to main content area */}
                  <Grid item xs={12}>
                    <PortfolioAllocation portfolioData={portfolioData} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Dashboard;
