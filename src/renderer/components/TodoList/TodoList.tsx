import * as React from "react"
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ActionDispatcher } from './ActionDispatcher'
import { TodoListState } from './reducer'
import { ReduxAction, ReduxState } from '../../store'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

interface Props {
	value: TodoListState
	actions: ActionDispatcher
}

class TodoList extends React.Component<Props> {
	render() {
		return (
			<div>
				<List>
					{this.props.value.tasks.map(task => {	
						return (
							<ListItem>
								<ListItemText>{task.subject}</ListItemText>
								<Button color={'secondary'} onClick={() => {this.onDeleteButtonClick(task.uuid)}}>Done!</Button>
							</ListItem>
						)
					})}
				</List>
				<Input type="text" name="subject" value={this.props.value.temporaryTask} onChange={event => {this.props.actions.change(event.currentTarget.value)}} />
				<Button color={'secondary'} onClick={() => {this.onAddButtonClick()}}>Add!</Button>
			</div>
		)
	}
	onAddButtonClick() {
		if(this.props.value.temporaryTask.length < 1) return
		this.props.actions.add()
		this.props.actions.change("")
	}
	onDeleteButtonClick(uuid: string) {
		this.props.actions.delete(uuid)
	}
}

export default connect(
	(state: ReduxState) => ({value: state.todolist}),
	(dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(TodoList)
