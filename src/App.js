import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from "./homepage/homepage";

function App() {
  return (
      <div>
        <Router>
          <div>
            <Routes>
              <Route
                  exact
                  path='/'
                  element={<Homepage />}
              />
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
