import ReservationsPage from "./pages/reservations/reservations-page";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route
                exact
                path='/'
                element={<ReservationsPage />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
