import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform((error) => {
  console.log('error', error);
  return new Meteor.Error(400, error.message);
});
