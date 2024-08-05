import App from "./App";
import Addmission from "./Pages/Addmission/Addmission";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Students from "./Pages/Students/Student";
import AddChapter from "./Pages/Syllabus/Chapter/AddChapter/AddChapter";
import Chapter from "./Pages/Syllabus/Chapter/Chapter";
import Course from "./Pages/Syllabus/Course/Course";

export const AppRoute = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "students", element: <Students /> },
      { path: "addmission_form", element: <Addmission /> },
      { path: "course", element: <Course /> },
      { path: "/course/chapter", element: <Chapter /> },
      { path: "addChapter", element: <AddChapter /> },
    ],
  },
];
