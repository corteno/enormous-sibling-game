import {combineReducers} from 'redux';
import UserReducer from './reducer_user';
import RoomsReducer from './reducer_rooms';
import RoomReducer from './reducer_room';


const rootReducer = combineReducers({
    user: UserReducer,
    rooms: RoomsReducer,
    room: RoomReducer
});

export default rootReducer;
