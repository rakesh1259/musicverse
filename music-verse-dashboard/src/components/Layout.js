import React, { useState } from "react";
import { Layout } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  UserOutlined,
  SoundOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;

const DashboardLayout = ({ children }) => {
  const location = useLocation(); // Use this to get the current route
  const [activeKey, setActiveKey] = useState(location.pathname);

  const handleNavClick = (key) => {
    setActiveKey(key);
  };

  return (
    <Layout className="min-h-screen bg-transparent">
      <Header className="flex justify-between items-center px-6 w-full header">
        <div className="text-white text-2xl font-bold flex items-center">
          <img src="/logo.png" className="w-10 mix-blend-difference" alt="Logo" />
          MusicVerse
        </div>
        <div className="flex space-x-10">
          <Link
            to="/artists"
            className={`flex items-center text-white ${activeKey === "/artists" ? "border-b-2 border-white" : ""}`}
            onClick={() => handleNavClick("/artists")}
          >
            <UserOutlined className="mr-2" />
            Artists
          </Link>

          <Link
            to="/albums"
            className={`flex items-center text-white ${activeKey === "/albums" ? "border-b-2 border-white" : ""}`}
            onClick={() => handleNavClick("/albums")}
          >
            <AppstoreOutlined className="mr-2" />
            Albums
          </Link>

          <Link
            to="/songs"
            className={`flex items-center text-white ${activeKey === "/songs" ? "border-b-2 border-white" : ""}`}
            onClick={() => handleNavClick("/songs")}
          >
            <SoundOutlined className="mr-2" />
            Songs
          </Link>
        </div>
      </Header>
      <Content className="p-4">{children}</Content>
    </Layout>
  );
};

export default DashboardLayout;
