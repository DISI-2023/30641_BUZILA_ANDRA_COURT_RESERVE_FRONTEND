import Home from "./pages/home/Home";
import { PAGES_URL } from "./constants/PagesUrl";

import Register from "./pages/register/Register";
import ReservationsPage from "./pages/reservations/reservations-page";
import AdminPage from "./pages/admin/admin-page";
import ResetPasswordPage from "./pages/resetpassword/reset-password-page";
import MyReservations from "./pages/my-reservations/MyReservations";

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
      path: PAGES_URL.Courts,
      element: <ReservationsPage />,
    },
    {
      path: PAGES_URL.Locations,
      element: <AdminPage />,
    },
    {
      path: PAGES_URL.ResetPassword,
      element: <ResetPasswordPage />,
    },
    {
      path: PAGES_URL.MyReservations,
      element: <MyReservations />,
    },
  ];
};

export default ApplicationRoutes;
