/**
* Selector for all todos: I will generate function for all state selector
* [see](https://github.com/reactjs/reselect)
* reselect impacts only in state selections
*/
import { createSelector } from 'reselect';
import { ITodo } from './todo/todo';
import { IState, IFilter, CompletedFilter, EnabledFilter } from '../app';
import { List, filter } from 'list';

/**
* function to select visibilityFilter from state
*/
const getVisibilityFilter = (state: IState): IFilter => state.visibilityFilter;
/**
* function to select todos from state
*/
const getTodos = (state: IState): List<ITodo> => state.todos;

const completedFilter = (visibilityFilter: IFilter, todos: List<ITodo>): List<ITodo> => {
  switch (visibilityFilter.completed) {
    case CompletedFilter.Completed:
      todos = filter<ITodo>(t => t.completed, todos);
      break;
    case CompletedFilter.Uncompleted:
      todos = filter<ITodo>(t => !t.completed, todos);
      break;
  }
  return todos;
};
const enabledFilter = (visibilityFilter: IFilter, todos: List<ITodo>): List<ITodo> => {
  switch (visibilityFilter.enabled) {
    case EnabledFilter.Enabled:
      todos = filter<ITodo>(t => t.enabled, todos);
      break;
    case EnabledFilter.Disabled:
      todos = filter<ITodo>(t => !t.enabled, todos);
      break;
  }
  return todos;
}; 


const doFilter = (
  visibilityFilter: IFilter, 
  todos: List<ITodo>
): List<ITodo> => 
enabledFilter(
  visibilityFilter, 
  completedFilter(
    visibilityFilter, 
    todos
  )
);

/**
* **selector** for get visible todo list.
* [see](https://github.com/reactjs/reselect#createselectorinputselectors--inputselectors-resultfunc)
* getTodos, getVisibilityFilter  are select param and can be passed in array
* or as sinple list (getTodos, getVisibilityFilter).
* After selector params will be passed a selector callback taking previous parameter
* and calculating new state selection.
* Is encapsulate into an arrow function to create a new selector every time so
* if we will use multiple Component instance every component have his selector.
* this is important because a selector have a one size chache and so cannot
* serve more Componet: if we have more component it is probable they have different
* props to show different data. So a one size chache can serve only one component.
*
* This is only an example: in our case allmost actions cause a state change. the only
* check you can do is toggle comment down on //console.log('calcolate');
* and click on the graphics interface on filter without change is value.
* this show uou that reselect do his job
*/
export const makeGetVisibleTodos = () => createSelector(
  [ getTodos, getVisibilityFilter ],
  (todos: List<ITodo>, visibilityFilter: IFilter): List<ITodo> => {
    //console.log('calcolate');
    /**
    * is better to make a new object so in the future we can make shallow
    * comparison [see](https://reactjs.org/docs/shallow-compare.html)
    * A lot of library suppose this behavior
    * newTodos become a new object only when it will be filtered: see down.
    * [see also](https://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html)
    * return the filtered todos
    */
   let ris: List<ITodo> = doFilter(visibilityFilter, todos);
    return  ris;
  }
);

export default makeGetVisibleTodos;
