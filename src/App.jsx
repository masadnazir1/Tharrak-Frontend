import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import CreatePostPage from "./pages/CreatePostPage";
import FriendsPage from "./pages/FriendsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginScreen"; // Example
import Register from "./pages/RegisterScreen";
import Tabs from "./components/BottomTabs/Tabs";
import CreateDeskTop from "./pages/CreatDesktop";
import SplashScreen from "./pages/SplashScreen";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function AppContent() {
  const location = useLocation();
  const [full, setFull] = useState(false);

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/create" ||
      location.pathname === "/signup"
    ) {
      setFull(true);
    }
  }, [location.pathname]);

  // Define routes where Tabs should be hidden
  const hiddenRoutes = ["/login", "/signup", "/create"];

  return (
    <>
      <div className={full ? "Full" : "MainApp"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/CreateDeskTop" element={<CreateDeskTop />} />
        </Routes>
      </div>

      {/* Show Tabs only if current route is NOT in hiddenRoutes */}
      {!hiddenRoutes.includes(location.pathname) && <Tabs />}
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <Router>{showSplash ? <SplashScreen /> : <AppContent />}</Router>;
}

export default App;
