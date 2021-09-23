import React, { useCallback } from 'react';
import useStore from '../../store';
import { toggleFavoriteSelector } from '../../store/selectors';
import { PhotoId } from '../../types';

import classes from './styles.module.css';
import Favorite from '../Favorite';

type Props = {
  id: PhotoId
};

export default React.forwardRef<HTMLImageElement, Props>(
  function Photo({ id }: Props, ref) {
    const toggleFavorite = useStore(toggleFavoriteSelector);
    const { url, title, favorite } = useStore(useCallback(state => state.photos[id], [id]));

    const onFavoriteClick = () => toggleFavorite(id);
    return (
      <div className={classes.photo}>
        <img ref={ref} src={url} className={classes.img} alt={title} />
        <div className={classes.overlay} onClick={onFavoriteClick}>
          <Favorite favorite={favorite} className={classes.favorite} />
        </div>
      </div>
    );
  }
);
