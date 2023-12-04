import Access from './access';
import Lock from './lock';
import System from './system';
import useAccess from './useAccess';
import useLock from './useLock';
import AccessContext from './context';

Access.Context = AccessContext;
Access.System = System;
Access.useAccess = useAccess;
Access.Lock = Lock;
Access.useLock = useLock;

export default Access;
