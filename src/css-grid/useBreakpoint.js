import { useState, useEffect } from 'react';
import throttle from 'lodash/throttle';

function getMedia() {
  const matchs = {
    xs: window.matchMedia('(max-width: 576px)').matches,
    sm: window.matchMedia('(min-width: 576px)').matches,
    md: window.matchMedia('(min-width: 768px)').matches,
    lg: window.matchMedia('(min-width: 992px)').matches,
    xl: window.matchMedia('(min-width: 1200px)').matches,
    xxl: window.matchMedia('(min-width: 1400px)').matches,
  };
  return ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'].filter((key) => matchs[key]);
}

function useBreakpoint() {
  const [media, setMedia] = useState(getMedia());

  const onResize = throttle(() => setMedia(getMedia()), 200);

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return media;
}

export default useBreakpoint;
