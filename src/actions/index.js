export const SET_USERNAME = 'set_username';
export const SET_USER = 'set_user';

export const setUsername = (username) => {
    return {
        type: SET_USERNAME,
        payload: username
    }
};

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
};