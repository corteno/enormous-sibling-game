import React, {Component} from 'react';
import './login.css';
import {connect} from 'react-redux';
import {setUsername} from "../actions";

class Login extends Component {

    constructor() {
        super();

        this.state = {
            username: ''
        };
    }

    onInputChange = (e) => {
        switch (e.target.name) {
            case('username'):
                this.setState({username: e.target.value});
                break;

            default:
                break;
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.setUsername(this.state.username);
    };

    render() {
        return (
            <main className='login-wrapper col'>
                <section className="login-form-wrapper col">
                    <div className="login-title-wrapper">
                        <h1 className="page-title login-title">Enorumous Sibling Game</h1>
                    </div>
                    <h2 className="page-subtitle">Play as guest</h2>
                    <form action="" className="login-form col" onSubmit={event => this.onSubmit(event)}>
                        <label htmlFor="username" className='col'>
                            <input type="text" name="username"
                                   onChange={event => this.onInputChange(event)}
                                   value={this.state.username}
                                   placeholder='Enter your name' required/>
                        </label>
                        <input type="submit" value='Play'/>
                    </form>
                </section>

            </main>
        );
    }
}


export default connect(null, {setUsername})(Login);