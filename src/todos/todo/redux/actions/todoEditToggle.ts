import {
  EDIT_TODO
} from '../../../../redux/costants';
import { IRefAction } from '../../../../redux/interfaces';
import { ITodo } from '../../todo';

import { createActionP, IActionP } from '../../../../redux/actionCreator';
import { List, map } from 'list';

export const todoEditToggle = createActionP<IRefAction, IRefAction>(
  EDIT_TODO, 
  ({id}: IRefAction) => 
({
  id
}));

const todoToggle = (state: ITodo, action: IActionP<IRefAction>): ITodo  => {
  return (state.id !== action.payload.id)
    ? state
    : {
      ...state,
      editMode: !state.editMode
    };
}
export const todoEditReducerObj = {
  [EDIT_TODO]: (state: List<ITodo>, action: IActionP<IRefAction>): List<ITodo> => 
  map(t => todoToggle( t, action ), state)
};