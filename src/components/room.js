import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {getUser} from '../utils/AuthService';
import {setUser, getRoom} from "../actions";
import {calculateRadialCss} from '../utils/radial_countdown';

import Header from './header';

import './room.css';
import Back from '../img/chevron-left.svg';

class Room extends Component {
    constructor() {
        super();

        this.state = {
            time: 0,
            defaultTime: 30,
            guess: ''
        };

        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    startTimer = () => {
        this.setState({time: this.state.defaultTime}, () => {
            this.timer = setInterval(this.countDown, 500);
        });

    };

    countDown = () => {
        this.setState({
            time: this.state.time-0.5
        });

        // Check if we're at zero.
        if (this.state.time === 0) {
            clearInterval(this.timer);
        }
    };


    navBack = () => {
        this.props.history.goBack();
    };

    onChange = (e) => {
        this.setState({guess: e.target.value})
    };

    onSubmit = (e) => {
        e.preventDefault();
    };

    componentWillMount() {
        this.props.getRoom({id: this.props.match.params.id, password: ''});
        this.props.setUser(getUser().data);
    }

    componentDidMount(){
        this.startTimer();
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }


    render() {
        return (
            <div className={'room-wrapper col'}>
                <Header className={'room-header'}>
                    <div className="back-button header-button" onClick={() => this.navBack()}>
                        <img src={Back} alt=""/>
                    </div>
                    <h1 className="header-room-title header-title">
                        {this.props.room.name}
                    </h1>
                </Header>
                <main className="room-content-wrapper col">
                    <div className="room-main-panel col box-shadow">
                        <h2 className="room-main-panel-title">
                            You are guessing!
                        </h2>
                        <h3>The word is:</h3>
                        <h2 className="word-to-guess">
                            Enormous sibling
                        </h2>

                        <div className="countdown-wrapper"
                             style={{backgroundImage: calculateRadialCss(1 - (this.state.time / this.state.defaultTime))}}
                        >
                            <p className="countdown">{Math.round(this.state.time)}</p>
                        </div>

                    </div>

                    <form action="" className="guess-form box-shadow" onSubmit={event => this.onSubmit(event)}>
                        <input type="text" name='guess-input' className="guess-input"
                               placeholder='Enter your guess here'
                               onChange={event => this.onChange(event)}
                               value={this.state.guess}
                               autoComplete="off"
                               aria-autocomplete="none"
                        />
                        <input type="submit" className='guess-submit' value='Guess'/>
                    </form>

                </main>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        room: state.room
    }
};

export default connect(mapStateToProps, {setUser, getRoom})(withRouter(Room));