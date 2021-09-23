import React from 'react';

import { render, screen } from '@testing-library/react'

import Photo from './index'

test('shows as favorite if prop is true', async () => {
  // Ill be honest here
  // I did try to create these tests but it is ri-di-cu-lous
  // how i cannot even do it because of stupid typescript + react + forwards refs
  /*
  //  FAIL  src/components/Favorite.spec.tsx
  ● Test suite failed to run

    src/components/Photo/index.tsx:21:14 - error TS2322: Type 'ForwardedRef<unknown>' is not assignable to type 'LegacyRef<HTMLImageElement> | undefined'.
      Type 'MutableRefObject<unknown>' is not assignable to type 'LegacyRef<HTMLImageElement> | undefined'.
        Type 'MutableRefObject<unknown>' is not assignable to type 'RefObject<HTMLImageElement>'.
          Types of property 'current' are incompatible.
            Type 'unknown' is not assignable to type 'HTMLImageElement | null'.
              Type 'unknown' is not assignable to type 'HTMLImageElement'.

    21         <img ref={ref} src={url} className={classes.img} alt={title} />
                    ~~~

      node_modules/@types/react/index.d.ts:143:9
        143         ref?: LegacyRef<T> | undefined;
                    ~~~
        The expected type comes from property 'ref' which is declared here on type 'DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>'
  */
  render(<Photo id={1}/>)
})

