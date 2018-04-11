import FilterLink from './filterLinks';
import { html, h } from './infernoHyperscript';

export const Footer = () => {
  return html.div('.w3-bar .w3-teal .w3-container .w3-margin-top',
    [html.div('.w3-bar-item ', "Filter: "),
      h(FilterLink),
    ]
  )
};

export default Footer;
