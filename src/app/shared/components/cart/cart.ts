import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { ButtonQuantity } from "../button-quantity/button-quantity";
import { CurrencyPipe } from '@angular/common';
import { MatDialogContent, MatDialogModule } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-cart',
  imports: [ButtonQuantity, CurrencyPipe, MatDialogModule, MatDialogContent, MatIcon],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartModal {
  private cartService = inject(CartService);
  protected readonly apiUrl = 'http://localhost:3337/files';

  cart = this.cartService.cart;
}
