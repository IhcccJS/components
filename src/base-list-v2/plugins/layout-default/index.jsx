import React from 'react';
import ButtonList from '../../../button-list';
import useStyles from './styles';

function LayoutRender({
  className,
  search,
  list,
  buttons,
  data,
  buttonConfig,
}) {
  const { styles, cx } = useStyles();

  return (
    <div className={cx(styles, 'bc-default-layout', className)}>
      {search && (
        <div className={cx(styles, 'bc-default-layout-head')}>{search}</div>
      )}
      <div className={cx(styles, 'bc-default-layout-top')}>
        <ButtonList
          access={false}
          type="button"
          layout="end"
          {...buttonConfig}
          buttons={buttons}
          data={data}
        />
      </div>
      <div className={cx(styles, 'bc-default-layout-body')}>{list}</div>
    </div>
  );
}

function layout({ TYPE, plugins }) {
  return {
    key: 'defaultLayout',

    type: TYPE.ROOT,

    root: LayoutRender,
  };
}

export default layout;
