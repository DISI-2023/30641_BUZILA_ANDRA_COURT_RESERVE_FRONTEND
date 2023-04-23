import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import { PAGES_URL } from "./constants/PagesUrl";

const ApplicationRoutes = () => {
  return [
    {
      path: PAGES_URL.Home,
      element: <Home />,
    },
    {
      path: PAGES_URL.Register,
      element: <Register />,
    },
  ];
};

export default ApplicationRoutes;
