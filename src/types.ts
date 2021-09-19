export type PhotoId = number;
export type Photo = {
  id: PhotoId,
  title: string,
  url: string,
  favorite: boolean,
};
export type Photos = {
  [id: PhotoId]: Photo
};
