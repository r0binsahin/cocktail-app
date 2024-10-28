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
  };

  const printList = () => {
    const printWindow = window.open('', '', 'width=600,height=600');

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Shopping List</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { margin-bottom: 20px; }
              ul { list-style-type: none; padding: 0; }
              li { margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <h1>Cocktail Shopping List</h1>
            <ul>
              ${ingredients
                .map((ing) => `<li>${ing.measure} ${ing.name}</li>`)
                .join('')}
            </ul>
          </body>
        </html>
      `);

      printWindow.document.close();

      printWindow.print();
    }
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
    <style>
      .shopping-list {
        min-width: 350px;
        height: 90vh;
        background: white;
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow-y: scroll;
      }
      h2 {
        margin-top: 0;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #eee;
      }
      .remove-button {
        width: 30px;
        height: 30px;
        background: #f44336;
        color: #fff;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
      }
      .print-button {
        background: #2196f3;
        color: #fff;
        border: none;
        padding: 10px 18px;
        border-radius: 16px;
        cursor: pointer;
        margin-top: 20px;
        font-size: 16px;
      }
    </style>
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
      ${ingredients.length > 0
        ? html`<button class="print-button" @click=${printList}>Print</button>`
        : html`<p>No ingredients added yet.</p>`}
    </div>
  `;
};

customElements.define('shopping-list', component(ShoppingList));
