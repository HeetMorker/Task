import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Clear previous errors
    setSuccess(""); // Clear previous success messages

    try {
      // API call to register user
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        password,
        email,
        name
      });

      setSuccess("Registration successful!");
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
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
                    <img src="assets/img/logo1.png" alt="" className="mb-5" width={150} />
                  </span>
                </a>
              </div>

              {/* Display error message if exists */}
              {error && <p style={{ color: 'red' }}>{error}</p>}

              {/* Display success message if exists */}
              {success && <p style={{ color: 'green' }}>{success}</p>}

              <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
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
                    <label className="form-label" htmlFor="password">Password</label>
                    <a href="#">
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
                <div className="mb-3">
                  <button className="btn btn-primary d-grid w-100" type="submit">Register</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;
