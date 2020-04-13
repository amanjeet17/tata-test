import { combineReducers } from 'redux';
import authReducer from './authReducer';


import mealsReducer from './mealsReducer';

export default combineReducers({
  auth: authReducer,
  meals: mealsReducer
});
