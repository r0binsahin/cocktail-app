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
      .container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        gap: 20px;
      }
    </style>
    ${cocktails.map((cocktail) => {
      return html` <div><p>${cocktail.strDrink}</p></div>`;
    })}
  `;
};

customElements.define('cocktail-list', component(CocktailList));
