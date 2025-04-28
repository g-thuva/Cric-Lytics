import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSocialMedia = ({ socialMediaId }) => {
  const [formData, setFormData] = useState({ facebook: "", twitter: "", linkedin: "", email: "" });

  // Fetch social media data if socialMediaId is provided (for editing)
  useEffect(() => {
    if (socialMediaId) {
      axios
        .get(`http://localhost:5002/api/SocialLinks/${socialMediaId}`)
        .then(response => setFormData(response.data))
        .catch(error => console.error("Error fetching social media data", error));
    }
  }, [socialMediaId]);

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (create or update)
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const url = socialMediaId
        ? `http://localhost:5002/api/SocialLinks/${socialMediaId}`
        : "http://localhost:5002/api/SocialLinks";
      const method = socialMediaId ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Social Media details submitted successfully!");
        setFormData({ facebook: "", twitter: "", linkedin: "", email: "" });
      } else {
        alert("Failed to submit details.");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Error submitting details.");
    }
  };

  return (
    <div className="add_match_data">
      <p>{socialMediaId ? "Edit Social Media" : "Add Social Media"}</p>
      <main id="main" className="container">
        <div id="form-container">
          <div id="match-details" className="player-form">
            <h1>{socialMediaId ? "Edit Social Media Details" : "Social Media Details"}</h1>
            <form onSubmit={submitForm}>
              {["facebook", "twitter", "linkedin"].map((platform) => (
                <label key={platform}>
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  <input
                    type="url"
                    name={platform}
                    placeholder={`Enter ${platform} URL`}
                    required
                    value={formData[platform]}
                    onChange={handleChange}
                  />
                </label>
              ))}
              <label>
                E-mail
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <div className="button-container">
                <button type="submit" className="btn">
                  {socialMediaId ? "Update" : "Submit"} the form
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddSocialMedia;
