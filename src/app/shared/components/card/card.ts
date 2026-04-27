import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";
import { AuthService } from '../../../core/services/auth.service';
import { MenuItem } from '../../../core/interfaces/menu.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ButtonQuantity } from '../button-quantity/button-quantity';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButtonModule, MatIcon, CurrencyPipe, RouterLink, ButtonQuantity],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  public authService = inject(AuthService);
  protected readonly apiUrl = 'http://localhost:3337/files';
  menuItem = input.required<MenuItem>();

}
