import React, { useCallback } from 'react';
import useStore from '/src/store';
import { PhotoId } from '/src/types';

import classes from './styles.module.css';
import Favorite from '../Favorite';

type Props = {
  id: PhotoId
};
function Photo({
  id
}: Props) {
  const setFavorite = useStore(state => state.setFavorite);
  const { url, title, favorite } = useStore(useCallback(state => state.photos[id], [id]));

  const onFavoriteClick = () => setFavorite(id, !favorite);
  return (
    <div className={classes.photo}>
      <img src={url} className={classes.img} alt={title} />
      <div className={classes.overlay} onClick={onFavoriteClick}>
        <Favorite favorite={favorite} className={classes.favorite} />
      </div>
    </div>
  );
}

export default Photo;