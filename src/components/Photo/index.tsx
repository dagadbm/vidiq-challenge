import React from 'react';
import useStore from '/src/store';
import { Photo } from '/src/types';

import classes from './styles.module.css';
import Favorite from '../Favorite';

function Photo({
  id,
  title,
  url,
  favorite,
}: Photo) {

  return (
    <div className={classes.photo}>
        <img src={url} className={classes.img} alt={title} />
        <div className={classes.favorite} onClick={setFavorite(id, !favorite)}>
          <Favorite favorite={favorite} />
        </div>
      </header>
    </div>
  )
}

export default Photo;
