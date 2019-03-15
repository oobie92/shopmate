import { loginService, logoutService, registerService } from '../_services/user.service';

export const login = (username, password) => {
    return dispatch => {
        dispatch(request({ username }));

        loginService(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: 'LOGIN_REQUEST', user } }
    function success(user) { return { type: 'LOGIN_SUCCESS', user } }
    function failure(error) { return { type: 'LOGIN_FAILURE', error } }
}

export const logout = () => {
    logoutService();
    return { type: 'LOGOUT' };
}

export const register = (user) => {
    return dispatch => {
        dispatch(request(user));

        registerService(user)
            .then(
                user => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: 'REGISTER_REQUEST', user } }
    function success(user) { return { type: 'REGISTER_SUCCESS', user } }
    function failure(error) { return { type: 'REGISTER_FAILURE', error } }
}