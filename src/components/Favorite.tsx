import React from 'react';

type Props = {
  favorite: boolean,
  className?: string
};

function Favorite({
  favorite
}: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="24" height="24"
      fill={favorite ? 'red' : 'black'}
      data-testid={favorite ? 'favorite-on' : 'favorite-off'}
    >
      <path d="M12 4.25C8.85-1.15 0 .42 0 7.19 0 11.85 5.57 16.62 12 23c6.43-6.38 12-11.15 12-15.8 0-6.8-8.88-8.31-12-2.95z"/>
    </svg>
  );
}

export default Favorite;
