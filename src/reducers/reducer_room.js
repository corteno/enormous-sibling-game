import {GET_ROOM} from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_ROOM:
            return action.payload.data;

        default:
            return state;
    }
};

