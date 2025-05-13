import React, { useState } from 'react';
import '../css/Signin.css';
import { Eye, EyeOff } from 'lucide-react'; // Icons for password visibility
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    const [formData, setFormData] = useState({
        clubName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // For handling errors
    const [successMessage, setSuccessMessage] = useState(''); // For handling success

    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(formData.password)) {
            setErrorMessage("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5015/api/auth/register', formData);

            setSuccessMessage('Registration successful!.');
            setTimeout(() => {
                navigate('/login');
            }, 1500);

            setErrorMessage('');
            console.log(response.data);
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : "An error occurred during registration.");
            setSuccessMessage('');
        }
    };


    return (
        <div className="login-container">
            <div className="background-wrapper">
                <div className="background-image"></div>
            </div>

            <div className="login-box">
                <h2>Club Registration</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Show error message */}
                {successMessage && <div className="success-message">{successMessage}</div>} {/* Show success message */}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="clubName">Club Name</label>
                        <input
                            id="clubName"
                            name="clubName"
                            type="text"
                            placeholder="Enter your club name"
                            value={formData.clubName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span className="icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </span>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-wrapper">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <span className="icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </span>
                        </div>
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
