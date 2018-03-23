import RootApiUrl from '../utils/RootApiUrl';

import {GET_ROOMS} from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case GET_ROOMS:
            return action.payload.data;

        default:
            return state;
    }
};

