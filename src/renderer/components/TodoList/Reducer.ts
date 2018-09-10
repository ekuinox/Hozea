import { TodoActions, ActionNames } from './Action'
import * as uuid from 'uuid'

interface Task {
    subject: string,
    uuid: string
}

export interface TodoListState {
    tasks: Task[]
    temporaryTask: string
}

const initialState: TodoListState = { tasks: [], temporaryTask: "" }

export default function reducer(state: TodoListState = initialState, action: TodoActions) {
    if (action.type == ActionNames.CHANGE)
    {
        return {
            temporaryTask: action.subject,
            tasks: state.tasks
        }
    }
    else if (action.type == ActionNames.ADD)
    {
        const tasks: Task[] = []

        for (const task of state.tasks) {
            tasks.push({
                subject: task.subject,
                uuid: task.uuid
            })
        }
        
        tasks.push({
            subject: state.temporaryTask,
            uuid: uuid()
        })
        
        return {
            temporaryTask: state.temporaryTask,
            tasks: tasks
        }
    }
    else if (action.type == ActionNames.DELETE)
    {
        const tasks: Task[] = []

        for (const task of state.tasks) {
            if (task.uuid != action.uuid) {
                tasks.push({
                    subject: task.subject,
                    uuid: task.uuid
                })
            }
        }
        
        return {
            temporaryTask: state.temporaryTask,
            tasks: tasks
        }
    }
    else {
        return initialState
    }
}