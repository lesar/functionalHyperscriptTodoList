/**
* Link component set the new state filters
*/
import html from './infernoHyperscript';
import { IFilter, Filter, CompletedFilter, EnabledFilter } from './app';

/**
* provided params to Link object interface
*/
export interface ILinkParams {
  filter: IFilter;
  onClick: (filter: IFilter) => void;
};

/**
* return a new link using our dispatch interface onClic to dispatch new filter
* this leaves the enabled filter unchanged
*/
function linkCompleted(
  filter: IFilter, 
  value: CompletedFilter, 
  onClick: (filter: IFilter) => void 
) {
  return html.a({
    href: "#",
    className: 'w3-bar-item w3-button',
    onClick: (e: Event) => {
      e.preventDefault();
      let newFilter: IFilter = new Filter( value, filter.enabled);
      //this.props.filter = newFilter,
      onClick(newFilter);
    }
  }, CompletedFilter[value]);
}
/**
* return a new link using our dispatch interface onClic to dispatch new filter
* this leaves the completed filter unchanged
*/
function linkEnabled(
  filter: IFilter, 
  value: EnabledFilter, 
  onClick: (filter: IFilter) => void 
) {
  return html.a({
    href: "#",
    className: 'w3-bar-item w3-button',
    onClick: (e: Event) => {
      e.preventDefault();
      let newFilter: IFilter = new Filter(filter.completed, value);
      //this.props.filter = newFilter,
      onClick(newFilter);
    }
  }, EnabledFilter[value]);
}
export const Link = ( { filter, onClick }: ILinkParams ) => {
  return (html.div([
    html.div('.w3-dropdown-hover', [
      html.button('.w3-button', CompletedFilter[filter.completed]),
      html.div('.w3-dropdown-content .w3-bar-block .w3-border', [
        linkCompleted(filter, CompletedFilter.All, onClick),
        linkCompleted(filter, CompletedFilter.Uncompleted, onClick),
        linkCompleted(filter, CompletedFilter.Completed, onClick)
      ])
    ]),
    html.div('.w3-dropdown-hover', [
      html.button('.w3-button', EnabledFilter[filter.enabled]),
      html.div('.w3-dropdown-content .w3-bar-block .w3-border', [
        linkEnabled(filter, EnabledFilter.All, onClick),
        linkEnabled(filter, EnabledFilter.Disabled, onClick),
        linkEnabled(filter, EnabledFilter.Enabled, onClick)
      ])
    ])
  ]));
};
export default Link;
