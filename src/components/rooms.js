import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setUser} from "../actions";
import {getUser} from '../utils/AuthService';

import ListItem from './listItem';
import Header from './header';

import './rooms.css'
import Plus from '../img/plus.svg';



class Rooms extends Component {


    renderList = () => {

    };

    createRoom = () => {
        console.log('create room');
    };
    
    componentDidMount(){
        this.props.setUser(getUser().data);
    }
    
    render() {
        return (
            <div className='rooms-wrapper col'>
                <Header>
                    <div className="create-room">
                        <img src={Plus} alt="create-room" onClick={() => this.createRoom()}/>
                    </div>
                </Header>
                <ul className='rooms-list-wrapper list-wrapper'>
                    <ListItem isPrivate={true}>
                        <div className='col'>
                            <p className='rooms-list-item-title'>Corten's room</p>
                            <p className='rooms-list-item-subtitle'>Corten</p>
                        </div>
                    </ListItem>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, {setUser})(Rooms);