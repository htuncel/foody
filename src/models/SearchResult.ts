// returned data model from
// https://api.spoonacular.com/food/ingredients/search?query=cake&apiKey=XYZ
interface SearchResult {
  results: Ingredient[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface Ingredient {
  id: number;
  name: string;
  image: string;
}

export default SearchResult;
