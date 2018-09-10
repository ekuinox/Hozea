import { ReduxAction, ReduxState } from '../../store'
import { changeTask, addTask, deleteTask } from './Action'

export class ActionDispatcher {
	constructor(private dispatch: (action: ReduxAction) => void) {
		this.dispatch = dispatch
	}

	public change(subject: string) {
		this.dispatch(changeTask(subject))
	}

	public add() {
		this.dispatch(addTask())
	}

	public delete(uuid: string) {
		this.dispatch(deleteTask(uuid))
	}
}
