import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import ReservationsPage from "./pages/reservations/reservations-page";
import AdminPage from "./pages/admin/admin-page";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/reservations" element={<ReservationsPage />} />
            <Route exact path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
