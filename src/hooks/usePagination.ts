import { useState, useEffect } from 'react';
import { useFetchPhotos } from '/src/store';

export const STATUS = {
  idle: 'idle',
  inProgress: 'inProgress',
  success: 'success',
  error: 'error',
};
const FIRST = 10;

function usePagination() {
  const fetchPhotos = useFetchPhotos();
  const [after, setAfter] = useState(0);
  const [status, setStatus] = useState(STATUS.idle);

  const fetchMore = async () => {
    setStatus(STATUS.inProgress);
    try {
      await fetchPhotos(FIRST, after);
      setStatus(STATUS.success);
    } catch (e) {
      console.error(e);
      setStatus(STATUS.error);
    }
    setAfter(after + FIRST);
  };

  return {
    fetchMore,
    status,
  };
}

export default usePagination;
