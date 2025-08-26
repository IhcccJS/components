import React from 'react';
import { TourContext } from './context';

function useTour() {
  const { setOpen } = React.useContext(TourContext);
  return { setOpen };
}

export default useTour;
