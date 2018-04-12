/**
* App component is defined here together some basic interface.
* App component is a container for all application components.
*/
import Footer from './footer';
import { AddTodo } from './todos/todo/addTodo';
import  VisibleTodoList from './todos/visibleToDoList';
import { html, h } from './infernoHyperscript';
import { ITodo } from './todos/todo/todo';
import { List } from "list";
/**
* enum play filter rule on Completed todos property
*/
export enum CompletedFilter {
  All=1,
  Completed,
  Uncompleted,
}
/**
* enum play filter rule on Enabled todos property
*/
export enum EnabledFilter {
  All=1,
  Enabled,
  Disabled,
}
/**
* Filter interface containig all used filter
*/
export interface IFilter {
  completed: CompletedFilter;
  enabled: EnabledFilter;
  isSameFilter( aFilter: IFilter ): boolean;
}
/**
* State interface. State is the unique global object containig the application state
*/
export interface IState {
  todos: List<ITodo>;
  visibilityFilter: IFilter;
}
export class Filter implements IFilter {
  completed: CompletedFilter;
  enabled: EnabledFilter;
  constructor(completed: CompletedFilter = CompletedFilter.All, enabled: EnabledFilter = EnabledFilter.All) {
    this.completed = completed;
    this.enabled = enabled;
  }
  isSameFilter( aFilter: IFilter ): boolean {
    if ( (typeof aFilter == void 0) || (aFilter === undefined) ) {
      return false;
    }
    if ( this === aFilter ) {
      return true;
    }
    return (this.completed == aFilter.completed) && (this.enabled == aFilter.enabled);
  }
}
/**
* Initial filter object: all are showed
*/
export var filterAll = new Filter();
/**
 * first Functional component quite simple
 */
export const App = () => html.div([
  h(AddTodo),
  h(VisibleTodoList),
  h(Footer)
]);

export default App;
