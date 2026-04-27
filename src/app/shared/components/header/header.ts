import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MenuItemService } from '../../../core/services/menu-item.service';
import { MatDialog } from '@angular/material/dialog';
import { CartModal } from '../cart/cart';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public authService = inject(AuthService);
  public cartService = inject(CartService);
  private menuItemService = inject(MenuItemService)
  private readonly dialog = inject(MatDialog);



  openModal() {
    return this.dialog.open(CartModal, {
      disableClose: false,
      position: {
        top: '8rem',
        right: '0'
      },
      panelClass: 'side-menu-panel'
    });
  }


  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.menuItemService.updateSearch(value);

  }

  logout() {
    this.authService.logout()
  }
}
