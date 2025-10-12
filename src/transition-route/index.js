import Transition from './animation/provider';
import Page from './animation/page';
import Link from './link';
import useHistory from './useHistory';
import { TransitionContext } from './context';

export { Transition, Link, useHistory, TransitionContext };

const TransitionRoute = {
  Provider: Transition,
  Page,
  Link,
  useHistory,
  Context: TransitionContext,
};

export default TransitionRoute;
