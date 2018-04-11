/**
 * used only if woudl make form text field controlled
 */
import {
  EDIT_SET_VALUE
} from '../../../../redux/costants';
import { IRefValueAction } from '../../../../redux/interfaces';
import { ITodo } from '../../todo';
import { List, map } from 'list';

import { createActionP, IActionP } from '../../../../redux/actionCreator';

export const editSetValue = createActionP<IRefValueAction, IRefValueAction>(
  EDIT_SET_VALUE, 
  ({id, text}:IRefValueAction) => 
({
  id,
  text
}));

const work = (state: ITodo, action: IActionP<IRefValueAction>): ITodo  => {
  return (state.id !== action.payload.id)
    ? state
    : {
      ...state,
      title: action.payload.text
    };
}
export const editSetValueReducerObj = {
  [EDIT_SET_VALUE]: (state: List<ITodo>, action: IActionP<IRefValueAction>): List<ITodo> => 
    map(t => work( t, action ), state)
};