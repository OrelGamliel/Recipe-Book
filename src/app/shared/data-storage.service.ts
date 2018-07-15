import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,              
              private authService: AuthService) {
  }
 
  storeRecipes() {
    const req = new HttpRequest('PUT', 'https://recipe-book-e0cac.firebaseio.com/recipe.json', this.recipeService.getRecipes(), {reportProgress: true});
    return this.httpClient.request(req);
  }
  storeShoppingList() {
    const req = new HttpRequest('PUT', 'https://recipe-book-e0cac.firebaseio.com/shoppingList.json', this.shoppingListService.getIngredients(), {reportProgress: true});
    return this.httpClient.request(req);
  }
 
  getRecipes() {
    this.httpClient.get<Recipe[]>('https://recipe-book-e0cac.firebaseio.com/recipe.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
          console.log(recipes);
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      ); 
  }
  getIngredients() {
    this.httpClient.get<Ingredient[]>('https://recipe-book-e0cac.firebaseio.com/shoppingList.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (ingredients) => {
          console.log(ingredients);
          for (let ingredient of ingredients) {
            if (!ingredient) {
              ingredients = [];
            }
          }
          return ingredients;
        }
      )
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.shoppingListService.setIngredients(ingredients);
        }
      );
  }
}
