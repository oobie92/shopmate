import { fromJS } from 'immutable'
import { getItems } from '../util/getItems'

const initialState = fromJS({
    items : [],
    quantity : 0
})

const shopingCart = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ITEMS_SUCCESS' :
      return state.set('quantity', getItems(action.payload.item))
                  .set('items', action.payload.item)
    case 'ADD_ITEM_SUCCESS':
      return state.set('items', action.payload.item)
                  .set('quantity', getItems(action.payload.item))
    case 'DELETE_ITEM_SUCCESS':
      return state.set('quantity', getItems(action.payload.item))
                  .set('items', action.payload.item)
    default:
      return state
  }
}

export default shopingCart