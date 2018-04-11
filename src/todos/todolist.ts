import { html, h } from '../infernoHyperscript';
import Todo from './todo/todo';
import { ITodo, ISendActionTodo } from './todo/todo';
import { List, map, toArray } from 'list';

/**
* Interface of TodoList. TodoList have to be a connected Componet using
* a filtered todo list. Instead make all todo connected is better make todolist
* the one connected and pass to the todos the callback to dispach the actions.
* Intead of passing an object with many properties is better to pass an only one
* object property "send" of type ISendActionTodo to have a short robust code easy
* to propagate to each todos
*/
interface ITodoListParams {
  todos: List<ITodo>;     //filtered todos
  send: ISendActionTodo;  //dispach interface
};

export const TodoList = ( { todos, send }: ITodoListParams ) => {
  if ( todos.length > 0) {
    /**
    * [hyperscript-helpers](https://github.com/ohanhi/hyperscript-helpers) node are created
    * using this syntax
    * tagName(selector)
    * tagName(attrs)
    * tagName(children)
    * tagName(attrs, children)
    * tagName(selector, children)
    * tagName(selector, attrs, children)
    */
    return html.div(".w3-continer .w3-card-4",
      /*
      * I need to have an header first so I have to concat it to the rest of
      * the todo list
      */
      [ html.h4(".w3-indigo .w3-opacity", "Todo list")].concat(
        toArray(map((todo: ITodo) => (
          h(Todo, {
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
            enabled: todo.enabled,
            editMode: todo.editMode,
            send //easy to propagate dispatch interface
          })
        ), todos))
      )
    );
  } else {
    return;
  }
};
export default TodoList;
