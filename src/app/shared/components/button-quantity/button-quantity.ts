import { Component, computed, effect, inject, input, OnInit, signal, untracked, } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { CartService } from '../../../core/services/cart.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-button-quantity',
  imports: [MatIcon],
  templateUrl: './button-quantity.html',
  styleUrl: './button-quantity.scss',
})
export class ButtonQuantity {
  idItem = input.required<string | undefined>();
  idItemCard = '';
  private cartService = inject(CartService);
  private toastService = inject(ToastService)


  localQuantity = signal<number>(0);

  constructor() {
    effect(() => {
      const cartData = this.cartService.cart();
      const targetId = this.idItem();

      if (!cartData) return;

      const itemInCart = cartData.items.find(
        (item) => String(item.menuItemId) === String(targetId)
      );
      if (!itemInCart) return
      console.log(itemInCart)
      this.idItemCard = itemInCart.id

      untracked(() => {
        this.localQuantity.set(itemInCart ? itemInCart.quantity : 0);
      });
    });
  }

  incrementQuantity(): void {
    this.localQuantity.update(q => q + 1);

  }

  decrementQuantity(): void {
    this.localQuantity.update(q => (q > 0 ? q - 1 : 0));
  }

  include(): void {
    const quantity = this.localQuantity();
    const menuItemId = this.idItem();

    if (this.idItemCard) {
      this.cartService.updateCart(this.idItemCard, quantity).subscribe({
        next: () => this.toastService.show('Quantidade atualizada!', 'success'),
        error: () => this.toastService.show('Erro ao atualizar', 'error')
      });
    }
    else if (menuItemId) {
      const payload = { menuItemId: menuItemId, quantity: quantity };

      this.cartService.createCart(payload).subscribe({
        next: () => {
          this.toastService.show('Item adicionado ao carrinho!', 'success');
        },
        error: () => this.toastService.show('Erro ao adicionar item', 'error')
      });
    }
  }
}
