/**
* This is the root file for the exemple HyperscriptTodoList.
* In this file I use a little of RamdaJs only to introduce this library:
* I will like to write a new HyperscriptTodoList example in functional way next time
*/
import { render as infernoRender, InfernoInput, VNode } from 'inferno';
import { createStore, Store } from 'redux';
import { Provider } from 'inferno-redux';
import reducer from './redux/reducer'
import { h } from './infernoHyperscript';
/**
* I do not import all RamdaJs (import * as R from "ramda";) only partialRight
*/
import * as R  from "rambda";
import { App, IState } from './app'

declare var process: {
  env: {
    'NODE_ENV': string
  }
}

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
/**
* take Inferno.render and give to it document.getElementById('root') as last parameter
* returning a function that need only the component param
*/
const renderer = R.curry((
  node: HTMLElement|null, 
  component: InfernoInput
) => infernoRender(component, node));
/*
const renderer = (
  node: HTMLElement|null
) => (
  component: InfernoInput
) => infernoRender(component, node);
*/
const render = renderer(document.getElementById('root'));
/*
  render,
  [ document.getElementById('root') ]
);
*/
/**
* In Redux only one store adn one state are used.
* The store encapsulate state. Store is create taking a reducer function
* **todoAppReducer** that take (state, action) to calculate a
* new application state.
* Only the reducer function can generate a new state: the state cannot
* be manually changed.
* store.dispach(Action) call reducer function to calculate the new state by
* the action and the last state. The new state is encapsulate by the store.
* Store.getState() will return the actual state.
*/
const store = createStore<IState>( reducer );

/**
 * h as optional params not good for compose function
 * so define a fix params h function
 */
const mainh = (
  tag: Function, 
  store: Store<IState>, 
  children: VNode
) =>  h(tag, { store, children }); 

const main = R.compose(render, mainh);

/**
* provider take App place as root component.
* render show the application.
* App is the root Application component: all other component are App childs.
* Provider is a special component that provides to all application component
* the store in context property: all component can access to this.context.store.
* To do his job Provider need the store and the root component App.
* All component instance must be create by **h** hyperscript function
*/
main(
  Provider, 
  store,   
  h(App)
);