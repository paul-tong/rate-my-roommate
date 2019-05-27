import React, {Component} from 'react';
import './Counter.css'

class Counter extends Component {
    // defition the initial state in a constructor
    // state => counter 0
    constructor() {
        super(); // note: need supper before using 'this'
        this.state = { // is a js struct
            counter : 0
        }    

        // bind function with this, so that in the function, it can use 'this'
        this.increment = this.increment.bind(this)
    }


    render() {
        return(
            <div className="counter">
                <button onClick={this.increment}>+1</button>
                <span className="count">{this.state.counter}</span>
            </div>
        );
    }

    // update state - counter++
    increment() {
        // this.state.counter++; // cannot modify state directly
        // use setState to modify state, assign new value to the attributes of the state
        this.setState({ 
            counter : this.state.counter + 1
        });
    }    
}


export default Counter;
