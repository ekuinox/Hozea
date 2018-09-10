import * as React from "react"
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ActionDispatcher } from './ActionDispatcher'
import { TodoListState } from './reducer'
import { ReduxAction, ReduxState } from '../../store'

interface Props {
	value: TodoListState
	actions: ActionDispatcher
}

class TodoList extends React.Component<Props> {
	render() {
		return (
			<div>
				<ul>
					{this.props.value.tasks.map(task => {	
						return (
							<li>
								{task.subject} | {task.uuid}
								<button onClick={() => {this.onDeleteButtonClick(task.uuid)}}>Detele!</button>
							</li>
						)
					})}
				</ul>
				<input type="text" name="subject" value={this.props.value.temporaryTask} onChange={event => {this.props.actions.change(event.currentTarget.value)}} />
				<button onClick={() => {this.onAddButtonClick()}}>Add!</button>
			</div>
		)
	}
	onAddButtonClick() {
		if(0 < this.props.value.temporaryTask.length) this.props.actions.add()
	}
	onDeleteButtonClick(uuid: string) {
		this.props.actions.delete(uuid)
	}
}

export default connect(
	(state: ReduxState) => ({value: state.todolist}),
	(dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(TodoList)
