//ADD NEWS

import "./MedicalForm.css";
import { useState } from "react";

const AddNews = () => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [highlight, setHighlight] = useState("");
  const [pic, setPic] = useState("");
  const [describtion, setDescribtion] = useState("");
  const [image, setImage] = useState(null);
  const [newsType, setNewsType] = useState("");
  const [matchnum, setMatchNum] = useState("");
  // Updated state for news types

  const handleAddNews = () => {
    alert("Add News button clicked! Implement logic here.");
    // You can add logic here to add new news sections dynamically
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  /*const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
        setImage(file);
    } else {
        alert("Please select a valid image file.");
    }
};*/
  const handlePicChange = (e) => {
    setPic(e.target.files[0]);
  };

  const handleRadioChange = (e) => {
    setNewsType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ date, title, describtion, image, newsType, highlight, pic });
  };

  const handleReset = () => {
    setDate("");
    setTitle("");
    setDescribtion("");
    setImage(null);
    setNewsType("");
  };

  return (
    <div className="medical-form">
      <div className="medical-container">
        <h2>News Update</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-buttons">
            <button
              className="add-matches-btn"
              onClick={handleAddNews}
              type="button"
            >
              Add News
            </button>
          </div>

          <div>
            <label htmlFor="date">Select Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="news-type">
            <label>
              <input
                type="radio"
                name="newsType"
                value="matchNews"
                onChange={handleRadioChange}
                checked={newsType === "matchNews"}
              />
              Match News
            </label>

            <label>
              <input
                type="radio"
                name="newsType"
                value="socialNews"
                onChange={handleRadioChange}
                checked={newsType === "socialNews"}
              />
              Social News
            </label>
          </div>
          {newsType === "matchNews" && (
            <div>
              <label htmlFor="additionalInput">Match Id:</label>
              <input
                type="text"
                id="matchnum"
                value={matchnum}
                onChange={(e) => setMatchNum(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Upload Images:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required // Make PDF upload required
            />
          </div>
          <div>
            <label htmlFor="describtion">Describtion :</label>
            <textarea
              id="details"
              value={describtion}
              onChange={(e) => setDescribtion(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="highlight">Highlight:</label>
            <textarea
              id="highlight"
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="pic">Picture:</label>
            <input
              type="file"
              id="pic"
              accept="image/*"
              onChange={handlePicChange}
              required // Make PDF upload required
            />
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

export default AddNews;
