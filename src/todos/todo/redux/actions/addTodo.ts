import {
  ADD_TODO
} from '../../../../redux/costants';
import { ITodo } from '../../todo';
import { IRefValueAction, ITextValueAction } from '../../../../redux/interfaces';
import { createActionP, IActionP } from '../../../../redux/actionCreator';
import { List, append } from 'list';

/**
* auto inc value used for todo id
*/
let nextTodoId: number = 0;
export const addTodo = createActionP<ITextValueAction, IRefValueAction>(
  ADD_TODO, 
  ({text}:ITextValueAction) => 
({
  id: nextTodoId++,
  text
}));

export const addTodoReducerObj = {
  [ADD_TODO]: (state: List<ITodo>, action: IActionP<IRefValueAction>): List<ITodo> => 
    append({
      id: action.payload.id,
      title: action.payload.text,
      completed: false,
      enabled: true,
      editMode: false
    }, state)
};