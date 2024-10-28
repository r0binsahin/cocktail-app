import { component } from 'haunted';
import { html } from 'lit-html';

import './components/cocktail-list';
import './components/search-bar';
import './components/shopping-list';

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
      .results {
        flex: 2;
      }
      .shopping {
        grid-column: 2;
        position: sticky;
        top: 20px;
      }
      @media (max-width: 768px) {
        .container {
          flex-direction: column;
        }

        .shopping {
          position: static;
        }
      }
    </style>
    <div class="container">
      <div class="results">
        <search-bar></search-bar>
        <cocktail-list></cocktail-list>
      </div>
      <div class="shopping">
        <shopping-list></shopping-list>
      </div>
    </div>
  `;
};

customElements.define('cocktail-app', component(CocktailApp));
