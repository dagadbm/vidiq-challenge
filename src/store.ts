import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import { PhotoId, Photo, Photos } from './types';

export interface Store {
  photos: Photos,
  fetchPhotos: (first: number, after: PhotoId) => void;
  setFavorite: (id: PhotoId, favorite: Boolean) => void;
  getAllPhotos: () => Photo[];
  getFavoritePhotos: () => Photo[];
};

const useStore = create<Store>(persist(
  (set, get) => ({
    photos: {},
    // inspired by graphQL pagination
    // give me the first 'first' elements after element 'after'
    async fetchPhotos(first: number, after: PhotoId) {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_start=${after || 0 }&_limit=${first}`
      ).then(response => response.json());
      set(produce(state => {
        const newPhotos = data.forEach((photo: Photo) => {
          // only update state if photo didnt exist before
          // for this case the data will never become stale since it never changes
          if (!state.photos.hasOwnProperty(photo.id)) {
            state.photos[photo.id] = {
              id: photo.id,
              title: photo.title,
              url: photo.url,
              favorite: false,
            };
          }
        });
      }));
    },
    setFavorite(id: PhotoId, favorite: Boolean) {
      set(produce(state => {
        state.photos[id].favorite = favorite;
      }));
    },
    getAllPhotos() {
      return Object.values(get().photos);
    },
    getFavoritePhotos() {
      return Object.values(get().photos).filter(photo => photo.favorite);
    },
  }),
  {
    name: 'vidiq-challenge-store',
  }
));

export default useStore;
