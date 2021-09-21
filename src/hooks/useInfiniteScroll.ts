import { useEffect } from 'react';

function useInfiniteScroll(
  callback,
  node,
  options = {
  root: null,
  threshold: 0.5,
}) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting) {
        callback();
      }
    }, options);
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [callback, node]);
}

export default useInfiniteScroll;
