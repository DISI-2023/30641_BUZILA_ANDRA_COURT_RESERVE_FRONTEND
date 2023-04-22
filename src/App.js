import "./App.css";
import Menu from "./components/Menu.js";
import { Route, Routes } from "react-router-dom";
import ApplicationRoutes from "./AppRoutes";
import React, { useState, createContext, useMemo } from "react";

export const AppContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const appRoutes = useMemo(() => {
    return ApplicationRoutes();
  }, []);

  return (
    <AppContext.Provider
      value={{ isAdmin, isLoggedIn, setIsLoggedIn, setIsAdmin }}
    >
      <div className="App">
        <Menu />
        <Routes>
          {appRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
