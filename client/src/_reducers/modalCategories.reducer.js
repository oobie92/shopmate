import { fromJS } from 'immutable'

const inicialState = fromJS({
  visible: false,
  categories: []
})

function modal(state = inicialState, action){
  switch(action.type){
    case 'OPEN_CATEGORIES_MODAL':
      return state.merge({
        "visible" : true,
        "categories": action.payload.categories
      })
    case 'CLOSE_CATEGORIES_MODAL':
      return state.set("visible", false)
    default:
      return state
  }
}

export default modal
