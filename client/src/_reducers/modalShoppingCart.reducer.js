import { fromJS } from 'immutable'

const inicialState = fromJS({
  visible: false,
  items: []
})

function modal(state = inicialState, action){
  switch(action.type){
    case 'OPEN_MODAL':
      return state.merge({
        "visible" : true,
        "items": action.payload.items
      })
    case 'CLOSE_MODAL':
      return state.set("visible", false)
    default:
      return state
  }
}

export default modal
