import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetStatsQuery } from "../../services/stats";
import MonthlyStats from "../../components/MonthlyStats";

const Monthly = () => {
  return <MonthlyStats />;
};

export default Monthly;
