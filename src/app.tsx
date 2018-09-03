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
                <p>
                    {this.state.counter}
                   <button onClick={() => {this.setState({counter: this.state.counter + 1})}} >オセ！</button>
                </p>
            </div>
        )
    }
}
