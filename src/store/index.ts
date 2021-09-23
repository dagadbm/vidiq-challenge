import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import produce from 'immer';
import { PhotoId, Photo, Photos } from '../types';

export interface Store {
  photos: Photos,
  after: PhotoId,
  fetchPhotos: (first: number) => void;
  toggleFavorite: (id: PhotoId) => void;
};

const useStore = create<Store>(devtools(persist(
  (set, get) => ({
    photos: {},
    after: 0,
    async fetchPhotos(first: number = 5, after: PhotoId = get().after) {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_start=${after}&_limit=${first}`
      ).then(response => response.json());
        set(produce(state => {
          state.after += first;
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
)));

export default useStore;
