import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CreateDtoUser, User } from "../interfaces/user.interface";
import { Observable, tap } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class UserService {
    private http = inject(HttpClient);
    private apiUrl = import.meta.env.VITE_BREAKFAST_API


    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/users`)
    }

    createUser(user: CreateDtoUser): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(
            tap(() => this.getUsers())
        )
    }
}