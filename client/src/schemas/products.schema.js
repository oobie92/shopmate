import { schema } from 'normalizr'

const product = new schema.Entity("product", {} , {
    idAttribute: "product_id",
    processStrategy: (value, parent, key) => ({...value, product: parent.id})
})

export const productSchema = new schema.Entity("products", {
    "rows": new schema.Array(product)
  })
