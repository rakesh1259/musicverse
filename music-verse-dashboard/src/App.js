import { ConfigProvider, theme } from "antd";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Albums from "./components/Albums";
import Artists from "./components/Artists";
import Home from "./components/Home";
import DashboardLayout from "./components/Layout";
import Songs from "./components/Songs";
function App() {
  return (
    <Router>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <div className="gradient" />
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/songs" element={<Songs />} />
          </Routes>
        </DashboardLayout>
      </ConfigProvider>
    </Router>
  );
}

export default App;
