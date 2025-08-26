import React from 'react';
import { TransitionContext } from './context';

function useHistory() {
  const { pathname, visited, navigation } = React.useContext(TransitionContext);

  return { pathname, visited, navigation };
}

export default useHistory;
