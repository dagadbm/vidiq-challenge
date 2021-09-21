import React, { useState, useEffect, useRef } from 'react';
import usePagination from '/src/hooks/usePagination';
import useReactiveRef from '/src/hooks/useReactiveRef';
import useInfiniteScroll from '/src/hooks/useInfiniteScroll';
import useStore from '/src/store';
import { fetchPhotosSelector, getAllPhotosSelector, getFavoritePhotosSelector } from '/src/store/selectors';
import { Photo as PhotoType } from '/src/types';
import Photo from '../Photo';
import classes from './styles.module.css';


function PhotoGallery() {
  const fetchPhotos = useStore(fetchPhotosSelector);
  const allPhotos = useStore(getAllPhotosSelector);
  const favoritePhotos = useStore(getFavoritePhotosSelector);
  const [lastPhoto, setLastPhoto] = useReactiveRef();
  useInfiniteScroll(fetchPhotos, lastPhoto);

  const [favorite, setFavorite] = useState(false);
  const toggleFavorite = () => setFavorite(!favorite);

  const photos = favorite ? favoritePhotos : allPhotos;

  useEffect(() => {
    if (!allPhotos.length) {
      fetchPhotos();
    }
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.favorite} onClick={toggleFavorite}>
        Toggle Favorites
      </div>
      <div className={classes.gallery}>
        {photos.map(({ id }: PhotoType, idx: number) =>
          idx === photos.length -1
          ? <Photo key={id} ref={setLastPhoto} id={id} />
          : <Photo key={id} id={id} />
        )}
      </div>
    </div>
  )
}

export default PhotoGallery
