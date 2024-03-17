import TaskBar from './task-bar';
import System from './system';
import Modaler from './modaler';
import useModaler from './useModaler';
import useModal from './useModal';
import { ModalContext, ContentContext } from './context';

Modaler.TaskBar = TaskBar;
Modaler.System = System;
Modaler.useModaler = useModaler;
Modaler.useModal = useModal;
Modaler.ModalContext = ModalContext;
Modaler.ContentContext = ContentContext;

export default Modaler;
