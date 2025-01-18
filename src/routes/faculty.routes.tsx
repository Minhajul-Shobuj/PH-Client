import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";

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
