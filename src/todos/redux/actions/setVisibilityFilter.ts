import {
  SET_VISIBILITY_FILTER
} from '../../../redux/costants';
import { IFilterAction } from '../../../redux/interfaces';
import { IFilter, filterAll } from '../../../app';
import { createActionP, IActionP } from '../../../redux/actionCreator';

export const setVisibilityFilter = createActionP<IFilterAction, IFilterAction>(
  SET_VISIBILITY_FILTER, ({filter}:IFilterAction) => ({
  filter
}));

export const setVisibilityFilterReducerObj = {
  [SET_VISIBILITY_FILTER]: (state: IFilter = filterAll, action: IActionP<IFilterAction>): IFilter => state.isSameFilter(action.payload.filter) 
    ? state 
    : action.payload.filter
};
