export function getItems(items) {
    let quantity = 0
    items.map(item => {
      quantity += (item.quantity * 1)
    })
  
    return quantity
}