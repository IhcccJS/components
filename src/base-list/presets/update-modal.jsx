import React from 'react';
import Form from '../../common-form';
import Updater from '../updater';

function UpdateModal({ namespace, formProps, ...modalProps }) {
  return (
    <Updater {...modalProps}>
      <Form name="update" namespace={namespace} {...formProps} />
    </Updater>
  );
}

export default UpdateModal;
