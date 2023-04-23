import Home from "./pages/home/Home";
import { PAGES_URL } from "./constants/PagesUrl";

import Register from "./pages/register/Register";
import ReservationsPage from "./pages/reservations/reservations-page";
import AdminPage from "./pages/admin/admin-page";

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
    {
        path: PAGES_URL.Reservations,
        element: <ReservationsPage />,
    },
    {
        path: PAGES_URL.Locations,
        element: <AdminPage />,
    },
  ];
};

export default ApplicationRoutes;
