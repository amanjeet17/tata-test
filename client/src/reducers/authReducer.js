import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER, GET_ALL_USERS, SET_PROFILE ,RESET_PROFILE} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  profiles: [],
  profile: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_ALL_USERS:
      return {
        ...state,
        profiles: action.payload
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };

    case RESET_PROFILE:
      return {
        ...state,
        profile: {}
      };

    default:
      return state;
  }
}
