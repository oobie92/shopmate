import { fromJS } from 'immutable'

const initialState = fromJS({
    items : [],
    quantity : 0
})

const shopingCart = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ITEMS_SUCCESS' :
      return state.set('quantity', action.payload.item.length)
                  .set('items', action.payload.item)
    case 'ADD_ITEM_SUCCESS':
    console.log(state.get('items'))
    console.log(state.get('quantity'))
    console.log(action)
      // return state.updateIn(['items'], arr => arr.push(action.payload.item))
      return state.set('items', action.payload.item)
                  .set('quantity', action.payload.quantity)
    case 'DELETE_ITEM_SUCCESS':
      return state.set('quantity', action.payload.item.length)
                  .set('items', action.payload.item)
    default:
      return state
  }
}

export default shopingCart