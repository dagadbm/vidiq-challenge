import { useCallback, useState } from 'react'

// adapted from the following references
// https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
// rhttps://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
function useReactiveRef() {
  const [node, setNode] = useState(null);
  const ref = useCallback(node => setNode(node), []);
  return [node, ref];
}

export default useReactiveRef;
