
export function openModal(items = []){
    return{
      type: "OPEN_MODAL",
      payload: {
        items
      }
    }
  }
  
  export function closeModal(){
    return{
      type: "CLOSE_MODAL"
    }
  
  }