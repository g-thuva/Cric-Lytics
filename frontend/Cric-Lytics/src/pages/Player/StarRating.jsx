

const StarRating = ({ runs, wickets }) => {
  const rating = ((runs + wickets) / 50);
  const starRating = Math.round((rating / 100) * 5);
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= starRating) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>
      );
    } 
    else {
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