import { component, useEffect, useState } from 'haunted';
import { html } from 'lit-html';
import { Cocktail, Ingredient } from '../types';

const CocktailList = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);

  const searchCocktails = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      setCocktails(data.drinks || []);

      if (data.drinks && data.drinks.length) {
        console.log('res:', data.drinks);
      } else {
        console.log('something went wrong');
      }
    } catch (error) {
      console.error('Search error:', error);
    }
    setLoading(false);
  };

  const getIngredients = (cocktail: Cocktail): Ingredient[] => {
    const ingredients: Ingredient[] = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push({
          name: ingredient,
          measure: measure || '',
        });
      }
    }
    return ingredients;
  };

  const addToShoppingList = (ingredients: Ingredient[]) => {
    const event = new CustomEvent('add-ingredients', {
      detail: ingredients,
      bubbles: true,
      composed: true,
    });

    dispatchEvent(event);
  };

  useEffect(() => {
    window.addEventListener('search', ((e: CustomEvent) => {
      searchCocktails(e.detail);
    }) as EventListener);

    return () => {
      window.removeEventListener('search', ((e: CustomEvent) => {
        searchCocktails(e.detail);
      }) as EventListener);
    };
  }, []);

  return html`
    <style>
      .cocktail-card {
        background: #edf7d2;
        border-radius: 16px;
        padding: 20px;
        margin-bottom: 20px;
        display: flex;
        gap: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        align-items: flex-start;
      }
      .cocktail-image {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 16px;
      }

      .text-box {
        width: 100%;
      }

      .btn-box {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
      .add-button {
        width: 48px;
        height: 48px;
        background: #386c0b;
        color: #fff;
        border: none;
        padding: 16px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
      }
      .loading {
        text-align: center;
        padding: 20px;
        color: #fff;
      }

      .ingredients-list {
        list-style-type: none;
        padding: 0;
        margin: 10px 0 0 0;
      }
      .ingredient-item {
        margin-bottom: 5px;
      }
    </style>

    ${loading
      ? html`<div class="loading">Searching...</div>`
      : cocktails.map((cocktail) => {
          const ingredients = getIngredients(cocktail);
          return html`
            <div class="cocktail-card">
              <img
                class="cocktail-image"
                src=${cocktail.strDrinkThumb}
                alt=${cocktail.strDrink}
              />
              <div class="text-box">
                <h2>${cocktail.strDrink}</h2>
                <p>${cocktail.strInstructions}</p>
                <ul class="ingredients-list">
                  ${ingredients.map(
                    (ingredient) =>
                      html`<li class="ingredient-item">
                        ${ingredient.name} ${ingredient.measure}
                      </li>`
                  )}
                </ul>
                <div class="btn-box">
                  <button
                    class="add-button"
                    @click=${() => addToShoppingList(ingredients)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          `;
        })}
  `;
};

customElements.define('cocktail-list', component(CocktailList));
