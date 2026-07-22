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
import { register } from "../services/authApi";

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;
    }

    try {

      setLoading(true);

      await register({

        name,

        email,

        password

      });

      alert("Registration Successful!");

      navigate("/login");

    } catch (error) {

      alert(error.response?.data?.message || "Registration Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <div className="logo-section">

          <FaUserMd className="logo-icon" />

          <h1>Create Account</h1>

          <p>
            Join Thyroid AI Assessment
          </p>

        </div>

        <form onSubmit={handleRegister}>

          <div className="input-group">

            <FaUserMd className="input-icon" />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text":"password"}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <span
              className="eye"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>

          </div>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              type={showConfirmPassword ? "text":"password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
            />

            <span
              className="eye"
              onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>

          </div>

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
          </button>

          <p className="bottom-text">

            Already have an account?

            <Link to="/login">

              <span> Login</span>

            </Link>

          </p>

        </form>

      </div>

    </div>

  );

};

export default Register;