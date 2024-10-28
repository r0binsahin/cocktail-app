import { component } from 'haunted';
import { html } from 'lit-html';

const ShoppingList = () => {
  return html`
    <style></style>
    <div class="shopping-list">
      <h2>Shopping List</h2>
    </div>
  `;
};

customElements.define('shopping-list', component(ShoppingList));
