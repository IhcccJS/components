import React from 'react';
import { Popover } from 'antd';
import { isObject } from '@ihccc/utils';
import Formater from '../../../select-v2/formater';
import Feature from '../../../feature';
import useStyles from './style';

function TagList({ popover, data, max, options }) {
  const { styles, cx } = useStyles();

  const { list, extra } = React.useMemo(() => {
    if (data.length > max) {
      return {
        list: data.slice(0, max),
        extra: data.slice(max),
      };
    } else {
      return { list: data, extra: null };
    }
  }, [data, max]);

  const tagList = list.map((value) => {
    if (!options) {
      return (
        <Feature
          mode="tag"
          {...(isObject(value) ? value : { label: value, key: value })}
        />
      );
    } else {
      return <Formater options={options} value={value} key={value} />;
    }
  });

  if (!!extra) {
    const extraTagList = extra.map((value) => {
      if (!options) {
        return (
          <Feature
            mode="tag"
            {...(isObject(value) ? value : { label: value, key: value })}
          />
        );
      } else {
        return <Formater options={options} value={value} key={value} />;
      }
    });

    return (
      <React.Fragment>
        {tagList}
        <Popover content={extraTagList} {...popover}>
          <span className={cx(styles, 'bc-tag-more')}>+ {extra.length}</span>
        </Popover>
      </React.Fragment>
    );
  }

  return tagList;
}

export default TagList;
