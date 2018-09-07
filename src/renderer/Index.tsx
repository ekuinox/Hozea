// Electronのindex.htmlから読み込まれるrenderer-process

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'
import Store from './Store'
import { Provider } from 'react-redux'

ReactDOM.render(
	<Provider store={Store}>
		<App />
	</Provider>,
	document.getElementById('root') as HTMLElement
)
