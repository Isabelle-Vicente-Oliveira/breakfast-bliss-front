export interface Ingredient {
    id: string;
    name: string;
    description?: string;
}

export interface MenuItemIngredient {
    ingredient: Ingredient;
}