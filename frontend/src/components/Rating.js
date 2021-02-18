import React from 'react';

const Rating = ({ value, text, starColor = '#f8e825' }) => {
  const stars = [1, 2, 3, 4, 5].map((index) => (
    <i
      key={index}
      style={{ color: starColor }}
      className={
        value >= index
          ? 'fas fa-star'
          : value >= index - 0.5
          ? 'fas fa-star-half-alt'
          : 'far fa-star'
      }
    ></i>
  ));
  return (
    <div className='rating'>
      <span>{stars}</span> <span>{text && text}</span>
    </div>
    /*<div className='rating'>
      <span>
        <i
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>{text && text}</span>
    </div>*/
  );
};

export default Rating;
