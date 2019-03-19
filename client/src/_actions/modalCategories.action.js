
export function openModal(categories = []){
    return{
      type: "OPEN_CATEGORIES_MODAL",
      payload: {
        categories
      }
    }
  }
  
  export function closeModal(){
    return{
      type: "CLOSE_CATEGORIES_MODAL"
    }
  
  }