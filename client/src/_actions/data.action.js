import { 
  departments as departmentsService,
  categoriesByDepartment as categoriesByDepartmentService
} from '../_services/data.service'

export const departments = () => {
  return dispatch => {
    dispatch(request())
    
    departmentsService()
      .then(
        departments => dispatch(success(departments)),

        error => dispatch(failure(error))
      )
  }

  function request(){ return { type : 'DEPARTMENTS_REQUEST'} }
  function success(departments){ return { type : 'DEPARMENTS_SUCCESS', departments} }
  function failure(error){ return { type : 'DEPARTMENTS_FAILURE', error} }

}

export const categoriesByDepartment = id => {
  return dispatch => {
    dispatch(request())
    
    categoriesByDepartmentService(id)
      .then(
        categories => dispatch(success(categories)),

        error => dispatch(failure(error))
      )
  }

  function request(){ return { type : 'CATEGORIES_REQUEST'} }
  function success(categories){ return { type : 'CATEGORIES_SUCCESS', categories} }
  function failure(error){ return { type : 'CATEGORIES_FAILURE', error} }

}
