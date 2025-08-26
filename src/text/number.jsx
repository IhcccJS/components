import React from 'react';
import clsx from 'clsx';
// import useStyles from './style';
import './style/index.less';

function Number(props) {
  const { className, label, delimiter, part = 3, precision = -1, scale = 1, prefix, unit, ...restProps } = props;
  // const { styles, cx } = useStyles();

  const value = React.useMemo(() => {
    if (/\d/.test(label) === false) return label;

    let number = label * scale;

    if (!number) return label;

    if (precision > -1) {
      const pre = 10 ** precision;
      number = Math.round(number * pre) / pre;
    }

    if (delimiter) {
      const reg = new RegExp('\\d{1,' + part + '}(?=(\\d{' + part + '})+(\\.|$))', 'gy');
      number = (number + '').replace(reg, '$&' + delimiter);
    }

    return number;
  }, [label]);

  return (
    <span className={clsx('bc-text-number', className)} {...restProps}>
      {prefix && <span className={'bc-text-number-prefix'}>{prefix}</span>}
      {value}
      {unit && <span className={'bc-text-number-unit'}>{unit}</span>}
    </span>
  );
}

export default Number;
