import React, {Component} from 'react';

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <LoginComponent />
            </div>
        );
    }
}

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'tong',
            password: ''
        }

        // this.handlelUsernameChange= this.handlelUsernameChange.bind(this);
        // this.handlelPasswordChange= this.handlelPasswordChange.bind(this);
        this.handelChange= this.handelChange.bind(this);

    }
    
    // handle multiple event from different elements
    handelChange(event) {
        console.log(event.target.name);

        // update state of different field base on the name of event target
        // key in struct should be constant, if want to use variable, need to use []
        // need to ensure the name of target == name of corresponding name in state
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handlelPasswordChange(event) {
        console.log(event.target.name);

        this.setState({
            password: event.target.value
        });
    }

    render() {
        return(
            <div>
            User Name: <input type="text" name="username" value={this.state.username} onChange={this.handelChange} />
            Password: <input type="password" name="password" value={this.state.password} onChange={this.handelChange} />
            <button>Login</button>
            </div>
        );
    }
}

export default TodoApp;