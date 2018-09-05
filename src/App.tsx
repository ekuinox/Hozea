import * as React from 'react'

interface State {
    counter: number
}

export default class App extends React.Component<{}, State> {
    constructor() {
        super({})
        this.state = {
            counter: 0
        }
    }
    render() {
        return (
            <div>
                <p>こんにちは</p>
                <p>counter: {this.state.counter}</p>
                <p><button onClick={() => {this.setState({counter: this.state.counter + 1})}} >オセ！</button></p>
                <p><button onClick={() => {localStorage.setItem("app.counter", this.state.counter.toString())}}>ほぞん</button></p>
                <p><button onClick={() => {this.setState({counter: parseInt(localStorage.getItem("app.counter"))})}}>よみこみ</button></p>
            </div>
        )
    }
}
