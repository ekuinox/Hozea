import { Action } from 'redux'

export enum ActionNames {
	CHANGE = 'todolist/change',
	ADD = 'todolist/add',
	DELETE = 'todolist/delete'
}

interface ChangeAction extends Action {
	type: ActionNames.CHANGE,
	subject: string,
}

export const changeTask = (subject: string): ChangeAction => ({
	type: ActionNames.CHANGE,
	subject: subject,
})

interface AddAction extends Action {
	type: ActionNames.ADD
}

export const addTask = (): AddAction => ({
	type: ActionNames.ADD,
})

interface DeleteAction extends Action {
	type: ActionNames.DELETE,
	uuid: string
}

export const deleteTask = (uuid: string): DeleteAction => ({
	type: ActionNames.DELETE,
	uuid: uuid
})

export type TodoActions = ChangeAction | AddAction | DeleteAction
