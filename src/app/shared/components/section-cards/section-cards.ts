import { Component, computed, inject } from '@angular/core';
import { MenuItemService } from '../../../core/services/menu-item.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Card } from '../card/card';
import { MenuItem } from '../../../core/interfaces/menu.interface';

@Component({
  selector: 'app-section-cards',
  imports: [Card],
  templateUrl: './section-cards.html',
  styleUrl: './section-cards.scss',
})
export class SectionCards {
  private menuItemService = inject(MenuItemService);

  menu = toSignal(this.menuItemService.menus$, { initialValue: [] })

  menuGrouped = computed(() => {
    const group: { [key: string]: MenuItem[] } = {};

    this.menu().forEach(item => {
      if (!group[item.category]) {
        group[item.category] = [];
      }
      group[item.category].push(item);
    });

    return Object.keys(group).map(category => ({
      name: category,
      itens: group[category]
    }));
  });

}
