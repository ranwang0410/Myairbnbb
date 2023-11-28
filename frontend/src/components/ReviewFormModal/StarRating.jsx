import { useState } from "react";
import './StarRating.css'
const StarRating = ({ setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [currentRating, setCurrentRating] = useState(0);

    const handleMouseEnter = (rating) => {
      setHoverRating(rating);
    };

    const handleMouseLeave = () => {
      setHoverRating(0);
    };

    const handleClick = (rating) => {
      setCurrentRating(rating);
      setRating(rating);
    };

    const renderStar = (index) => {
      const isFilled = hoverRating ? index <= hoverRating : index <= currentRating;

      return (
        <span
          key={index}
          className={`star ${isFilled ? 'filled' : ''}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        >
          &#9733;
        </span>
      );
    };

    return (
      <div>
        {[1, 2, 3, 4, 5].map(renderStar)}
      </div>
    );
  };

  export default StarRating;
