import * as React from 'react'
import * as ReactModal from 'react-modal'
import ProxySettingForm from './components/ProxySettingForm'
import { ipcRenderer } from 'electron';

interface State {
	counter: number
	ip: string
	modalIsOpen: boolean
}

ReactModal.setAppElement('#root')

export default class App extends React.Component<{}, State> {
	constructor() {
		super({})
		this.state = {
			counter: 0,
			ip: "",
			modalIsOpen: false
		}
		ipcRenderer.on('need-proxy', () => {
			this.setState({modalIsOpen: true})
		})
	}
	render() {
		return (
			<div>
				<input type='password' name='password'/>
				

				<p>こんにちは</p>
				<p>counter: {this.state.counter}</p>
				<p><button onClick={() => {this.setState({counter: this.state.counter + 1})}} >オセ！</button></p>
				<p><button onClick={() => {localStorage.setItem("app.counter", this.state.counter.toString())}}>ほぞん</button></p>
				<p><button onClick={() => {this.setState({counter: parseInt(localStorage.getItem("app.counter"))})}}>よみこみ</button></p>
				<p>IP: {this.state.ip}</p>
				<p><button onClick={() => {this.getIPAddress()}}>get ip</button></p>

				<button onClick={() => {this.setState({modalIsOpen: true})}}>Open Modal</button>
				<ReactModal
					isOpen={this.state.modalIsOpen}
					style={
						{
							content : {
							  top: '50%',
							  left: '50%',
							  right: 'auto',
							  bottom: 'auto',
							  marginRight: '-50%',
							  transform: 'translate(-50%, -50%)'
							}
						  }
					}
				>
					<ProxySettingForm />
					<button type="submit" onClick={() => {this.setState({modalIsOpen: false})}}>Close Modal</button>
				</ReactModal>
			</div>
		)
	}
	getIPAddress() {
		fetch('https://httpbin.org/ip')
			.then(res => res.json())
			.then(res => {
				this.setState({ip: res.origin})
			}, error => {
				this.setState({ip: error})
			}
		)
	}
}
