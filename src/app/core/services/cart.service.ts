import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Cart } from "../interfaces/cart.interfacae";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private http = inject(HttpClient);
    private apiUrl = import.meta.env.VITE_BREAKFAST_API;

    private _cart = signal<Cart | null>(null);

    public cart = this._cart.asReadonly();

    constructor() {
        this.getCart().subscribe();
    }

    getCart(): Observable<Cart> {
        return this.http.get<Cart>(`${this.apiUrl}/cart-item`).pipe(
            tap(res => this._cart.set(res))
        );
    }

    createCart(cartItem: { menuItemId: string, quantity: number }): Observable<Cart> {
        return this.http.post<Cart>(`${this.apiUrl}/cart-item`, cartItem).pipe(
            tap(() => this.getCart().subscribe())
        );
    }

    updateCart(id: string, quantity: number): Observable<Cart> {
        return this.http.patch<Cart>(`${this.apiUrl}/cart-item/${id}`, { quantity }).pipe(
            tap((res) => {
                this.getCart().subscribe();
            })
        );
    }
}