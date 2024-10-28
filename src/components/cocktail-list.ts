import { component } from 'haunted';
import { html } from 'lit-html';

const CocktailList = () => {
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
    <p>hej</p>
  `;
};

customElements.define('cocktail-list', component(CocktailList));
