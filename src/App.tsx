import React, { useState, useEffect, useRef } from 'react';
import usePagination from './hooks/usePagination';
import useReactiveRef from './hooks/useReactiveRef';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import useStore from '/src/store';
import { fetchPhotosSelector, getAllPhotosSelector } from '/src/store/selectors';
import { Photo as PhotoType } from '/src/types';
import PhotoGallery from './components/PhotoGallery';


function App() {
  return (
    <PhotoGallery />
  )
}

export default App
