import {addItem as addItemService, getItems as getItemsService, deleteItem as deleteItemService} from '../_services/shoppingCart.service'

export const getItems = () => {
  return dispatch => {
    dispatch(request())

    getItemsService().then(
      items => dispatch(success(items)),

      error => dispatch(failure(error))
    )
  }

  function request(){ return {type: "GET_ITEMS_REQUEST"}}
  function success(item){ return {type: "GET_ITEMS_SUCCESS", payload : {item} }}
  function failure(error){ return {type: "GET_ITEMS_FAILURE", payload : error }}
}

export const addItem = (item) => {
    return dispatch => {
      dispatch(request())

      addItemService(item).then(
        resp => dispatch(success(item, resp)),

        error => dispatch(failure())
      )

    }
    function request(){ return {type: "ADD_ITEM_REQUEST"}}
    function success(item, quantity){ return {type: "ADD_ITEM_SUCCESS", payload : { item: quantity, quantity : quantity.length }  }}
    function failure(error){ return {type: "ADD_ITEM_FAILURE", payload : error }}
  }
  
  export const deleteItem = (item) => {

    return dispatch => {
      dispatch(request())

      deleteItemService(item).then(
        resp => dispatch(success(resp)),

        error => dispatch(failure())
      )

    }
    function request(){ return {type: "DELETE_ITEM_REQUEST"}}
    function success(resp){ return {type: "DELETE_ITEM_SUCCESS", payload : {item : resp}  }}
    function failure(error){ return {type: "DELETE_ITEM_FAILURE", payload : error }}
  
}