import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import CreatePostPage from "./pages/CreatePostPage";
import FriendsPage from "./pages/FriendsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginScreen";
import Register from "./pages/RegisterScreen";
import Tabs from "./components/BottomTabs/Tabs";
import CreateDeskTop from "./pages/CreatDesktop";
import SplashScreen from "./pages/SplashScreen";
import Dashboard from "./pages/Dashboard";
import CommentsPage from "./pages/CommentsPage";
import { isTokenExpired } from "./utils/authCheck";

import "./App.css";

function AppContent() {
  const location = useLocation();
  const [full, setFull] = useState(false);

  useEffect(() => {
    if (isTokenExpired()) {
      console.log("Token expired! Logging out...");
      localStorage.removeItem("authToken"); // Remove expired token
      localStorage.removeItem("id"); // Remove user ID

      // 🔴 Fix: Prevent redirect loop
      if (location.pathname !== "/login") {
        window.location.href = "/login"; // Redirect to login ONLY if not already there
      }
    }

    // Handle the "Full" UI state
    if (["/login", "/create", "/signup"].includes(location.pathname)) {
      setFull(true);
    } else {
      setFull(false);
    }
  }, [location.pathname]); // Runs when pathname changes

  // Define routes where Tabs should be hidden
  const hiddenRoutes = ["/login", "/signup", "/create", "/comments"];

  // Hide tabs for dynamic "/comments/:postId/:username" route
  const hideTabs = hiddenRoutes.includes(location.pathname);

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
          <Route
            path="/comments/:postId/:username"
            element={<CommentsPage />}
          />
        </Routes>
      </div>

      {/* Show Tabs only if current route is NOT in hiddenRoutes */}
      {!hideTabs && <Tabs />}
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(
    window.location.pathname === "/" // Show splash only if user is on "/"
  );

  useEffect(() => {
    if (showSplash) {
      // Hide splash screen after 3 seconds
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return <Router>{showSplash ? <SplashScreen /> : <AppContent />}</Router>;
}

export default App;
