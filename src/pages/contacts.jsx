import React, { useState } from 'react';
import axios from 'axios';
import cantect from './images/cantect.png';  // Adjust the image path as needed

function Contacts() {
    const [formData, setFormData] = useState({
        cname: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Form data being submitted:", formData); // Log form data before sending
            const response = await axios.post("http://localhost:5002/api/contacts", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Response received:", response); // Log the response

            if (response.status === 200) {
                alert("Message sent successfully!");
                setFormData({ cname: "", email: "", message: "" });
            } else {
                alert("Failed to send message.");
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("Error sending message.");
        }
    };

    return (
        <div className="overlay pt-100 pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 d-flex align-items-center">
                        <div className="contact-info1">
                            <h2 className="contact-title">Have Any Questions?</h2>
                            <p>
                                Got something on your mind? Don't hesitate to ask! Whether it's about smashing sixes,
                                coding cool projects, or gaming thrills, I'm all ears. Cricket, tech, or just a random thought—let’s talk!
                                Drop your question, and let’s keep the conversation going!
                            </p>
                            <ul className="contact-info">
                                <li>
                                    <div className="info-left"><i className="fas fa-mobile-alt" /></div>
                                    <div className="info-right"><h4>+11223344550</h4></div>
                                </li>
                                <li>
                                    <div className="info-left"><i className="fas fa-at" /></div>
                                    <div className="info-right"><h4>info@example.com</h4></div>
                                </li>
                                <li>
                                    <div className="info-left"><i className="fas fa-map-marker-alt" /></div>
                                    <div className="info-right"><h4>1243 Street, New Chandigarh, INDIA</h4></div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-6 d-flex align-items-center">
                        <img src={cantect} alt="cantect" />
                    </div>

                    <div className="col-lg-6 d-flex align-items-center">
                        <div className="contact-form">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                name="cname" 
                                                className="form-control" 
                                                placeholder="Enter Your Name *" 
                                                required
                                                value={formData.cname} 
                                                onChange={handleChange} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input 
                                                type="email" 
                                                name="email" 
                                                className="form-control" 
                                                placeholder="Enter Your Email *" 
                                                required
                                                value={formData.email} 
                                                onChange={handleChange} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <textarea 
                                                rows={4} 
                                                name="message" 
                                                className="form-control" 
                                                placeholder="Enter Your Message *" 
                                                required
                                                value={formData.message} 
                                                onChange={handleChange} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="button" type="submit">Send Us</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacts;
