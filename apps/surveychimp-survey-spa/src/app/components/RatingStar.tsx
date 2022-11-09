import React from 'react';
import ReactStars from 'react-stars';
import { useNavigate } from 'react-router-dom';

const RatingComponent = () => {
    const navigate = useNavigate();
  const ratingChanged = (newRating: number) => {
    console.log(newRating);
    navigate('/thankYou')
  };

  return (
    <ReactStars
      count={5}
      half={false}
      onChange={ratingChanged}
      size={24}
      color2={'#ffd700'}
    />
  );
};

export default RatingComponent