import { connect } from 'inferno-redux';
import { setVisibilityFilter } from './todos/redux/actions/setVisibilityFilter';
import { Link } from './link';
import { IState, IFilter } from './app';

/**
 * mapStateToProps: this function allows you to update automatically
 * a component once changed the store: as soon as the store changes it calls
 * this function passing his status, optional is passed ownProps: current
 * properties of the component. A new property object that will be merged with
 * the properties of the component is returned. this object is often called
 * a selector and [reselect](https://github.com/reactjs/reselect)
 * but this time the calc to get visibility filter is few so is not necessary 
 * use reselect. state.visivility filter remain the old object if it is not changed
 */
const mapStateToProps = (state: IState) => ({
  filter: state.visibilityFilter
});

/**
 * If this is an object every property will be traslate in an
 * action creator wrapped into a dispach call. This object wil be merged with
 * the ownProps: the current properties of the component.
 * If this is a function you have to use the provided dispatch and the optional
 * ownProps (the current properties of the component) to return a new object that
 * have every property as a method dispaccing a new action.
 * This object will be merged with ownProps
 */
const mapDispatchToProps = (dispatch: any) => ({
  onClick: (filter: IFilter) => {
    dispatch(setVisibilityFilter({filter}))
  }
});

/**
 * FilterLink is a new Link component but is connected to all store change
 */
const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterLink;
