import axios from "axios";
import {
  AutoGraph,
  Insights,
  PriceChange,
  Lightbulb,
  TrendingUp,
} from "@mui/icons-material";

// Market News Fetcher
export const fetchMarketNews = async () => {
  try {
    // Using mock data instead of real API to avoid rate limits and timeouts
    return [
      {
        title: "Tech Stocks Rally as Inflation Concerns Ease",
        summary:
          "Major tech companies saw significant gains as new economic data suggests inflation may be cooling, leading investors to...",
        change: "+1.8%",
        isPositive: true,
        source: "Financial Times",
        time: new Date().toLocaleTimeString(),
      },
      {
        title: "Federal Reserve Signals Potential Rate Cut",
        summary:
          "In a surprising move, the Federal Reserve indicated it may consider rate cuts in the coming months as economic...",
        change: "+2.3%",
        isPositive: true,
        source: "Wall Street Journal",
        time: new Date().toLocaleTimeString(),
      },
      {
        title: "Oil Prices Drop Amid Supply Concerns",
        summary:
          "Crude oil futures fell sharply today as reports of increased production from major oil-producing nations raised concerns...",
        change: "-1.5%",
        isPositive: false,
        source: "Bloomberg",
        time: new Date().toLocaleTimeString(),
      },
      {
        title: "Retail Sales Exceed Expectations in Q2",
        summary:
          "Consumer spending showed resilience in the second quarter, with retail sales figures surpassing analyst expectations by...",
        change: "+0.9%",
        isPositive: true,
        source: "CNBC",
        time: new Date().toLocaleTimeString(),
      },
      {
        title: "Cryptocurrency Market Faces Regulatory Scrutiny",
        summary:
          "Bitcoin and other cryptocurrencies declined as lawmakers proposed new regulations aimed at increasing transparency and...",
        change: "-2.1%",
        isPositive: false,
        source: "Reuters",
        time: new Date().toLocaleTimeString(),
      },
    ];
  } catch (error) {
    console.error("Error fetching market news:", error);
    return [];
  }
};

// Market Data Fetcher
export const fetchMarketData = async () => {
  try {
    // Using mock data instead of real API to avoid rate limits and timeouts
    return [
      {
        symbol: "AAPL",
        price: 182.63,
        change: "+1.24%",
        volume: "62.3M",
      },
      {
        symbol: "MSFT",
        price: 337.42,
        change: "+0.87%",
        volume: "23.1M",
      },
      {
        symbol: "GOOGL",
        price: 131.86,
        change: "-0.32%",
        volume: "18.7M",
      },
      {
        symbol: "AMZN",
        price: 127.74,
        change: "+2.15%",
        volume: "45.2M",
      },
    ];
  } catch (error) {
    console.error("Error fetching market data:", error);
    return [];
  }
};

// Performance Data Fetcher
export const fetchPerformanceData = async () => {
  try {
    // Using mock data instead of real API to avoid rate limits and timeouts
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();

    // Create last 7 months in sequence
    const last7Months = Array.from({ length: 7 }, (_, i) => {
      const monthIndex = (currentMonth - 6 + i + 12) % 12; // Ensure positive index
      return monthNames[monthIndex];
    });

    // Create realistic looking growth pattern
    const baseValue = 1000;
    const values = [baseValue];

    for (let i = 1; i < 7; i++) {
      const change = (Math.random() * 0.08 - 0.02) * values[i - 1]; // -2% to +6% change
      values.push(Math.round((values[i - 1] + change) * 100) / 100);
    }

    return last7Months.map((month, index) => ({
      name: month,
      value: values[index],
      profit:
        index > 0
          ? (
              ((values[index] - values[index - 1]) / values[index - 1]) *
              100
            ).toFixed(1)
          : 0,
    }));
  } catch (error) {
    console.error("Error fetching performance data:", error);
    return [];
  }
};

// Portfolio Data Fetcher
export const fetchPortfolioData = async () => {
  try {
    // Using realistic sector weights based on typical portfolio allocation
    return [
      { name: "Technology", value: 28 },
      { name: "Financial Services", value: 22 },
      { name: "Healthcare", value: 18 },
      { name: "Consumer Cyclical", value: 12 },
      { name: "Energy & Utilities", value: 20 },
    ];
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return [];
  }
};

// Market Trends Fetcher
export const fetchMarketTrends = async () => {
  try {
    // Using mock data instead of real API to avoid rate limits and timeouts
    return [
      {
        name: "NASDAQ",
        value: "+1.2%",
        status: "up",
      },
      {
        name: "S&P 500",
        value: "+0.8%",
        status: "up",
      },
      {
        name: "DOW",
        value: "-0.3%",
        status: "down",
      },
      {
        name: "Russell 2000",
        value: "+1.5%",
        status: "up",
      },
    ];
  } catch (error) {
    console.error("Error fetching market trends:", error);
    return [];
  }
};

// AI Insights Fetcher
export const fetchAiInsights = async () => {
  try {
    // Using mock data instead of real API to avoid rate limits and timeouts
    return [
      {
        title: "Tech Sector Outlook",
        description:
          "Tech stocks showing resilience despite market pressure with potential for continued growth.",
        confidence: 78,
        icon: <AutoGraph />,
      },
      {
        title: "Market Volatility Prediction",
        description:
          "Based on recent trends, expect decreased volatility in the coming weeks.",
        confidence: 82,
        icon: <Insights />,
      },
      {
        title: "Investment Opportunity",
        description:
          "Renewable energy sector shows promising growth potential based on recent policy changes.",
        confidence: 85,
        icon: <Lightbulb />,
      },
    ];
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return [];
  }
};
