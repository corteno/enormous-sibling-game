import jwt from 'jsonwebtoken';

export const login = (user) => {
    localStorage.setItem('user', createToken(user));
    refreshPage();
};

export const getUser = () => {
    if(isLoggedIn()){
        return jwt.decode(localStorage.getItem('user'));
    }

};

const refreshPage = () => {
    window.location.reload();
};

export const isLoggedIn = () => {
    return !!localStorage.getItem('user');
};

const createToken = (data) => {
    let token;
    token = jwt.sign({
        data
    }, 'secret', {expiresIn: '1h'});

    return token;
};