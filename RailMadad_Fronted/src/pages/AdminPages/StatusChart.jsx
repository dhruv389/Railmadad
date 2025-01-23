import React, { PureComponent, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Bar,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Text,
} from "recharts";

import { useContext } from "react";
import { AuthContext } from "../../Context/userContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomContent = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
  
    const { name, value } = payload[0].payload; // Ensure we access the payload correctly
    const total = payload.reduce((sum, curr) => sum + curr.value, 0);
    const percentage = ((value / total) * 100).toFixed(2);
  
    return (
      <div className="tooltip-content">
        <p className="tooltip-name">{name}</p>
        <p className="tooltip-value">Count: {value}</p>
        <p className="tooltip-percentage">Percentage: {percentage}%</p>
      </div>
    );
  };

const StatusChart = () => {
  const { chartData } = useContext(AuthContext);

  // Handle cases where CHartData might be null or undefined
  const CHartData = chartData?.statusWiseCount || [];

  const total = CHartData.reduce((sum, curr) => sum + curr.count, 0);

  return (
    <ResponsiveContainer width="100%"  height={300}>
      <PieChart>
      <Pie
  data={CHartData}
  cx="50%"
  cy="50%"
  innerRadius={70}
  outerRadius={100}
  fill="#8884d8"
  paddingAngle={5}
  dataKey="count" // Map `count` to the chart's data value
  nameKey="_id"   // Map `_id` to the category names
  isAnimationActive={true}
  animationDuration={1500}
>
  {CHartData &&
    CHartData.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={COLORS[index % COLORS.length]}
        stroke="#fff"
        strokeWidth={2}
      />
    ))}
</Pie>
        <Tooltip content={<CustomContent />} />
        {/* Centered Text */}
        <Text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={16}
          fontWeight="bold"
          fill="#333"
        >
          Total
        </Text>
        <Text
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={24}
          fontWeight="bold"
          fill="#555"
        >
          {total}
        </Text>
      </PieChart>
      <style jsx>{`
        .tooltip-content {
          background-color: rgba(255, 255, 255, 0.9);
          color: #333;
          padding: 10px 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
          font-family: Arial, sans-serif;
        }
        .tooltip-name {
          font-size: 14px;
          font-weight: bold;
          margin: 0;
          color: #444;
        }
        .tooltip-value {
          margin: 5px 0;
          font-size: 13px;
          color: #666;
        }
        .tooltip-percentage {
          font-size: 12px;
          color: #888;
        }
      `}</style>
    </ResponsiveContainer>
  );
};

export default StatusChart;