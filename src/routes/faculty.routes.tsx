import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <CreateFaculty />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <CreateAdmin />,
  },
];
