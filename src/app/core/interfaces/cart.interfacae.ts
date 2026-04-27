import { MenuItem } from "./menu.interface";

export interface Cart {
    items: Array<CartItem>,
    totalPrice: number,
    totalItem: number
}

export interface CartItem {
    id: string;
    userId: string,
    menuItemId: string,
    menuItem?: MenuItem;
    quantity: number,
    createdAt: string,
    total: number,
}