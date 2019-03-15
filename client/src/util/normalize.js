import { normalize } from 'normalizr'

export const getSchema = (api, schema) => {
    return normalize(api, schema )
}