import counter, {CounterActions, CounterState} from './components/Counter/module'
import { TodoActions } from './components/TodoList/Action'
import todolist, { TodoListState} from './components/TodoList/reducer'
import {createStore, combineReducers, Action} from 'redux'

export default createStore(
  combineReducers({
    counter,
    todolist
  })
)

export type ReduxState = {
  counter : CounterState
  todolist: TodoListState

}

export type ReduxAction = TodoActions | CounterActions | Action
