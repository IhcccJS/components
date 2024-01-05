import React from 'react';
import { useControllableValue } from 'ahooks';
import { useDefaultValue } from '../hooks';
import Wrapper from './search-wrapper';
import Form from '../../common-form';
import { Search } from '../../common-form/trigger';
import { isFunction } from '@ihccc/utils';

const GRID = {
  small: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 },
  middle: { xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 },
  large: { xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 },
};

const FOLDSIZE = {
  small: { xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 },
  middle: { xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 },
  large: { xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3 },
};

const Searcher = (props) => {
  const {
    loading,
    form,
    foldAble,
    // fold,
    // defaultFold,
    // onFoldChange,
    foldSize,
    grid,
    initialValues,
    trigger,
    wrapper,
    onSubmit,
    children,
  } = props;
  const [fold, setFold] = useControllableValue(props, {
    defaultValue: false,
    defaultValuePropName: 'defaultFold',
    valuePropName: 'fold',
    trigger: 'onFoldChange',
  });
  const [formInstance] = Form.useForm(form);

  const defaultValue = useDefaultValue(initialValues);

  const toggleFold = React.useCallback(() => {
    setFold((f) => !f);
  }, []);

  const handleFinish = React.useCallback((values) => {
    isFunction(onSubmit) && onSubmit(Object.assign({}, defaultValue, values));
  }, []);

  React.useEffect(() => {
    formInstance.resetFields();
  }, [defaultValue]);

  return React.createElement(
    wrapper,
    null,
    React.cloneElement(children, {
      form: formInstance,
      name: children?.props?.name || 'search',
      initialValues: defaultValue,
      max: fold ? foldSize : 0,
      grid,
      trigger: React.isValidElement(trigger) ? (
        React.cloneElement(trigger, {
          loading,
          foldAble: foldAble,
          fold: fold,
          onFold: toggleFold,
        })
      ) : (
        <Search
          full
          important
          loading={loading}
          foldAble={foldAble}
          fold={fold}
          onFold={toggleFold}
          style={{ textAlign: 'right' }}
        />
      ),
      onFinish: handleFinish,
    }),
  );
};

Searcher.defaultProps = {
  foldAble: false,
  foldSize: FOLDSIZE.middle,
  grid: GRID.middle,
  wrapper: Wrapper,
};

Searcher.GRID = GRID;
Searcher.FOLDSIZE = FOLDSIZE;

export default Searcher;
