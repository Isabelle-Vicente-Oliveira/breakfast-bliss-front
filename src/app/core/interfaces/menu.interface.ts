import { MenuItemIngredient } from "./ingredient.interface";

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    available: boolean;
    category: string;
    ingredients: MenuItemIngredient[];
}

export interface CreateMenuItem {
    name: string;
    description: string;
    price: number | string;
    category: string;
    image?: File | null;
    ingredients?: string[];
    available?: boolean;
}