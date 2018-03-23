import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {setUser, getRooms} from "../actions";
import {getUser} from '../utils/AuthService';

import ListItem from './listItem';
import Header from './header';
import Modal from './modal';
import Notification from './notification';

import './rooms.css'
import Plus from '../img/plus.svg';
import Socket from '../utils/Socket';


class Rooms extends Component {

    state = {
        isModalActive: false,
        isModalClosing: false,
        isRoomPrivate: false,
        roomName: '',
        roomPassword: '',
        notifContent: ''
    };


    renderList = () => {
        return _.map(this.props.rooms, (room) => {
            return (
                <ListItem isPrivate={room.password !== ''} key={room.id}
                          onClick={() => this.onRoomClick(room.id)}>
                    <div className='col'>
                        <p className='rooms-list-item-title'>{room.name}</p>
                        <p className='rooms-list-item-subtitle'>{room.owner}</p>
                    </div>
                </ListItem>
            );
        })

    };

    onRoomClick = (id) => {
        this.props.history.push(`/${id}`);
    };

    toggleCreateRoom = () => {
        if (this.state.isModalActive) {
            this.setState({isModalClosing: true}, () => {
                setTimeout(() => {
                    this.setState({isModalActive: false, isModalClosing: false});
                }, 200)
            });
        } else {
            this.setState({isModalActive: !this.state.isModalActive});
        }


    };

    closeModal = () => {

    };

    onInputChange = (e) => {
        switch (e.target.name) {
            case('room-name'):
                this.setState({roomName: e.target.value});
                break;

            case('room-password'):
                this.setState({roomPassword: e.target.value});
                break;

            case ('room-is-private'):
                this.setState({isRoomPrivate: e.target.checked}, () => {
                    if (!this.state.isRoomPrivate) this.setState({roomPassword: ''});
                });
                break;

            default:
                break;
        }
    };

    onSubmit = (e) => {
        e.preventDefault();

        Socket.emit("create-room", {
            roomName: this.state.roomName,
            owner: this.props.user,
            isPrivate: this.state.isRoomPrivate,
            roomPassword: this.state.roomPassword
        }, (answer) => {
            if (answer.success) {
                console.log(answer.success);
            } else {
                this.notification.displayNotification({
                    content: answer.message,
                    type: 'error'
                });
            }


        });


        //Write the rest of the logic
    };

    componentDidMount() {
        this.props.getRooms();
        this.notification = this.refs.notification;


        this.props.setUser(getUser().data);

        Socket.emit('subscribe', {
            username: getUser().data.username
        }, (answer) => {
            console.log(answer);
        });

        Socket.on('waiting-room', (data) => {
            console.log(`waiting-room: ${data}`);
        });
    }

    render() {
        return (
            <div className='rooms-wrapper col'>
                <Header>
                    <div className={"create-room " + (this.state.isModalActive ? 'close-create-room' : '')}>
                        <img src={Plus} alt="create-room" onClick={() => this.toggleCreateRoom()}/>
                    </div>
                </Header>
                <ul className='rooms-list-wrapper list-wrapper'>
                    {this.renderList()}
                </ul>
                {this.state.isModalActive
                    ?
                    <Modal onCloseClick={this.closeModal} className={this.state.isModalClosing ? 'modal-closing' : ''}>
                        <div className="create-room-wrapper col box-shadow">
                            <h2 className="page-subtitle create-room-title">
                                Create a room
                            </h2>
                            <form action="" className="create-room-form col" onSubmit={event => this.onSubmit(event)}>
                                <input type="text" className="create-room-input" placeholder="Enter your room's name"
                                       name='room-name'
                                       value={this.state.roomName}
                                       onChange={event => this.onInputChange(event)}
                                       required
                                />
                                {this.state.isRoomPrivate
                                    ? <input type="password" className="create-room-input"
                                             placeholder='Password for your room'
                                             name='room-password'
                                             value={this.state.roomPassword}
                                             onChange={event => this.onInputChange(event)}
                                             required
                                    />
                                    : ''
                                }

                                <label htmlFor="room-is-private" className='room-is-private-label'>
                                    Private?
                                    <input type="checkbox" className="create-room-is-private"
                                           name='room-is-private'
                                           value={this.state.isRoomPrivate}
                                           onChange={event => this.onInputChange(event)}
                                    />
                                </label>
                                <input type="submit" className="create-room-submit" value='Create'/>


                            </form>
                        </div>
                    </Modal>
                    : ''
                }
                <Notification ref='notification'/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        socket: state.socket,
        rooms: state.rooms
    }
};

export default connect(mapStateToProps, {setUser, getRooms})(Rooms);