import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./studentId.css";

const StudentId = ({ sendStudentData }) => {
  const [id, setId] = useState([]);

  useEffect(() => {
    if (sendStudentData) {
      setId(sendStudentData);
    }
  });

  return (
    <Box className="studentIdContainer">
      <Box className="StudentCard">
        <h1 style={{ textAlign: "center" }}>
          {id.studentname} ({id.studentId})
        </h1>
        <Box>
          <Box className="student-details">
            <div className="detail-item">
              <h2>Date Of Birth</h2>
              <p>{id.dateOfBirth}</p>
            </div>
            <div className="detail-item">
              <h2>Contact Number</h2>
              <p>{id.phoneNumber}</p>
            </div>
            <div className="detail-item">
              <h2>Email</h2>
              <p>{id.email}</p>
            </div>
            <div className="detail-item">
              <h2>Gender</h2>
              <p>{id.gender}</p>
            </div>
            <div className="detail-item">
              <h2>Date Of Joining</h2>
              <p>{id.dateOfJoining}</p>
            </div>
            <div className="detail-item">
              <h2>Aadhar Card</h2>
              <p>{id.aadharCard}</p>
            </div>
            <div className="detail-item">
              <h2>Pan Card</h2>
              <p>{id.panCard}</p>
            </div>
            <div className="detail-item">
              <h2>Highest Qualification</h2>
              <p>{id.highestQualification}</p>
            </div>
            <div className="detail-item">
              <h2>Selected Course</h2>
              <p>{id.selectCourse}</p>
            </div>
            <div style={{ width: "100%" }}>
              <h2>Address</h2>
              <p>{id.address}</p>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentId;
