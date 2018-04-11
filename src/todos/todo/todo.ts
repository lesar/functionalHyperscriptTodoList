/**
* Todo is a presentational component to visualize and edit todo object
*/
import { connect } from 'inferno-redux';
import html from '../../infernoHyperscript';
import { IRefAction, IRefValueAction } from '../../redux/interfaces'
const { div, span, i } = html;
import classNames from 'classnames';
import './todo.css';

/**
* Todo interface
*/
export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  enabled: boolean;
  editMode: boolean;
};
/**
* calback interface provided by the container component VisibleTodoList
*/
export interface ISendActionTodo {
  onTodoClick({id}: IRefAction):void;
  onTodoEditClick({id}: IRefAction):void;
  onTodoDeleteClick({id}: IRefAction):void;
  onTodoToggleEnableClick({id}: IRefAction):void;
  onSaveTodoEnter({id, text}: IRefValueAction):void;
  //onEditSetValue({id, text}: IRefValueAction):void;
}

/**
* provided params to todo object
*/
interface ITodoParams extends ITodo {
  send: ISendActionTodo;
  onComponentDidUpdate(lastProps: ITodo, nextProps: ITodo): void,
  onComponentShouldUpdate(lastProps: ITodo, nextProps: ITodo):boolean;
};
/**
* to handle set focus and to get value
*/
export const TodoPrebind = ( { id, title, completed, enabled, editMode, send }: ITodoParams ) => {
  let input1: HTMLInputElement;
  return div({
      id,
      className: "w3-hover-sand w3-row-padding w3-border-grey w3-border-bottom",
    }, [
      /**
      * this is only some html and css composing. note the i element is using
      * [google material icons](https://fonts.googleapis.com/icon?family=Material+Icons)
      * I use the small [W3-CSS](https://www.w3schools.com/w3css/4/w3.css) responsive css
      */
      div('.w3-col .w3-right w3-container', {style: 'width: 180px;'}, [
        span(".w3-tooltip .w3-padding-16", [
          span('.w3-text .w3-tag', {style: 'position:absolute;right:20px;bottom:38px; z-index:12;'}, 'edit'),
          i({
              className: "material-icons w3-text-teal w3-button",
              onClick: () => { 
                send.onTodoEditClick({id}); 
                input1.value = title; 
                input1.focus();
              }
            }, "mode_edit")
        ]),
        span(".w3-tooltip .w3-padding-16", [
          span('.w3-text .w3-tag', {style: 'position:absolute;right:20px;bottom:38px; z-index:12;'}, 'enable/disable'),
          i({
              className: "material-icons w3-text-teal w3-button",
              onClick: () => send.onTodoToggleEnableClick({id})
            }, (enabled ? "check_box": "check_box_outline_blank"))
        ]),
        span(".w3-tooltip", [
          span('.w3-text .w3-tag', {style: 'position:absolute;right:0;bottom:28px; z-index:12;'}, 'delete toltip'),
          span({
                className: "w3-button w3-red",
                onClick: () => send.onTodoDeleteClick({id})
              }, [ "\u00D7" ])
        ]),
      ]),
      div('.w3-rest .w3-container', [
      html.input({
        className: 'w3-input',
        type: 'text',
        //value: title,
        /**
        * edit mode control this input visibility
        */
        style: 'display: ' + (editMode ? 'block;':'none;'),
        /**
        * **ref** set input1 value to the html dom node to be use later
        */
        ref: (node: HTMLInputElement) => { input1 = node; },
        /**
        * enter in edit mode
        */
        onKeyPress: (event: KeyboardEvent) => {
          if(event.key == 'Enter'){
            event.preventDefault();
            if (!input1.value.trim()) { return }
            send.onSaveTodoEnter({id, text: input1.value});
          }
        },
        /**
        * toggle edit mode
        */
        onKeyDown: (event: KeyboardEvent) => {
          switch(event.key) {
            case 'Escape':
            case 'Esc':
              send.onTodoEditClick({id})
              break;
          }
        }
        /*,
        onInput: (event: any) => {
          event.preventDefault();
          let value: string = event.target.value;
          if (!value.trim()) { return }
          send.onEditSetValue(id, value);
        }*/
      }),
      div({
        /**
        * [classNames](https://github.com/JedWatson/classnames) is a small
        * useful library to easy control class assignment
        */
        className: classNames('todo' , { completed: completed, enabled: enabled, disabled: !enabled}),
        style: 'display: ' + (!editMode ? 'block;':'none;'),
        onClick: () => send.onTodoClick({id}),
      }, [title])
    ])
  ]);
};

/**
* an example of optimization: a target check comparing only significant property
* this is dangerous: it's easy to change ITodo interface and forget to update
* this check. If you do not update this check your interface do no repaint on
* changing status
*/
function onComponentShouldUpdate(lastProps: ITodo, nextProps: ITodo):boolean {
  let shoulUpdate: boolean = !(lastProps.id == nextProps.id &&
    lastProps.title == nextProps.title &&
    lastProps.enabled == nextProps.enabled &&
    lastProps.editMode == nextProps.editMode &&
    lastProps.completed == nextProps.completed);
  //console.log(`todo id=${nextProps.id} should update is: + ${shoulUpdate}`);
  return shoulUpdate;
}
/**
* on every repaint I set focus on input
*/
function onComponentDidUpdate() {
}
const mapDispatchToProps = (dispatch: any) => ({
  ref: {
      onComponentDidUpdate,
      onComponentShouldUpdate
  }
});
const Todo = connect(
  null,
  mapDispatchToProps
)(TodoPrebind);
export default Todo;
