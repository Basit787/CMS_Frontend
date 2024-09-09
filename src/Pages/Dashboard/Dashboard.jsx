import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckIcon from "@mui/icons-material/Check";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { Box, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Endpoints } from "../../apis/apiContsants";
import instance from "../../apis/apiRequest";
import useSnackBarStore, { SnackbarType } from "../../stores/SnacbarStore";
import SessionDetails from "../../helpers/sessionDetails";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    getDashboardData();
  }, []);

  const { openSnackbar } = useSnackBarStore((state) => state);

  const getDashboardData = async () => {
    try {
      const getData = await instance.get(Endpoints.dashboardApi);
      setDashboardData(getData.data.data);
    } catch (error) {
      console.log("Cant get the total students in Dashboard" + error);
      openSnackbar({
        type: SnackbarType.error,
        message: "Failed to fetched data!!!",
      });
    }
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
        <Box className="grid md:grid-cols-2 flex-wrap md:justify-between items-center gap-3">
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
    </Box>
  );
};

export default Dashboard;
