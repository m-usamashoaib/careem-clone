import React, { useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StarRating = ({ rating, setRating }) => {
  //State to Change the color of stars on hover
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((_star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FontAwesomeIcon
              className=" cursor-pointer transla"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              icon={faStar}
              onMouseEnter={() => {
                setHover(ratingValue);
              }}
              onMouseLeave={() => {
                setHover(null);
              }}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
