import React, {Component} from 'react';
import './modal.css';

class Modal extends Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <div className={'modal-wrapper ' + this.props.className}>
                {this.props.children}
            </div>
        );
    }
}

export default Modal;