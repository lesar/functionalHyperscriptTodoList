import { setVisibilityFilterReducerObj } from '../todos/redux/actions/setVisibilityFilter';
import { addTodoReducerObj } from '../todos/todo/redux/actions/addTodo';
import { todoCompleteToggleReducerObj } from '../todos/todo/redux/actions/todoCompleteToggle';
import { todoDeleteReducerObj } from '../todos/todo/redux/actions/todoDelete';
import { todoEditReducerObj } from '../todos/todo/redux/actions/todoEditToggle';
import { todoEnableToggleReducerObj } from '../todos/todo/redux/actions/todoEnableToggle';
import { todoSaveEditReducerObj } from '../todos/todo/redux/actions/todoSaveEdit';
//import { editSetValueReducerObj } from '../todos/todo/redux/actions/editSetValue';
import typeToReducer from 'type-to-reducer';
import { combineReducers } from 'redux';
import { filterAll, IState } from '../app';
import { list } from 'list';
/**
 * after import all reducersObj I create a new object iniect all reducersObj props.
 * this help if I need to subclass action and use promise
 */
const reducerObj = Object.assign({},
  //editSetValueReducerObj,
  addTodoReducerObj,
  todoCompleteToggleReducerObj,
  todoDeleteReducerObj,
  todoEditReducerObj,
  todoEnableToggleReducerObj,
  todoSaveEditReducerObj
);

const todos = typeToReducer(reducerObj, list());
const visibilityFilter = typeToReducer(setVisibilityFilterReducerObj, filterAll);

const reducer = combineReducers<IState>({
  todos,
  visibilityFilter
})

export default reducer;