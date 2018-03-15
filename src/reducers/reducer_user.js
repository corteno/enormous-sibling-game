import {SET_USER, SET_USERNAME} from "../actions";
import {login} from '../utils/AuthService';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                username: action.payload.username,
                color: action.payload.color
            };

        case SET_USERNAME:
            let user = {
                username: action.payload,
                color: getColor()
            };
            login(user);

            return {
                ...state,
                username: user.username,
                color: user.color
            };

        default:
            return state;

    }
};

const getColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

const colors = [
    '#B71C1C', '#880E4F', '#4A148C', '#311B92',
    '#1A237E', '#0D47A1', '#004D40', '#1B5E20',
    '#827717', '#F57F17', '#E65100', '#3E2723'
];