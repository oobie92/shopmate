import { fromJS } from 'immutable'


let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? fromJS({ loggedIn: false, user }) : {};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return state.set('user', 'laoding') 
    case 'LOGIN_SUCCESS':
      return state.set('loggingIn', true)
                  .set('user', action.user) 
    case 'LOGIN_FAILURE':
      return {};
    case 'LOGOUT':
      return {};
    default:
      return state
  }
}