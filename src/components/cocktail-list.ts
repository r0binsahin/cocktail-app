import { component, useEffect, useState } from 'haunted';
import { html } from 'lit-html';
import { Cocktail } from '../types';

const CocktailList = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  const searchCocktails = async (query: string) => {
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
    </style>
    ${cocktails.map((cocktail) => {
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
          
            </div>
          </div>
        </div>
      `;
    })}
  `;
};

customElements.define('cocktail-list', component(CocktailList));
