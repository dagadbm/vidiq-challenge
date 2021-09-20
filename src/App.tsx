import React, { useEffect } from 'react';
import usePagination from './hooks/usePagination';
import { useGetAllPhotos } from '/src/store';
import Photo from './components/Photo';

function App() {
  const { fetchMore, status } = usePagination();
  const photos = useGetAllPhotos();

  useEffect(fetchMore, []);

  return (
    <div>
    {photos.map((photo) =>
      <Photo key={photo.id} id={photo.id} />
    )}
    </div>
  )
}

export default App
