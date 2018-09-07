import * as React from 'react'
import { ipcRenderer } from 'electron'
import { AuthenticationCredentials } from '../../common/Interfaces'
import { ON_PROXY_AUTH } from '../../common/EventNameConstans'

interface Props {
	closeModal: () => void
}

interface State {
	proxy: AuthenticationCredentials
}

export default class ProxySettingForm extends React.Component<Props, State> {
    constructor(props: Props) {
		super(props)
		this.state = {
			proxy: {
				username: "",
				password: ""
			}
		}
    }
    render() {
        return (
			<div>
				<form action="javascript:void(0)">
					<input
						type="text"
						name="name"
						value={this.state.proxy.username}
						placeholder="username"
						onChange={(event) => {this.onUsernameChange(event.target.value)}}
					/>
					<input
						type="password"
						name="password"
						value={this.state.proxy.password}
						placeholder="password"
						onChange={(event) => {this.onPasswordChange(event.target.value)}}
					/>
					<button type="submit" onClick={() => {
						ipcRenderer.send(ON_PROXY_AUTH, {username: this.state.proxy.username, password: this.state.proxy.password})
						this.props.closeModal()}}>
						submit
					</button>
				</form>
			</div>
        )
	}
	onUsernameChange(value: string) {
		this.setState({proxy: {
			username: value,
			password: this.state.proxy.password
		}})
	}
	onPasswordChange(value: string) {
		this.setState({proxy: {
			username: this.state.proxy.username,
			password: value
		}})
	}
}