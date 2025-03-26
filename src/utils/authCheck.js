import { jwtDecode } from "jwt-decode";

export const isTokenExpired = () => {
  const tokendata = localStorage.getItem("authToken");
  if (!tokendata) return true; // No token found, treat as expired

  try {
    const decodedToken = jwtDecode(tokendata);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    return decodedToken.exp < currentTime; // If exp is less than now, token is expired
  } catch (error) {
    console.error("Invalid Token:", error);
    return true; // Treat invalid tokens as expired
  }
};

// export default isTokenExpired;
