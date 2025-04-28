import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          tokenId: credentialResponse.credential,
        }
      );
      console.log("Backend response:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Google login successful");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error sending token to backend:", error.response.data);
      alert("Google login failed");
    }
  };

  const handleGoogleFailure = () => {
    console.log("Google Login Failed");
    alert("Google login failed");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login to SplitPal</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px", width: "250px" }}
        />
        <br />
        <button
          onClick={handleLogin}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Login
        </button>
      </div>

      <h3>OR</h3>

      {/* Google Login button */}
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
    </div>
  );
}

export default Login;
