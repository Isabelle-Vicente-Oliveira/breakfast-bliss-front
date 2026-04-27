import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuItemService } from '../../../../core/services/menu-item.service';
import { MenuItem } from '../../../../core/interfaces/menu.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap, of, catchError } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { ButtonQuantity } from "../../../../shared/components/button-quantity/button-quantity";

@Component({
  selector: 'app-menu-item-details',
  imports: [MatIcon, ButtonQuantity, RouterLink],
  templateUrl: './menu-item-details.html',
  styleUrl: './menu-item-details.scss',
})
export class MenuItemDetails {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private menuItemService = inject(MenuItemService);
  public authService = inject(AuthService);
  protected readonly apiUrl = 'http://localhost:3337/files';


  menuItem = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        if (!id) return of(null);
        return this.menuItemService.getById(id).pipe(
          catchError(() => {
            this.router.navigate(['/home']);
            return of(null);
          })
        );
      })
    ),
    { initialValue: null }
  );
}