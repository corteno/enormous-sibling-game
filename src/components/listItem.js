import React, {Component} from 'react';
import './listItem.css';

import Lock from '../img/lock.svg';

const ListItem  = (props) => {

    return (
        <li className='list-item rooms-list-item' onClick={props.onClick}>
            {props.children}
            {props.isPrivate ?
                <div className="private-room">
                    <img src={Lock} alt="private-room-lock"/>
                </div>
                : ''
            }
        </li>
    );
};

export default ListItem;