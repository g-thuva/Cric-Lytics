import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      HomePage
      <div>
        <button
          className="match-history-buton"
          onClick={() => navigate("/match-history")}
        >
          Button 1
        </button>
        <button
          className="medical-form-buton"
          onClick={() => navigate("/medical-form")}
        >
          Button 2
        </button>
        <button
          className="addnews-btn"
          onClick={() => navigate("/addnews-form")}
        >
          Button 3
        </button>
        <button className="test-btn" onClick={() => navigate("/match-results")}>
          Button 4
        </button>

        <button className="match-form" onClick={() => navigate("/match-form")}>
          Button 5
        </button>
      </div>
    </div>
  );
};

export default HomePage;
