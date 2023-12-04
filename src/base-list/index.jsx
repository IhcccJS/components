import BaseList from './base-list';
import Searcher from './searcher';
import Updater from './updater';
import Profiler from './profiler';
// import ColumnsEditor from './columns-editor';
import RowSelectionAble from './row-selection-able';
import useList from './hooks/useList';

BaseList.Searcher = Searcher;
BaseList.Updater = Updater;
BaseList.Profiler = Profiler;
// BaseList.ColumnsEditor = ColumnsEditor;
BaseList.RowSelectionAble = RowSelectionAble;
BaseList.useList = useList;

export { Searcher, Updater, Profiler, RowSelectionAble };

export default BaseList;
