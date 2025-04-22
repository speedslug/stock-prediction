import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Grow,
  useTheme,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ShowChart, TrendingUp } from "@mui/icons-material";
import { motion } from "framer-motion";

const PortfolioPerformance = ({ performanceData = [] }) => {
  const theme = useTheme();
  const MotionPaper = motion(Paper);
  const [hoveredData, setHoveredData] = useState(null);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            p: 1.5,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            border: `1px solid ${theme.palette.primary.light}30`,
          }}
        >
          <Typography
            variant="subtitle2"
            color="text.primary"
            fontWeight="bold"
          >
            {label}
          </Typography>
          <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
            Value: ${payload[0].value.toLocaleString()}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Grow in={true} timeout={800}>
      <MotionPaper
        elevation={3}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }}
        sx={{
          p: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
          height: "100%",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          border: "1px solid rgba(230, 235, 255, 0.9)",
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
              Portfolio Performance
            </Typography>
          </Box>
          <Tooltip title="Trending upward" arrow>
            <IconButton
              size="small"
              sx={{
                backgroundColor: theme.palette.success.light + "20",
                "&:hover": {
                  backgroundColor: theme.palette.success.light + "40",
                },
              }}
            >
              <TrendingUp sx={{ color: theme.palette.success.main }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, mb: 2 }}
        >
          Track your investment growth over time
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ height: 350, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={performanceData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              onMouseMove={(data) => {
                if (data && data.activePayload) {
                  setHoveredData(data.activePayload[0].payload);
                }
              }}
              onMouseLeave={() => setHoveredData(null)}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.palette.grey[200]}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                axisLine={{ stroke: theme.palette.grey[300] }}
              />
              <YAxis
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                axisLine={{ stroke: theme.palette.grey[300] }}
                tickFormatter={(value) => `$${value}`}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <Area
                type="monotone"
                dataKey="value"
                name="Portfolio Value"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
                activeDot={{
                  r: 6,
                  stroke: theme.palette.primary.dark,
                  strokeWidth: 2,
                  fill: theme.palette.common.white,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        {hoveredData && (
          <Box
            sx={{
              mt: 2,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: theme.palette.primary.light + "15",
              border: `1px dashed ${theme.palette.primary.light}`,
              display: "inline-block",
            }}
          >
            <Typography variant="body2" fontWeight="medium">
              {hoveredData.name}:{" "}
              <strong>${hoveredData.value.toLocaleString()}</strong>
            </Typography>
          </Box>
        )}
      </MotionPaper>
    </Grow>
  );
};

export default PortfolioPerformance;
