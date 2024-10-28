import { component, useEffect, useState } from 'haunted';
import { html } from 'lit-html';
import { Ingredient } from '../types';

const ShoppingList = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const addIngredients = (newIngredients: Ingredient[]) => {
    setIngredients((prev) => {
      if (!prev) {
        prev = [];
      }
      const combined = [...prev];

      newIngredients.forEach((newIng) => {
        const existing = combined.findIndex(
          (ing) => ing.name.toLowerCase() === newIng.name.toLowerCase()
        );

        if (existing === -1) {
          combined.push(newIng);
        }
      });
      return combined;
    });
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev!.filter((_, i) => i !== index));

    const event = new CustomEvent('show-toast', {
      detail: 'Ingredient removed from shopping list.',
      bubbles: true,
      composed: true,
    });

    dispatchEvent(event);
  };
  useEffect(() => {
    window.addEventListener('add-ingredients', ((e: CustomEvent) => {
      addIngredients(e.detail);
    }) as EventListener);

    return () => {
      window.removeEventListener('add-ingredients', ((e: CustomEvent) => {
        addIngredients(e.detail);
      }) as EventListener);
    };
  }, []);

  return html`
    <style></style>
    <div class="shopping-list">
      <h2>Shopping List</h2>
      <ul>
        ${ingredients.map(
          (ing, index) => html`
            <li>
              ${ing.measure} ${ing.name}
              <button
                class="remove-button"
                @click=${() => removeIngredient(index)}
              >
                ×
              </button>
            </li>
          `
        )}
      </ul>
    </div>
  `;
};

customElements.define('shopping-list', component(ShoppingList));
