import { useState } from "react";
import styles from "../styles/Login.module.css";
import LoginService from "../services/LoginService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import for ESM

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await LoginService.login(email, password);
      console.log("Login Successful:", data);

      // Store token in localStorage (or use Redux/Context)
      localStorage.setItem("authToken", data.token);
      const tokendata = localStorage.getItem("authToken");
      if (tokendata) {
        const decodedToken = jwtDecode(tokendata);
        console.log("Decoded JWT:", decodedToken);
        localStorage.setItem("id", decodedToken.user.id);
      }

      // Redirect to another page (example: dashboard)
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.LoginContainer}>
      <div className={styles.head}>
        <button onClick={() => navigate(-1)}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/271/271220.png"
            alt="Back"
          />
        </button>
      </div>

      <div className={styles.Middle}>
        <h2 className={styles.welcome}>
          Welcome Back! Glad <br />
          to see you again!
        </h2>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.Forget}>Forget Password?</button>

        <button
          className={styles.Login}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button className={styles.Google}>Continue with Google</button>
      </div>

      <span className={styles.newaccount}>
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")}>Register Now</button>
      </span>
    </div>
  );
};

export default Login;
