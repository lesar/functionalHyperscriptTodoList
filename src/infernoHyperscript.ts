/**
* Useful to export html object an h function to easy create html node
*/
import { h } from 'inferno-hyperscript';
import hh from 'hyperscript-helpers';
export { h };

export const html = hh(h); // Notice the (h): hyperscript-helpers si aspettano h come parametro
export default html;
