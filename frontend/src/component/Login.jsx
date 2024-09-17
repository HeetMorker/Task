import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error or success messages
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          username,
          password,
        }
      );

      // Save the token in localStorage or sessionStorage based on remember me
      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
      } else {
        sessionStorage.setItem("token", response.data.token);
      }

      setSuccess("Login successful!");
      navigate("/"); // Redirect after successful login
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">
                <a href="login" className="app-brand-link gap-2">
                  <span className="app-brand-logo demo">
                    <img
                      src="assets/img/logo1.png"
                      alt=""
                      className="mb-5"
                      width={150}
                    />
                  </span>
                </a>
              </div>

              <form
                id="formAuthentication"
                onSubmit={handleSubmit}
                className="mb-3"
              >
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="text"
                    name="username"
                    value={username}
                    placeholder="Enter your Username"
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <a href="auth-forgot-password-basic.html">
                      <small>Forgot Password?</small>
                    </a>
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      aria-describedby="password"
                      required
                    />
                    <span className="input-group-text cursor-pointer">
                      <i className="bx bx-hide"></i>
                    </span>
                  </div>
                </div>
                {/* Display error message if exists */}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {/* Display success message if exists */}
                {success && <p style={{ color: "green" }}>{success}</p>}

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember-me"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />

                    <label className="form-check-label" htmlFor="remember-me">
                      {" "}
                      Remember Me{" "}
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <button
                    className="btn btn-primary d-grid w-100"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
