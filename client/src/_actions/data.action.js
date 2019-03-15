import { departments as departmentsService } from '../_services/data.service'

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

