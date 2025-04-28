import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
  const handleLoginSuccess = async (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          token: credentialResponse.credential,
        }
      );

      console.log("Backend response:", res.data);

      // Save your app's token (optional for now)
      localStorage.setItem("token", res.data.token);

      // Redirect user to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error sending token to backend:", error.response.data);
    }
  };

  const handleLoginFailure = () => {
    console.log("Google Login Failed");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login to SplitPal</h1>

      {/* Google Login button */}
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
}

export default Login;
