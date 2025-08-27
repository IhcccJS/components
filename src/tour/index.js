import TourProvider from './provider';
import useTour from './useTour';
import TourList from './list';
import { TourContext } from './context';

export { TourProvider, useTour, TourList, TourContext };

const Tour = {
  Provider: TourProvider,
  List: TourList,
  useTour,
  Context: TourContext,
};

export default Tour;
