/**
 * these interfaces are used in action creation
 */
import { IFilter } from '../app';

export interface IRefAction  {
  id: number;
}

export interface ITextValueAction  {
  text: string;
}
export interface IRefValueAction  {
  id: number;
  text: string;
}

export interface IFilterAction  {
  filter: IFilter;
}