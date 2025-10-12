import createComponent from '../create-component';

import FormView from './plugins/FormView';
import FormTransformColumns from './plugins/FormTransformColumns';
import FormGroup from './plugins/Group';
import FormStep from './plugins/FormStep';
// import FormAutoAlignment from './plugins/AutoAlignment';
import FormRelation from './plugins/Relation';
import ButtonSubmit from './plugins/ButtonSubmit';

const Form = createComponent([
  // FormAutoAlignment,
  FormRelation,
  FormTransformColumns,
  ButtonSubmit,
  FormGroup,
  FormView,
  FormStep,
]);

export default Form;
