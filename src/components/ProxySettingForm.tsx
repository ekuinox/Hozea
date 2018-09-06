import * as React from 'react'
import { ipcRenderer } from 'electron'

export const ON_NEED_PROXY = "need-proxy"
export const ON_PROXY_AUTH = "proxy-auth"

export interface AuthenticationCredentials {
	username?: string
	password?: string
}

interface State {
	proxy: AuthenticationCredentials
}

export default class ProxySettingForm extends React.Component<{}, State> {
    constructor() {
		super({})
		this.state = {
			proxy: {
				username: "username",
				password: "password"
			}
		}
    }
    render() {
        return (
			<div>
				<form action="javascript:void(0)" onSubmit={() => {
					console.log(this.state.proxy.username, this.state.proxy.password)
					ipcRenderer.send(ON_PROXY_AUTH, {username: this.state.proxy.username, password: this.state.proxy.password})
				}}>
					<input type="text" name="name" value={this.state.proxy.username} onChange={(event) => {this.setState({proxy: {username: event.target.value}})}} />
					<input type="password" name="password" value={this.state.proxy.password} onChange={(event) => {this.setState({proxy: {password: event.target.value}})}} />
					<button type="submit">submit</button>
				</form>
			</div>
        )
	}
}