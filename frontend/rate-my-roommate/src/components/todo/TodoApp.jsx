import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <Switch>
                        <Route path='/' exact component={LoginComponent} />
                        <Route path='/login' component={LoginComponent} />
                        <Route path='/welcome/:name' component={WelcomeComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                </Router>
                {/*<LoginComponent />
                <WelcomeComponent />*/}
            </div>
        );
    }
}

class WelcomeComponent extends Component {
    render() {
        return(
            <div>Welcome {this.props.match.params.name}</div>
        );
    }
}

function ErrorComponent() {
    return (
        <div>I don't know where to go</div>
    );
}

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'tong',
            password: '',
            hasLoginFailed: false,
            showLoginSuccessMessage: false
        }

        // this.handlelUsernameChange= this.handlelUsernameChange.bind(this);
        // this.handlelPasswordChange= this.handlelPasswordChange.bind(this);
        this.handelChange = this.handelChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);

    }
    
    loginClicked() {
        console.log(this.state);
        if (this.state.username === 'tong' && this.state.password === 'dummy') {
            console.log("success");

            // go to a specific route, pass parameter to the route
            this.props.history.push(`/welcome/${this.state.username}`)
            //this.setState({showLoginSuccessMessage: true})
            //this.setState({hasLoginFailed: false})
        }
        else {
            console.log("filed");
            this.setState({showLoginSuccessMessage: false})
            this.setState({hasLoginFailed: true})
        }
    }



    // handle multiple event from different elements
    handelChange(event) {
        // console.log(event.target.name);

        // update state of different field base on the name of event target
        // key in struct should be constant, if want to use variable, need to use []
        // need to ensure the name of target == name of corresponding name in state
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handlelPasswordChange(event) {
        // console.log(event.target.name);

        this.setState({
            password: event.target.value
        });
    }

    render() {
        return(
            <div>
            {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />
            <ShowLoginSuccessMessage showLoginSuccessMessage={this.state.showLoginSuccessMessage}/>*/}
            {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
            {this.state.showLoginSuccessMessage && <div>Login Success</div>}
            User Name: <input type="text" name="username" value={this.state.username} onChange={this.handelChange} />
            Password: <input type="password" name="password" value={this.state.password} onChange={this.handelChange} />
            <button onClick={this.loginClicked}>Login</button>
            </div>
        );
    }
}

function ShowInvalidCredentials(props) {
    if (props.hasLoginFailed) {
        return <div>Invalid Credentials</div>
    }

    return null

}

function ShowLoginSuccessMessage(props) {
    if (props.showLoginSuccessMessage) {
        return <div>Login Success</div>
    }

    return null
}

export default TodoApp;