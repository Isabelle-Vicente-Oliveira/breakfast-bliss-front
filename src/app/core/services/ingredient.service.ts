import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Ingredient } from "../interfaces/ingredient.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class IngredientService {
    private http = inject(HttpClient);
    private apiUrl = import.meta.env.VITE_BREAKFAST_API;

    getAllIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(`${this.apiUrl}/ingredients`);
    }
}