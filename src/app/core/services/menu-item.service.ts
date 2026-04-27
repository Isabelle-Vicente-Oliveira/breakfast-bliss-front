import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { MenuItem } from "../interfaces/menu.interface";
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, switchMap, shareReplay, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MenuItemService {
    private http = inject(HttpClient);
    private apiUrl = import.meta.env.VITE_BREAKFAST_API


    private searchTerm$ = new BehaviorSubject<string>('');
    private refreshList$ = new BehaviorSubject<void>(undefined);

    menus$ = combineLatest([
        this.refreshList$,
        this.searchTerm$.pipe(debounceTime(300), distinctUntilChanged())
    ]).pipe(
        switchMap(([_, name]) => {
            let params = new HttpParams();
            if (name) {
                params = params.set('name', name);
            }
            return this.http.get<MenuItem[]>(`${this.apiUrl}/menu-items`, { params });
        }),
        shareReplay(1)
    );

    updateSearch(name: string) {
        this.searchTerm$.next(name);
    }

    private triggerRefresh() {
        this.refreshList$.next();
    }

    createMenuItem(menuItem: FormData): Observable<MenuItem> {
        return this.http.post<MenuItem>(`${this.apiUrl}/menu-items`, menuItem).pipe(
            tap(() => this.triggerRefresh())
        );
    }

    updateMenuItem(id: string, menuItem: FormData): Observable<MenuItem> {
        return this.http.patch<MenuItem>(`${this.apiUrl}/menu-items/${id}`, menuItem).pipe(
            tap(() => this.triggerRefresh())
        );
    }

    getById(id: string): Observable<MenuItem> {
        return this.http.get<MenuItem>(`${this.apiUrl}/menu-items/${id}`)
    }




}