export function fetchPhotosSelector(state) {
  return state.fetchPhotos;
}
export function toggleFavoriteSelector(state) {
  return state.toggleFavorite;
}
export function getAllPhotosSelector(state) {
  return Object.values(state.photos);
}
export function getFavoritePhotosSelector(state) {
  return Object.values(state.photos).filter(photo => photo.favorite);
}
