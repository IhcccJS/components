import TaskBar from './task-bar';
import System from './system';
import Popuper from './modaler';
import useModaler from './useModaler';
import useModal from './useModal';

Popuper.TaskBar = TaskBar;
Popuper.System = System;
Popuper.usePopuper = useModaler;
Popuper.usePopup = useModal;
/** @deprecated 使用 usePopuper 替代 */
Popuper.useModaler = useModaler;
/** @deprecated 使用 usePopup 替代 */
Popuper.useModal = useModal;

export default Popuper;
