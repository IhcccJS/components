import React from 'react';
import Form from '../../common-form';
import Searcher from '../searcher';

function SearchForm({
  namespace,
  loading,
  form,
  foldAble,
  fold,
  defaultFold,
  onFoldChange,
  foldSize,
  grid,
  initialValues,
  trigger,
  wrapper,
  onSubmit,
  ...restProps
}) {
  return (
    <Searcher
      loading={loading}
      form={form}
      foldAble={foldAble}
      {...(fold === void 0 ? {} : { fold })}
      {...(defaultFold === void 0 ? {} : { defaultFold })}
      onFoldChange={onFoldChange}
      foldSize={foldSize}
      grid={grid}
      initialValues={initialValues}
      trigger={trigger}
      wrapper={wrapper}
      onSubmit={onSubmit}
    >
      <Form name="search" namespace={namespace} {...restProps} />
    </Searcher>
  );
}

export default SearchForm;
