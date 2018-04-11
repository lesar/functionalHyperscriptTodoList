import {
  SAVE_EDIT_TODO
} from '../../../../redux/costants';
import { IRefValueAction } from '../../../../redux/interfaces';
import { ITodo } from '../../todo';
import { List, map } from 'list';

import { createActionP, IActionP } from '../../../../redux/actionCreator';

export const todoSaveEdit = createActionP<IRefValueAction, IRefValueAction>(
  SAVE_EDIT_TODO, 
  ({id, text}: IRefValueAction) => 
({
  id,
  text
}));

const work = (state: ITodo, action: IActionP<IRefValueAction>): ITodo  => {
  return (state.id !== action.payload.id)
    ? state
    : {
      ...state,
      editMode: false,
      title: action.payload.text
    };
}
export const todoSaveEditReducerObj = {
  [SAVE_EDIT_TODO]: (state: List<ITodo>, action: IActionP<IRefValueAction>): List<ITodo> => 
    map(t => work( t, action ), state)
};