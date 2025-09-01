import Transition from './transition';
import Page from './transition/page';
import Link from './link';
import useHistory from './useHistory';
import { TransitionContext } from './context';

export { Transition, Link, useHistory, TransitionContext };

const TransitionRoute = {
  Transition,
  Page,
  Link,
  useHistory,
  Context: TransitionContext,
};

export default TransitionRoute;
