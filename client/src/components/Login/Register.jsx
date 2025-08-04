import React, { useState } from "react";
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import closeEyes from "/closeEyes.png"; 
import openEyes from "/openEyes.png"; 

function Register() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword1, setShowPassword1] = useState(false); 
    const [showPassword2, setShowPassword2] = useState(false); 

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(''); 

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                email,
                userName,
                password
            });
            console.log(response.data.msg); 
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data.msg) {
                setError(err.response.data.msg); 
            } else {
                setError('Registration failed. Please try again.');
            }
            console.error(err);
        }
    };

    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };

    return (
        <div className="login-container-main">
            <div className="right-panel">
                <div className="login-form-wrapper">
                    <h2 className="logo-text">Scroll-Through</h2>
                    <p className="welcome-text">New to the circuit? Get Wired In</p>

                    {error && <p className="error-text">{error}</p>}

                    <form onSubmit={handleSignUp} className="login-form">
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="userName">User Name</label>
                            <input
                                type="text"
                                id="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type={showPassword1 ? "text" : "password"} 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        <button type="button" onClick={togglePasswordVisibility1} className="toggle-password-btn">
                            <img src={showPassword1 ? openEyes : closeEyes} alt="Toggle password visibility"/>
                        </button>
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type={showPassword2 ? "text" : "password"} 
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        <button type="button" onClick={togglePasswordVisibility2} className="toggle-password-btn">
                            <img src={showPassword2 ? openEyes : closeEyes} alt="Toggle password visibility"/>
                        </button>
                        </div>
                        <button type="submit" className="btn-signup">Sign Up</button>
                    </form>
                </div>
            </div>
            <div className="left-panel">
                <div className="illustration-container">
                    <img src="/logoST.png" alt="Logo" className="logo-img" />
                    <h1 className="illustration-title">Welcome {userName || 'Guest'}</h1>
                    <p className="illustration-text">
                        Power Up ! Join the Circuit
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;