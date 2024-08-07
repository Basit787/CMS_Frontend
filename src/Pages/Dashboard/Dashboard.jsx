import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckIcon from "@mui/icons-material/Check";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { Box, Card } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Endpoints } from "../../apis/apiContsants";
import instance from "../../apis/apiRequest";
import { setSnackBarOpen, SnackbarType } from "../../reducers/SnacbarSlice";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    getDashboardData();
  }, []);

  const dispatch = useDispatch();

  const getDashboardData = () => {
    instance
      .get(Endpoints.dashboardApi)
      .then((res) => setDashboardData(res.data.data))
      .catch((err) => {
        console.log("Cant get the total students in Dashboard" + err);
        dispatch(
          setSnackBarOpen({
            type: SnackbarType.error,
            message: "Failed to fetched data!!!",
          })
        );
      });
  };

  // mapping dashboard

  let dashboard = [
    {
      title: "Total Students",
      icon: <CoPresentIcon />,
      value: dashboardData.total,
      background: "bg-sky-500",
    },
    {
      title: "Active Students",
      icon: <CheckIcon />,
      value: dashboardData.active,
      background: "bg-green-500",
    },
    {
      title: "InActive Students",
      icon: <DoNotDisturbAltIcon />,
      value: dashboardData.inActive,
      background: "bg-red-500",
    },
    {
      title: "Course Complete",
      icon: <AssignmentTurnedInIcon />,
      value: dashboardData.completed,
      background: "bg-sky-500",
    },
  ];

  return (
    <Box>
      <Box>
        <Box className="grid md:grid-cols-4 grid-cols-2 flex-wrap justify-between items-center gap-3">
          {dashboard.map((item, value) => (
            <Card
              key={value}
              className={`${item.background} flex flex-row justify-between items-center  w-full p-4 text-white`}
            >
              <Box cla>
                <h1>{item.value}</h1>
                <h3>{item.title}</h3>
              </Box>
              <Box>{item.icon}</Box>
            </Card>
          ))}
        </Box>
      </Box>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default Dashboard;
