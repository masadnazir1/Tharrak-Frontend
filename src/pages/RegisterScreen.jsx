import { useState } from "react";
import styles from "../styles/Login.module.css";
import RegisterService from "../services/RegisterService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      if (password != Confirmpassword) {
        alert("Passwords doesn't matched");
        setLoading(false);
        return;
      }
      const data = await RegisterService.Register(username, email, password);
      console.log("Registration Successful:", data);

      // Store token in localStorage (or use Redux/Context)
      localStorage.setItem("authToken", data.token);

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
        <button onClick={() => Navigate(-1)}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/271/271220.png"
            alt="Back"
          />
        </button>
      </div>

      <div className={styles.Middle}>
        <h2 className={styles.welcome}>
          Hello! Register to get <br />
          Started!
        </h2>
        <input
          type="text"
          placeholder="Enter your full name"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm password"
          value={Confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.Forget}>Forget Password?</button>

        <button
          className={styles.Login}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <button className={styles.Google}>Continue with Google</button>
      </div>

      <span className={styles.newaccount}>
        Already have an account?{" "}
        <button onClick={() => Navigate("/login")}>Login Now</button>
      </span>
    </div>
  );
};

export default Register;
