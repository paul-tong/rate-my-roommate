import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import AutheticationService from './AuthenticationService.jsx'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent />
                    <Switch>
                        <Route path='/' exact component={LoginComponent} />
                        <Route path='/login' component={LoginComponent} />
                        <Route path='/welcome/:name' component={WelcomeComponent} />
                        <Route path='/todos' component={ListTodosComponent} />
                        <Route path='/logout' component={LogoutComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                    <FooterComponent />
                </Router>
                {/*<LoginComponent />
                <WelcomeComponent />*/}
            </div>
        );
    }
}

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AutheticationService.isUserLoggedIn();
        console.log(isUserLoggedIn);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                   <div><a href="http://www.google.com" className="navbar-brank">To Do</a></div> 
                   <ul className="navbar-nav">
                       {isUserLoggedIn && <li className="nav-link"><Link className = "nav-link" to="/welcome/tong">Home</Link></li>}
                       {isUserLoggedIn && <li className="nav-link"><Link className = "nav-link" to="/todos">Todos</Link></li>}
                   </ul>
                   <ul className="navbar-nav navbar-collapse justify-content-end">
                   {!isUserLoggedIn && <li className="nav-link"><Link className = "nav-link" to="/login">Login</Link></li>}
                       {isUserLoggedIn && <li className="nav-link"><Link className = "nav-link" to="/logout" onClick={AutheticationService.logout}>Logout</Link></li>}
                   </ul>                   
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All Rights Reserved 2019</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component {
    render() {
        return (
            <div>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank you for using your product
                </div>
            </div>
        )
    }
}

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos : 
            [
                {id: 1, description: 'Lean React', done: false, targetDate: new Date()},
                {id: 2, description: 'Lean dance', done: false, targetDate: new Date()},
                {id: 3, description: 'play basketball', done: false, targetDate: new Date()}

            ]
        }
    }

    render() {
        return(
            <div className="container">
                <h1>List Todos</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>desciption</th>
                            <th>is complete</th>
                            <th>target date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>  (                      
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>   
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

class WelcomeComponent extends Component {
    render() {
        return(
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>
                </div>
            </>
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

            // create session storage
            AutheticationService.registerSuccessfulLogin(this.state.username, this.state.password);

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
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />
                    <ShowLoginSuccessMessage showLoginSuccessMessage={this.state.showLoginSuccessMessage}/>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showLoginSuccessMessage && <div>Login Success</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handelChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handelChange} />
                    <button className="btn" onClick={this.loginClicked}>Login</button>
                </div>
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