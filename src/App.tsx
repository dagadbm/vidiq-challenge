import React, { useEffect } from 'react';
import useStore from '/src/store';
import Photo from './components/Photo';

function App() {
  const fetchPhotos = useStore(state => state.fetchPhotos);
  const photos = useStore(state => Object.values(state.photos));
  useEffect(() => {
    fetchPhotos(10, 0);
  });

  return (
    <div>
    {photos.map((photo) =>
      <Photo key={photo.id} id={photo.id} />
    )}
    </div>
  )
}

export default App
