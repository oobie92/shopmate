import { handleResponse } from "../util/handleResponse";


export const getItems = () => {

    return Promise.resolve(
        localStorage.getItem('shoppingCart') 
        ? JSON.parse(localStorage.getItem('shoppingCart')) 
        : [])
}


export const addItem = (item) => {

    let shoppingCart = []

    if(localStorage.getItem('shoppingCart')){
        shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
    } 
    
    if(shoppingCart.find((itemCart) =>{ return itemCart.product_id===item.product_id}) === undefined){
        shoppingCart.push(item)  
    } else {
        shoppingCart.map(itemCart => {
            if(itemCart.product_id===item.product_id){
                itemCart.quantity += item.quantity
            }
        })
    }
    
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
    return Promise.resolve(shoppingCart)
    // : 

    // const requestOptions = {
    //     method : 'POST',
    //     headers : {'Content-Type' : 'application/json'},
    //     body : item.JSON.stringify(item)
    // }
    
    // return fetch(`url/method`, requestOptions).then(handleResponse)
}

export const deleteItem = (item) => {

    let shoppingCart = []

    if(localStorage.getItem('shoppingCart')){
        shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
    } 
    
    
    shoppingCart = shoppingCart.filter((value, index, arr) => {
        if(item.product_id!==value.product_id)
        return value
    })  


    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
    return Promise.resolve(shoppingCart === null ? [] : shoppingCart)
    // : 

    // const requestOptions = {
    //     method : 'POST',
    //     headers : {'Content-Type' : 'application/json'},
    //     body : item.JSON.stringify(item)
    // }
    
    // return fetch(`url/method`, requestOptions).then(handleResponse)
}