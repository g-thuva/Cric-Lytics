import React, { useState } from "react";
import axios from "axios";

const SponsorshipData = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        companyWebsite: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!formData.companyName || !formData.companyWebsite) {
            setError("Please fill in all the fields.");
            return;
        }

        setLoading(true);

        try {
            // Ensure the correct URL for your ASP.NET Core backend API
            const response = await axios.post("http://localhost:5002/api/sponsorship1", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 201) {
                alert("Form Submitted Successfully!");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setError("Form submission failed! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add_match_data">
            <p>Add Sponsorship Data</p>
            <main id="main" className="container">
                <div id="form-container">
                    <div id="match-details" className="player-form">
                        <h1>Sponsorship Details</h1>
                        <form onSubmit={submitForm}>
                            <label>Company Name *
                                <input 
                                    type="text" 
                                    name="companyName" 
                                    placeholder="Enter Company Name" 
                                    required 
                                    onChange={handleChange} 
                                    value={formData.companyName}
                                />
                            </label>
                            <label>Company Website *
                                <input 
                                    type="url" 
                                    name="companyWebsite" 
                                    placeholder="Enter Website URL" 
                                    required 
                                    onChange={handleChange} 
                                    value={formData.companyWebsite}
                                />
                            </label>

                            {error && <p className="error-message">{error}</p>}
                            <div className="button-container">
                                <button type="submit" className="btn" disabled={loading}>
                                    {loading ? "Submitting..." : "Submit the form"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SponsorshipData;
