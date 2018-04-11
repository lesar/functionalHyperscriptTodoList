import {
  TOGGLE_ENABLE_TODO
} from '../../../../redux/costants';
import { IRefAction } from '../../../../redux/interfaces';
import { ITodo } from '../../todo';

import { createActionP, IActionP } from '../../../../redux/actionCreator';
import { List, map } from 'list';

export const todoEnableToggle = createActionP<IRefAction, IRefAction>(
  TOGGLE_ENABLE_TODO, 
  ({id}: IRefAction) => 
({
  id
}));

const todoToggle = (state: ITodo, action: IActionP<IRefAction>): ITodo  => {
  return (state.id !== action.payload.id)
    ? state
    : {
      ...state,
      enabled: !state.enabled
    };
}
export const todoEnableToggleReducerObj = {
  [TOGGLE_ENABLE_TODO]: (state: List<ITodo>, action: IActionP<IRefAction>): List<ITodo> => 
    map(t => todoToggle( t, action ), state)
};