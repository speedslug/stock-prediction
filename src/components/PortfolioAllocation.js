import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  useTheme,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { DonutLarge, Circle } from "@mui/icons-material";
import { motion } from "framer-motion";

const PortfolioAllocation = ({ portfolioData = [] }) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);
  const MotionPaper = motion(Paper);

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.8}
        />
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <MotionPaper
      elevation={3}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        p: 3,
        borderRadius: 2,
        background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
          <DonutLarge sx={{ mr: 1.5, color: theme.palette.primary.main }} />
          Portfolio Allocation
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Current distribution of your investment assets
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={portfolioData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {portfolioData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke={theme.palette.background.paper}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box sx={{ flex: 1, pl: { md: 2 }, mt: { xs: 2, md: 0 } }}>
          <List dense>
            {portfolioData.map((entry, index) => (
              <ListItem
                key={`legend-${index}`}
                sx={{
                  py: 0.5,
                  borderRadius: 1,
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.04)",
                    transform: "translateX(5px)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Circle
                    sx={{ color: COLORS[index % COLORS.length], fontSize: 14 }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={entry.name}
                  secondary={`${(
                    (entry.value * 100) /
                    portfolioData.reduce((sum, item) => sum + item.value, 0)
                  ).toFixed(1)}%`}
                  primaryTypographyProps={{ fontWeight: 500 }}
                  secondaryTypographyProps={{ color: "primary" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </MotionPaper>
  );
};

export default PortfolioAllocation;
