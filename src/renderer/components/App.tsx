import * as React from 'react'
import * as ReactModal from 'react-modal'
import ProxySettingForm from './ProxySettingForm'
import Counter from './Counter/Container'
import { ipcRenderer } from 'electron'
import { ON_NEED_PROXY, ON_PROXY_SUCCESS, ON_PROXY_FAILED } from '../../common/EventNameConstans'
import axios from 'axios'

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
		ipcRenderer.on(ON_NEED_PROXY, () => {
			this.setState({modalIsOpen: true})
		})
	}
	render() {
		return (
			<div>
				<Counter />

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
					<ProxySettingForm closeModal={() => {this.closeModal()}}/>
					<button type="submit" onClick={() => {this.closeModal()}}>Close Modal</button>
				</ReactModal>
			</div>
		)
	}
	getIPAddress() {
		axios({
			url: "https://httpbin.org/ip",
			method: "GET",
		})
			.then(response => {
				this.setState({ip: response.data.origin})
				ipcRenderer.emit(ON_PROXY_SUCCESS)
			})
			.catch(reason => {
				if (reason.response.status == 407) ipcRenderer.emit(ON_PROXY_FAILED)
			})
		}
	closeModal() {
		this.setState({modalIsOpen: false})
	}
}
