import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckIcon from "@mui/icons-material/Check";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { Box, Card } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { Endpoints } from "../../apis/apiContsants";
import instance from "../../apis/apiRequest";
import "./dashboard.scss";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    getDashboardData();
  }, []);

  //Total strudents in dashboard
  const getDashboardData = () => {
    instance
      .get(Endpoints.dashboardApi)
      .then((res) => {
        setDashboardData(res.data.data);
      })
      .catch((err) => {
        console.log("Cant get the total students in Dashboard" + err);
      });
  };

  const data = [
    {
      id: 0,
      value: dashboardData.active,
      label: "Active Students",
      color: "#1e81b0",
    },
    {
      id: 1,
      value: dashboardData.inActive,
      label: "Inactive Students",
      color: "#BE3144",
    },
    {
      id: 2,
      value: dashboardData.completed,
      label: "Course Complete",
      color: "#65B741",
    },
  ];

  // mapping dashboard

  let dashboard = [
    {
      title: "Total Students",
      icon: <CoPresentIcon />,
      value: dashboardData.total,
      background: "#FF8989",
    },
    {
      title: "Active Students",
      icon: <CheckIcon />,
      value: dashboardData.active,
      background: "#1e81b0",
    },
    {
      title: "InActive Students",
      icon: <DoNotDisturbAltIcon />,
      value: dashboardData.inActive,
      background: "#BE3144",
    },
    {
      title: "Course Complete",
      icon: <AssignmentTurnedInIcon />,
      value: dashboardData.completed,
      background: "#65B741 ",
    },
  ];

  return (
    <Box>
      <Box sx={{ margin: "5%" }}>
        <Box className="dashboard">
          {dashboard.map((item, value) => (
            <Card
              className="DashboardCard"
              sx={{ backgroundColor: item.background, color: "white" }}
              key={value}
            >
              <Box className="card-content">
                <h1>{item.value}</h1>
                <h3>{item.title}</h3>
              </Box>
              <Box>{item.icon}</Box>
            </Card>
          ))}
        </Box>
      </Box>
      <Box>
        <Box sx={{ width: "50%", float: "left" }} className="pieChart">
          <PieChart
            series={[
              {
                data,
                highlightScope: {
                  faded: "global",
                  highlighted: "item",
                },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            height={250}
          />
        </Box>
        <Box sx={{}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
