import { departmentSchema } from '../schemas/index'
import { getSchema } from '../util/normalize'
import { fromJS } from 'immutable'

// const datas = [ { id: 1, type: 'admin' }, { id: 2, type: 'user' } ];

const initialState = fromJS({
    entities : {},
    isLoading : true,
    user : {} 
})

export const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_REQUEST' :
      return {
        loading: true
      };
    case 'GET_ALL_SUCCESS' :
      return {
        items: action.users
      };
    case 'GET_ALL_FAILURE':
      return { 
        error: action.error
      };
    default:
      return state
  }
}