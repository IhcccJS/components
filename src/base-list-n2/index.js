import listCore from './core';

import useListLayout from './plugins/useListLayout';
import useDemoHello from './plugins/useDemoHello';
import useDemoCount from './plugins/useDemoCount';

export default listCore([useListLayout, useDemoHello, useDemoCount]);
