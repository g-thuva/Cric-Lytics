const StarRating = ({ runs, wickets }) => {
  // Calculate rating using the formula: (Runs + Wickets) / 2
  const rating = ((runs + wickets) / 50);

  // Convert rating from 0-100 scale to 0-5 scale
  const starRating = Math.round((rating / 100) * 5);

  // Create array of 5 stars
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= starRating) {
      // Filled star
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>
      );
    } else {
      // Empty star
      stars.push(
        <span key={i} className="star empty">
          ☆
        </span>
      );
    }
  }

  return (
    <div className="star-rating" title={`${rating.toFixed(2)}/100`}>
      {stars}
      <span className="rating-number">({rating.toFixed(2)})</span>
    </div>
  );
};

export default StarRating;