import { component } from 'haunted';
import { html } from 'lit-html';

import './components/cocktail-list';

const CocktailApp = () => {
  return html`
    <style>
      .container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        gap: 20px;
      }
    </style>
    <div class="container">
      <cocktail-list></cocktail-list>
    </div>
  `;
};

customElements.define('cocktail-app', component(CocktailApp));
