import Transition from './transition';
import Link from './link';
import useHistory from './useHistory';
import { TransitionContext } from './context';

export { Transition, Link, useHistory, TransitionContext };

const TransitionRoute = {
  Transition,
  Link,
  useHistory,
  Context: TransitionContext,
};

export default TransitionRoute;
