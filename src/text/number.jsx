import React from 'react';
import useStyles from './style';

function Number(props) {
  const { className, label, delimiter, part, precision, ...restProps } = props;
  const { styles, cx } = useStyles();

  const value = React.useMemo(() => {
    if (/\d/.test(label) === false) return label;

    let number = label;

    if (precision > -1) {
      const pre = 10 ** precision;
      number = Math.round(number * pre) / pre;
    }

    if (delimiter) {
      const reg = new RegExp(
        '\\d{1,' + part + '}(?=(\\d{' + part + '})+(\\.|$))',
        'gy',
      );
      number = (number + '').replace(reg, '$&' + delimiter);
    }

    return number;
  }, [label]);

  return (
    <span className={cx(styles, 'bc-text-number', className)} {...restProps}>
      {value}
    </span>
  );
}

Number.defaultProps = {
  delimiter: false,
  part: 3,
  precision: -1,
};

export default Number;
