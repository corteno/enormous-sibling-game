import React, {Component} from 'react';
import './notification.css';

class Notification extends Component {
    constructor(props){
        super();
    }

    state = {
        content: '',
        isFirstTime: true,
        successColor: '#2e7d32',
        failColor: '#B71C1C',
        defaultDuration: 5000,
        color: ''
    };

    displayNotification = (message) => {
        this.setState({content: message.content}, () => {
            this.setState({color: message.type === 'error' ? this.state.failColor : this.state.successColor});

            setTimeout(() =>{
                this.setState({content: ''})
            }, this.state.defaultDuration)
        });
    };

    render() {
        return (
            <div className='notification-wrapper'>
                <div
                    className={"notification-content box-shadow " +
                    (this.state.content !== '' ? 'display-notif' : '')}
                    style={{backgroundColor: this.state.color}}
                >
                    <p className="notification-message">
                        {this.state.content
                            ? this.state.content
                            : ''
                        }
                    </p>
                </div>
            </div>
        );
    }
}

export default Notification;