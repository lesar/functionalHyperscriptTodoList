export interface IAction {
  type: string;
}
export interface IActionP<P> extends IAction {
  payload: P;
  error: boolean;
}
export interface IActionPM<P, M> extends IActionP<P> {
  meta: M;
}
export interface IActionCreator {
  (): IAction;
};
export interface IActionCreatorP<A, P> {
  (args: A): IActionP<P>;
};
export interface IActionCreatorPM<A, P, AM, M> {
  (args: A, argsM: AM): IActionPM<P, M>;
};
export interface IPayloadCreator<A, P> {
  (args: A): P;
};
export interface IMetaCreator<A, M> {
  (args: A): M;
};
/**
 * return a action SFA creator completed by payload and meta
 * @param type string constant identify the action
 * @param payloadCreator 
 * @param metaCreator 
 */
export function createActionPM<A, AM, P, M>(
  type: string, 
  payloadCreator: IPayloadCreator<A, P>, 
  metaCreator: IMetaCreator<AM, M>
): IActionCreatorPM<A, P, AM, M> {
  const actionCreator = (args: A, argsM: AM): IActionPM<P, M> => {
    let payload: P = payloadCreator(args);
    let result: IActionPM<P, M> = { 
      type,
      payload,
      error: payload instanceof Error,
      meta: metaCreator(argsM)
    };
    return result;
  };
  return actionCreator;
}
/**
 * return a action SFA creator completed by payload
 * @param type string constant identify the action
 * @param payloadCreator 
 */
export function createActionP<A, P>(
  type: string, 
  payloadCreator: IPayloadCreator<A, P>
): IActionCreatorP<A, P> {
  const actionCreator = (args: A): IActionP<P> => {
    let payload: P = payloadCreator(args);
    let result: IActionP<P> = { 
      type,
      payload,
      error: payload instanceof Error
    };
    return result;
  };
  return actionCreator;
}
/**
 * return a action SFA creator
 * @param type string constant identify the action
 */
export function createAction(type: string): IActionCreator {
  const actionCreator = (): IAction => {
    let result: IAction = { 
      type
    };
    return result;
  };
  return actionCreator;
}
export default createAction;