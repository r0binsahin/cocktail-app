export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  [key: string]: string | null;
}

export interface Ingredient {
  name: string;
  measure: string;
}
