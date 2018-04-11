import {
  TOGGLE_COMPLETE_TODO
} from '../../../../redux/costants';
import { ITodo } from '../../todo';
import { IRefAction } from '../../../../redux/interfaces';
import { createActionP, IActionP } from '../../../../redux/actionCreator';
import { List, map } from 'list';

export const todoCompleteToggle = createActionP<IRefAction, IRefAction>(
  TOGGLE_COMPLETE_TODO, 
  ({id}: IRefAction) => 
({
  id
}));

const todoToggle = (state: ITodo, action: IActionP<IRefAction>): ITodo  => {
  return (state.id !== action.payload.id) 
    ? state 
    : {
      ...state,
      completed: !state.completed
    };
}
export const todoCompleteToggleReducerObj = {
  [TOGGLE_COMPLETE_TODO]: (state: List<ITodo>, action: IActionP<IRefAction>): List<ITodo> => 
    map(t => todoToggle( t, action ), state)
};