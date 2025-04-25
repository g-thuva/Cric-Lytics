/*import "./MedicalForm.css";
import { useState } from "react";

const MedicalForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [pdf, setPdf] = useState(null);
  const [matchTypes, setMatchTypes] = useState({
    T20: false,
    Test: false,
    ODI: false,
  }); // Updated state for match types

  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleCheckboxChange = (e) => {
    setMatchTypes({
      ...matchTypes,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ userName, email, details, pdf, matchTypes });
  };

  const handleReset = () => {
    setUserName("");
    setEmail("");
    setDetails("");
    setPdf(null);
    setMatchTypes({ T20: false, Test: false, ODI: false });
  };

  return (
    <div className="medical-form">
      <div className="medical-container">
        <h2>Medical Submission</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">UserName:</label>
            <input
              type="text"
              id="playerCode"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email Id:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="details">Additional Details (Optional):</label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label htmlFor="pdf">Upload Medical PDF:</label>
            <input
              type="file"
              id="pdf"
              accept=".pdf"
              onChange={handleFileChange}
              required // Make PDF upload required
            />
          </div>

          <div>
            <label>Match Format:</label>
            <div className="match-format">
              <label>
                <input
                  type="checkbox"
                  name="T20"
                  checked={matchTypes.T20}
                  onChange={handleCheckboxChange}
                />
                T20
              </label>

              <label>
                <input
                  type="checkbox"
                  name="Test"
                  checked={matchTypes.Test}
                  onChange={handleCheckboxChange}
                />
                Test
              </label>

              <label>
                <input
                  type="checkbox"
                  name="ODI"
                  checked={matchTypes.ODI}
                  onChange={handleCheckboxChange}
                />
                ODI
              </label>
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalForm;

/*import "./MedicalForm.css";
import { useState } from "react";

const MedicalForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [pdf, setPdf] = useState(null);
  const [matchTypes, setMatchTypes] = useState({
    T20: false,
    Test: false,
    ODI: false,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }
    setPdf(file);
  };

  const handleCheckboxChange = (e) => {
    setMatchTypes({
      ...matchTypes,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !email || !pdf) {
      alert("Please fill all required fields and upload a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("details", details);
    formData.append("pdf", pdf);
    formData.append("matchT20", matchTypes.T20);
    formData.append("matchTest", matchTypes.Test);
    formData.append("matchODI", matchTypes.ODI);

    try {
      const response = await fetch("http://localhost:5000/api/medical/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert(result.message);
      handleReset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Please try again.");
    }
  };

  const handleReset = () => {
    setUserName("");
    setEmail("");
    setDetails("");
    setPdf(null);
    setMatchTypes({ T20: false, Test: false, ODI: false });
  };

  return (
    <div className="medical-form">
      <div className="medical-container">
        <h2>Medical Submission</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">UserName:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email Id:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="details">Additional Details (Optional):</label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label htmlFor="pdf">Upload Medical PDF:</label>
            <input
              type="file"
              id="pdf"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <div>
            <label>Match Format:</label>
            <div className="match-format">
              {Object.keys(matchTypes).map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    name={type}
                    checked={matchTypes[type]}
                    onChange={handleCheckboxChange}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalForm;   */

//import "./MedicalForm.css";
import { useState } from "react";
import axios from "axios";

const MedicalForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [pdf, setPdf] = useState(null);
  const [matchTypes, setMatchTypes] = useState({
    T20: false,
    Test: false,
    ODI: false,
  });

  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleCheckboxChange = (e) => {
    setMatchTypes({
      ...matchTypes,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("UserName", userName);
    formData.append("Email", email);
    formData.append("Details", details);
    formData.append("Pdf", pdf);
    formData.append("MatchTypes", JSON.stringify(matchTypes)); // Convert object to JSON string

    try {
      const response = await axios.post(
        "http://localhost:5000/api/medicalform",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      console.log("Response:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form.");
    }
  };

  return (
    <div className="medical-form">
      <div className="medical-container">
        <h2>Medical Submission</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">UserName:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email Id:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="details">Additional Details (Optional):</label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label htmlFor="pdf">Upload Medical PDF:</label>
            <input
              type="file"
              id="pdf"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <div>
            <label>Match Format:</label>
            <div className="match-format">
              <label>
                <input
                  type="checkbox"
                  name="T20"
                  checked={matchTypes.T20}
                  onChange={handleCheckboxChange}
                />
                T20
              </label>

              <label>
                <input
                  type="checkbox"
                  name="Test"
                  checked={matchTypes.Test}
                  onChange={handleCheckboxChange}
                />
                Test
              </label>

              <label>
                <input
                  type="checkbox"
                  name="ODI"
                  checked={matchTypes.ODI}
                  onChange={handleCheckboxChange}
                />
                ODI
              </label>
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={() => window.location.reload()}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalForm;
