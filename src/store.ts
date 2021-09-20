import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import { PhotoId, Photo, Photos } from './types';

export interface Store {
  photos: Photos,
  fetchPhotos: (first: number, after: PhotoId) => void;
  toggleFavorite: (id: PhotoId) => void;
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
          data.forEach((photo: Photo) => {
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
    toggleFavorite(id: PhotoId) {
      set(produce(state => {
        state.photos[id].favorite = !get().photos[id].favorite;
      }));
    },
  }),
  {
    name: 'vidiq-challenge-store',
  }
));

// store specific hooks
export function useFetchPhotos() {
  return useStore((state: Store) => state.fetchPhotos);
}
export function useToggleFavorite() {
  return useStore((state: Store) => state.toggleFavorite);
}
export function useGetAllPhotos() {
  return useStore((state: Store) => Object.values(state.photos));
}
export function useGetFavoritePhotos() {
  return useStore((state: Store) => Object.values(state.photos).filter(photo => photo.favorite));
}

export default useStore;
