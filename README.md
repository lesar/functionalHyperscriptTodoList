# functionalHyperscriptTodoList

This is a todo list example.  

It is his first release and I have some little problem to fix on one package that make compilation warning. I hope to fix it soon.  
All code is working.  
I haven't written mocha test.

Is the same example [here][19] but this time I have use a ***Functional*** style.  
I have updated some library and add some change.  
Read first this [readme][19]

The *TodoList* application is the same: this help to learn the difference from *standard Component* and *Functional Component* style.  
The example is too simple to appreciate the reason Functional Programming is a good choise but is a starting point.  

##structure
I have changed the structure: where and how create actions and reducers and how to bring and bind all together.  
I have read some good idea in [A new approach to managing Redux actions][31]

So I have put all redux stuf in redux folder in all project folder.  
The actions are no more created all together but I use one file for one action and put his reducer in the same file.  
Actions is [FSA][30] although I use type over his payload.  
I use On big costant file in /redux folder and on it all string constan that are key for actions (the Action.type field). So cannot be same costant define two time. All action file import from this file their action type costant.  
In the /redux/reducer.ts I import all actions to build the final reducer. All action file have a Reducer object and I put all together in this manner:  

```javascript
const reducerObj = Object.assign({},
  //editSetValueReducerObj,
  addTodoReducerObj,
  todoCompleteToggleReducerObj,
  todoDeleteReducerObj,
  todoEditReducerObj,
  todoEnableToggleReducerObj,
  todoSaveEditReducerObj
);
```  
In very complex project we can create intermediate reducer object to realize a complex tree.  
After we have our tree and his root on *reduceObj* we can use [type-to-reducer][20] to have hour final reducer.  
This is an easy way to write action and reducer.


In this example I use:  

- [TypeScript][1] a beautiful meta language
- [Infernojs][2] a great react like framework
- [Redux][3] a predictable state container for JavaScript apps to make more easy store and state manage on application component
- [inferno-redux][14] an inferno library to pass context.store to each component and more
- [Hyperscript][4] an alternative to [JSX][5] way
- [inferno-hyperscript][15] Hyperscript syntax for Inferno templates
- [Hyperscript helper][12] useful way to take benefit by Hyperscript
- [W3CSS][13] a modern CSS framework with built-in responsiveness
- [Webpack][6] to put all together
- [Reselect][17] optimization calculate state selection
- [type-to-reducer][20] Create reducer functions based on an object keyed by action types. It helps to organize the Redux reducers
- [rambda][21] a small and fast alternative to [Ramda][23]. Rambda help is [here][22].
- [list][24] a small but great library to handle Big data list ensuring list immutability.  

## Why this tool set

To see the first tools look at [readme][19].  
### Rambda  
Is a good tool to avoid to rewriting a lot of functional code and have a small size. It is easy to understand and is quick.  
Rambda is tree-shaking: it only imports what is used. See this [example][28]  
There is big sister also: look at [rambdax][29] 

###List  
Is a wonderful library it achieves immutability on big data list. 
Instead, to use a big framework to immutability, *list* is a good shortcut. His size is small and is super fast. To work on other type than list and achieve immutability we can use standard vanilla javascript technique like [Object.assign()][25], [de-structuring assignment][26], [Rest parameters][27], ...

##final considerations  
Both Rambda than List are not necessary to this example. This is due to the simple nature of this example.  
Writing real application and using big data make both tools more useful.


## How to start
You have to install [npm][16] then you have to go on terminal and change folder to source project and do `npm install` this download and install all dependencies.

`npm run start` start a server on port 8080, you can see it on your browser on url http://localhost:8080/

`npm run build` make a production build on *dist* folder. Here you can see the code is more small due to production optimization.


[1]:https://www.typescriptlang.org
[2]:https://github.com/infernojs/inferno
[3]:https://redux.js.org/
[4]:https://github.com/hyperhype/hyperscript
[5]:https://jsx.github.io/
[6]:https://webpack.js.org
[7]:https://reactjs.org/docs/typechecking-with-proptypes.html
[8]:https://reactjs.org
[9]:https://facebook.github.io/flux/docs/in-depth-overview.html
[10]:https://github.com/facebook/flux/tree/master/examples/flux-concepts
[11]:https://facebook.github.io/flux/
[12]:https://github.com/ohanhi/hyperscript-helpers
[13]:https://www.w3schools.com/w3css/default.asp
[14]:https://github.com/infernojs/inferno/tree/master/packages/inferno-redux
[15]:https://github.com/terinjokes/inferno-hyperscript
[16]:https://www.npmjs.com/
[17]:https://github.com/reactjs/reselect
[18]:https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
[19]:https://github.com/lesar/hyperscriptTodoList
[20]:https://github.com/tomatau/type-to-reducer
[21]:https://github.com/selfrefactor/rambda
[22]:https://selfrefactor.github.io/rambda/#/
[23]:http://ramdajs.com/
[24]:https://github.com/funkia/list
[25]:https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
[26]:https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
[27]:https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Functions_and_function_scope/rest_parameters
[28]:https://github.com/selfrefactor/tree-shaking-example
[29]:https://github.com/selfrefactor/rambdax
[30]:https://github.com/redux-utilities/flux-standard-action
[31]:https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da