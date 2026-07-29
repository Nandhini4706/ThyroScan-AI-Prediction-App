import React, { useState } from "react";
import "../styles/auth.css";
import {
  FaUserMd,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authApi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });
      console.log(response);

      // Save JWT
      localStorage.setItem("token", response.data.token
      );
      localStorage.setItem("name", response.data.name);

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-section">
          <FaUserMd className="logo-icon" />

          <h1>Thyroid AI</h1>

          <p>Smart Thyroid Assessment & AI Health Assistant</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <p className="bottom-text">
            Don't have an account?{" "}
            <Link to="/register">
              <span>Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;