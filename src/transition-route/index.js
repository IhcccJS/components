import Transition from './animation/provider';
import Page from './animation/page';
import Link from './link';
import useHistory from './useHistory';
import { TransitionContext } from './context';

export { Transition, Link, useHistory, TransitionContext };

Transition.Page = Page;
Transition.Link = Link;
Transition.useHistory = useHistory;
Transition.Context = TransitionContext;

export default Transition;
