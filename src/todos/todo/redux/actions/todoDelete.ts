import {
  DELETE_TODO
} from '../../../../redux/costants';
import { IRefAction } from '../../../../redux/interfaces';
import { ITodo } from '../../todo';
import { List, filter } from 'list';

import { createActionP, IActionP } from '../../../../redux/actionCreator';

export const todoDelete = createActionP<IRefAction, IRefAction>(
  DELETE_TODO, 
  ({id}: IRefAction) => 
({
  id
}));

const work = (state: ITodo, action: IActionP<IRefAction>): boolean  => {
  return (state.id !== action.payload.id);
}
export const todoDeleteReducerObj = {
  [DELETE_TODO]: (state: List<ITodo>, action: IActionP<IRefAction>): List<ITodo> => 
    filter(t => work( t, action ), state)
};