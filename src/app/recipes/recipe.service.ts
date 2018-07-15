import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as firebase from 'firebase';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  
 
  private recipes: Recipe[] = [
    new Recipe(
    'Cheese Burger', 
    'An awesome cheese burger with fries', 
    'https://static.pexels.com/photos/70497/pexels-photo-70497.jpeg',
    [
        new Ingredient('meat', 1),
        new Ingredient('french fries', 20),
        new Ingredient('buns', 2)
    ]),
    new Recipe(
    'Schnitzel', 
    'large schnitzel goes great with beer!', 
    'https://www.savoredjourneys.com/wp-content/uploads/2015/10/schnitzel-germany.jpg',
    [
        new Ingredient('meat', 1),
        new Ingredient('french fries', 30),
        new Ingredient('bread crumbs', 1000)
    ])
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
     
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
