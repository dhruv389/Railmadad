import React ,{useState,useEffect} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { AuthContext } from "../../Context/userContext";

export default function BarChart1() {

  const { chartData } = useContext(AuthContext);



  const BarData= chartData?.categoryWiseCount|| [];


  return (
    <div style={{ width: "100%", height: 300, fontSize: "12px" }}>
      <ResponsiveContainer >
        <BarChart
          data={BarData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
         
        >
          {/* <CartesianGrid strokeDasharray= /> */}
          <XAxis dataKey="_id" 
            angle={-35} 
            textAnchor="end" 
            interval={0}   />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" stackId="a" fill="#82ca9d" />
          {/* <Bar dataKey="Pending" stackId="a" fill="#8884d8" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
