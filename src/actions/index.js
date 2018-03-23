import axios from 'axios';
import RootApiUrl from '../utils/RootApiUrl';

export const SET_USERNAME = 'set_username';
export const SET_USER = 'set_user';
export const GET_ROOMS = 'get_rooms';
export const GET_ROOM = 'get_room';

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

export const getRooms = () => {
    const request = axios.get(`${RootApiUrl}/rooms`);

    return {
        type: GET_ROOMS,
        payload: request
    }
};

export const getRoom = (room) => {
    const request = axios.post(`${RootApiUrl}/${room.id}`, {password: room.password});
    return {
        type: GET_ROOM,
        payload: request
    }
};