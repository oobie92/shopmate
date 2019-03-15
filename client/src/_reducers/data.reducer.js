import { departmentSchema } from '../schemas/index'
import { getSchema } from '../util/normalize'
import { fromJS } from 'immutable'

// const datas = [ { id: 1, type: 'admin' }, { id: 2, type: 'user' } ];

const initialState = fromJS({
    entities : {},
    isLoading : true,
    // departments : {} 
})

function departments(state = initialState, action){
    switch(action.type) {
        case 'DEPARTMENTS_REQUEST' : {
            return state.set('isLoading', true)
        }
        case 'DEPARMENTS_SUCCESS' : {
            const { entities } = getSchema(action.departments, departmentSchema)            
            return state.set('isLoading', false)
                        .set('departments', entities.departments)
                        .set('entities', entities)
        }
        default : 
            return state;
    }
}

export default departments 