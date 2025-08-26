import React from 'react';
import ButtonList from '@/components/@comp/button-list';
import GridFloating from './grid-floating';
import GridTable from './grid-table';
import Grid from './grid';
import './index.less';
import './editor.less';

// const template = {
//   area: [
//     {  }
//   ]
// };

let i = 1;
function getItems(n = 20) {
  const list = [];
  while (list.length < n) list.push({ key: `${i++}` });
  return list;
}

const defalutList = getItems();

const MAX_COLUMN = 24;
const MAX_ROWSPAN = 99;

const isPrimary = (action, name) => (action === name ? 'primary' : 'default');

const buttons = [
  {
    key: 'actionName',
    tip: '点击取消操作',
    props: ({ action }) => ({ type: 'text', children: !action ? `无操作` : `当前操作：${action}` }),
  },
  {
    key: 'floating',
    group: 'mode',
    props: ({ mode }) => ({ type: isPrimary(mode, 'floating'), children: '浮动' }),
  },
  {
    key: 'table',
    group: 'mode',
    props: ({ mode }) => ({ type: isPrimary(mode, 'table'), children: '表格' }),
  },
  {
    key: 'grid',
    group: 'mode',
    props: ({ mode }) => ({ type: isPrimary(mode, 'grid'), children: '网格' }),
  },
  { key: 'reset', props: { children: '重置' } },
  { key: 'push', props: { children: '添加' } },
  { key: 'minus', props: ({ action }) => ({ type: isPrimary(action, 'minus'), shape: 'round', children: '删除' }) },
  { key: 'cAdd', group: 'column', props: ({ column }) => ({ disabled: column >= MAX_COLUMN, children: '加列' }) },
  { key: 'cMinus', group: 'column', props: ({ column }) => ({ disabled: column <= 1, children: '减列' }) },
  {
    key: 'xAdd',
    group: 'item',
    props: ({ action }) => ({ type: isPrimary(action, 'xAdd'), shape: 'round', children: '加宽' }),
  },
  {
    key: 'xMinus',
    group: 'item',
    props: ({ action }) => ({ type: isPrimary(action, 'xMinus'), shape: 'round', children: '减宽' }),
  },
  {
    key: 'yAdd',
    group: 'item',
    props: ({ action }) => ({ type: isPrimary(action, 'yAdd'), shape: 'round', children: '加高' }),
  },
  {
    key: 'yMinus',
    group: 'item',
    props: ({ action }) => ({ type: isPrimary(action, 'yMinus'), shape: 'round', children: '减高' }),
  },
  {
    key: 'floatLeft',
    group: 'align',
    hidden: ({ mode }) => mode !== 'floating',
    props: ({ action }) => ({ type: isPrimary(action, 'floatLeft'), shape: 'round', children: '左浮动' }),
  },
  {
    key: 'floatRight',
    group: 'align',
    hidden: ({ mode }) => mode !== 'floating',
    props: ({ action }) => ({ type: isPrimary(action, 'floatRight'), shape: 'round', children: '右浮动' }),
  },
  {
    key: 'floatCancel',
    group: 'align',
    hidden: ({ mode }) => mode !== 'floating',
    props: ({ action }) => ({ type: isPrimary(action, 'floatCancel'), shape: 'round', children: '取消浮动' }),
  },
  {
    key: 'output',
    props: { children: '导出' },
  },
];

const eventMap = {
  floating: ({ setMode }) => setMode('floating'),
  table: ({ setMode }) => setMode('table'),
  grid: ({ setMode }) => setMode('grid'),
  actionName: ({ setAction }) => setAction(''),
  minus: ({ setAction }) => setAction('minus'),
  xAdd: ({ setAction }) => setAction('xAdd'),
  xMinus: ({ setAction }) => setAction('xMinus'),
  yAdd: ({ setAction }) => setAction('yAdd'),
  yMinus: ({ setAction }) => setAction('yMinus'),
  floatLeft: ({ setAction }) => setAction('floatLeft'),
  floatRight: ({ setAction }) => setAction('floatRight'),
  floatCancel: ({ setAction }) => setAction('floatCancel'),
};

// https://grid.layoutit.com/
function GridEditor({}) {
  const [option] = React.useState({ size: 40, gap: 8 });
  const [list, setList] = React.useState(defalutList);
  const [mode, setMode] = React.useState('grid');
  const [column, setColumn] = React.useState(4);
  const [action, setAction] = React.useState();

  const reset = React.useCallback(() => {
    i = 1;
    setList(getItems());
    setMode('grid');
    setColumn(4);
    setAction();
  }, []);

  const push = React.useCallback(() => {
    setList((list) => list.concat(getItems(1)));
  }, []);

  const cAdd = React.useCallback(() => {
    setColumn((c) => Math.min(c + 1, MAX_COLUMN));
  }, []);

  const cMinus = React.useCallback(() => {
    setColumn((c) => Math.max(c - 1, 1));
  }, []);

  const output = () => {
    console.log('----------- ✨ 导出数据 ✨ -----------');
    console.log(JSON.stringify(list));
    console.log('⏱ 导出时间：', new Date().toLocaleString());
    console.log('----------- ✨ 导出数据 ✨ -----------');
  };

  const addAttr = React.useCallback((index, attr, target) => {
    setList((list) => {
      if (!list[index][attr]) list[index][attr] = 1;
      if (typeof target.val === 'number') {
        list[index][attr] += target.val;
        if (target.val > 0) list[index][attr] = Math.min(target.max, list[index][attr]);
        if (target.val < 0) list[index][attr] = Math.max(target.min, list[index][attr]);
      } else {
        list[index][attr] = target.val;
      }
      if (list[index][attr] === target.default) delete list[index][attr];
      return [...list];
    });
  }, []);

  const handleItem = (index) => {
    if (action === 'minus') {
      setList((l) => l.filter((_, i) => i !== index));
    }
    if (action === 'xAdd') {
      addAttr(index, 'colSpan', { val: 1, max: column });
    }
    if (action === 'xMinus') {
      addAttr(index, 'colSpan', { val: -1, min: 1, default: 1 });
    }
    if (action === 'yAdd') {
      addAttr(index, 'rowSpan', { val: 1, max: MAX_ROWSPAN });
    }
    if (action === 'yMinus') {
      addAttr(index, 'rowSpan', { val: -1, min: 1, default: 1 });
    }
    if (action === 'floatLeft') {
      addAttr(index, 'float', { val: 'left' });
    }
    if (action === 'floatRight') {
      addAttr(index, 'float', { val: 'right' });
    }
    if (action === 'floatCancel') {
      addAttr(index, 'float', { val: '', default: '' });
    }
  };

  return (
    <div className="styled">
      <ButtonList
        data={{ mode, setMode, column, action, setAction }}
        buttons={buttons}
        eventMap={{ ...eventMap, reset, push, cAdd, cMinus, output }}
        style={{ margin: '20px 0' }}
      />
      {/* float 模式 */}
      {mode === 'floating' && <GridFloating template={list} column={column} option={option} onItemClick={handleItem} />}
      {/* table 模式 */}
      {mode === 'table' && <GridTable template={list} column={column} option={option} onItemClick={handleItem} />}
      {mode === 'grid' && (
        <Grid template={list} column={column} option={option} onItemClick={handleItem}>
          {/* <span className="no">{item.key}</span>
          <span className="info">colSpan : {item.colSpan || 1}</span>
          <span className="info">rowSpan : {item.rowSpan || 1}</span>
          <span className="info">{item.gridArea || '-'}</span> */}
        </Grid>
      )}
    </div>
  );
}

export default GridEditor;
