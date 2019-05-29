import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './Counter.css'

class Counter extends Component {

    // defition the initial state in a constructor
    // state => counter 0
    constructor() {
        super(); // note: need supper before using 'this'
        this.state = { // is a js struct
            counter : 0,
        }    

        // bind function with this, so that in the function, it can use 'this'
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.reset = this.reset.bind(this)
    }

    render() {
        return (
            <div className="Counter">
                <div className='reset' onClick={this.reset}><button>Reset</button></div>
                <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton  by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton  by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <span className="count">{this.state.counter}</span>
            </div>
        );
    }

    // update state - counter++
    increment(by) {
        // console.log(`increment from child - ${by}`)
        // this.state.counter++; // cannot modify state directly
        // use setState to modify state, assign new value to the attributes of the state
        this.setState(
            (preState) => { // use array function to modify previous state and create new state, easier to read
                return {counter : preState.counter + by}
            }
        );
    } 

    // update state - counter--
    decrement(by) {
        // console.log(`increment from child - ${by}`)
        // this.state.counter++; // cannot modify state directly
        // use setState to modify state, assign new value to the attributes of the state
        this.setState(
            (preState) => { // use array function to modify previous state and create new state, easier to read
                return {counter : preState.counter - by}
            }
        );
    }     

    // reset counter to zero
    reset() {
        this.setState({counter : 0});
    }
}

class CounterButton extends Component {
    // defition the initial state in a constructor
    // state => counter 0
    constructor() {
        super(); // note: need supper before using 'this'
        this.state = { // is a js struct
            counter : 0,
        }    

        // bind function with this, so that in the function, it can use 'this'
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }


    render() {
        //const style = {frontSize : "50px"};

        return(
            <div className="counter">
                <button onClick={this.increment}>+{this.props.by}</button>
                <button onClick={this.decrement}>-{this.props.by}</button>
                {/*<span className="count">{this.state.counter}</span>*/}
            </div>
        );
    }

    // update state - counter++
    increment() {
        // this.state.counter++; // cannot modify state directly
        // use setState to modify state, assign new value to the attributes of the state
        this.setState(
            {counter : this.state.counter + this.props.by}
        );

        this.props.incrementMethod(this.props.by); // excute method passed from parent
    }  

    // update state - counter--
    decrement() {
        // this.state.counter++; // cannot modify state directly
        // use setState to modify state, assign new value to the attributes of the state
        this.setState(
            {counter : this.state.counter - this.props.by}
        );

        this.props.decrementMethod(this.props.by); // excute method passed from parent
    }   
}

CounterButton.defaultProps = {
    by : 1
}

CounterButton.propsType = {
    by : PropTypes.number
}
export default Counter
