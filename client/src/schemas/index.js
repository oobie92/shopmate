import { schema } from 'normalizr'

const department = new schema.Entity("departments", {} , {
        idAttribute: "department_id",
        processStrategy: (value, parent, key) => ({...value, department: parent.id})
})

export const departmentSchema = new schema.Array(department)