import columnRegister from './column';
import formRegister from './form';
import lazyEsFormRegister from './form/lazy-es';
import lazyLibFormRegister from './form/lazy-lib';
import renderRegister from './render';

export default {
  column: columnRegister,
  form: formRegister,
  lazyEsForm: lazyEsFormRegister,
  lazyLibForm: lazyLibFormRegister,
  render: renderRegister,
};
