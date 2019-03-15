import { authHeader } from '../util/authHeader'

export const loginService = (username, password, getHash = true) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, getHash})
    };

    return fetch(`https://oobie92.com/api/customers/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

export const logoutService = () => {
    localStorage.removeItem('user');
}

export const registerService = (user) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`url/register`, requestOptions).then(handleResponse);
}

export const update = (user) => {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },/////review
        body: JSON.stringify(user)
    };

    return fetch(`url/users/${user.id}`, requestOptions).then(handleResponse);;
}

export const _delete = (id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`url/users/${id}`, requestOptions).then(handleResponse);
}

export const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logoutService();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}