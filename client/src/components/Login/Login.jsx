import React, { useState, useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import closeEyes from "/closeEyes.png"; 
import openEyes from "/openEyes.png"; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                email,
                password
            });

            login(response.data.user, response.data.token);

        } catch (err) {
            if (err.response && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                setError('Login failed. Please check your credentials.');
            }
            console.error(err);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container-main">
            <div className="left-panel">
                <div className="illustration-container">
                    <img src="/logoST.png" alt="Logo" className="logo-img" />
                    <h1 className="illustration-title">Welcome</h1>
                    <p className="illustration-text">Power Up! Join the Circuit</p>
                </div>
            </div>
            <div className="right-panel">
                <div className="login-form-wrapper">
                    <h2 className="logo-text">Scroll-Through</h2>
                    <p className="welcome-text">Welcome back! Plug In to your account</p>

                    {error && <p className="error-text">{error}</p>}

                    <form onSubmit={handleSignIn} className="login-form">
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
                            <label htmlFor="password">Password</label>
                            <input
                                type={showPassword ? "text" : "password"} 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="toggle-password-btn">
                                <img src={showPassword ? openEyes : closeEyes} alt="Toggle password visibility"/>
                            </button>
                        </div>
                        <button type="submit" className="btn-signin">Sign In</button>
                    </form>
                    <div className="separator">
                        <span>or</span>
                    </div>
                    <p className="create-account-link">
                        Missing the spark? <Link to='/register'>Upgrade now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;