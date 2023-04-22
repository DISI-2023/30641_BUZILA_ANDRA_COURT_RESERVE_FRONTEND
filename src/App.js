import "./App.css";
import Menu from "./components/Menu.js";
import { Route, Routes } from "react-router-dom";
import ApplicationRoutes from "./AppRoutes";
import { useMemo } from "react";

function App() {
  const appRoutes = useMemo(() => {
    return ApplicationRoutes();
  }, []);

  return (
    <div className="App">
      <Menu />
      <Routes>
        {appRoutes.map((route, index) => {
          const { element, requireAuth, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
