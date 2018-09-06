import * as React from 'react'
import { ipcRenderer } from 'electron'

interface State {
	username: string
	password: string
}

export default class ProxySettingForm extends React.Component<{}, State> {
    constructor() {
		super({})
		this.state = {
			username: "username",
			password: "password"
		}
    }
    render() {
        return (
			<div>
				<form action="javascript:void(0)" onSubmit={() => {
					console.log(this.state.username, this.state.password)
					localStorage.setItem('hozea.proxy.username', this.state.username)
					localStorage.setItem('hozea.proxy.password', this.state.password)
					ipcRenderer.send('proxy-auth', {proxy: {username: this.state.username, password: this.state.password}})
				}}>
					<input type="text" name="name" value={this.state.username} onChange={(event) => {this.setState({username: event.target.value})}} />
					<input type="password" name="password" value={this.state.password} onChange={(event) => {this.setState({password: event.target.value})}} />
					<button type="submit">submit</button>
				</form>
			</div>
        )
	}
}