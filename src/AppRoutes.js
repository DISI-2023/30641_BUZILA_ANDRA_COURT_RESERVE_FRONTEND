import Home from "./pages/home/Home";
import { PAGES_URL } from "./constants/PagesUrl";

const ApplicationRoutes = () => {
  return [
    {
      path: PAGES_URL.Home,
      element: <Home />,
    },
  ];
};

export default ApplicationRoutes;
