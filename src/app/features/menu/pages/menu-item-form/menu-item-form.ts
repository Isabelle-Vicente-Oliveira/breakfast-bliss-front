import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuItemService } from '../../../../core/services/menu-item.service';
import { IngredientService } from '../../../../core/services/ingredient.service';
import { ToastService } from '../../../../core/services/toast.service';
import { MenuItem } from '../../../../core/interfaces/menu.interface';
import { MenuItemIngredient } from '../../../../core/interfaces/ingredient.interface';

@Component({
  selector: 'app-menu-item-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './menu-item-form.html',
  styleUrl: './menu-item-form.scss',
})
export class MenuItemForm implements OnInit {
  private menuItemService = inject(MenuItemService);
  private ingredientService = inject(IngredientService)
  private toastService = inject(ToastService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  mode: 'create' | 'edit' = 'create';
  itemId: string | null = null;
  newIngredient: string = '';

  allIngredientsFromDatabase: any[] = [];
  ingredientDisplayNames: string[] = [];

  menuItemForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl<string | number | null>(null, [Validators.required]), category: new FormControl('', [Validators.required]),
    image: new FormControl<File | string | null>(null),
    ingredients: new FormControl<string[]>([], [Validators.required]),
  });

  ngOnInit() {
    this.loadAllAvailableIngredients();

    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) {
      this.mode = 'edit';
      this.loadItemData(this.itemId);
    }
  }

  private loadAllAvailableIngredients() {
    this.ingredientService.getAllIngredients().subscribe(data => {
      this.allIngredientsFromDatabase = data;
    });
  }



  private loadItemData(id: string) {
    this.menuItemService.getById(id).subscribe({
      next: (item: MenuItem) => {
        const ids = item.ingredients.map((i: MenuItemIngredient) => i.ingredient.id);
        this.ingredientDisplayNames = item.ingredients.map((i: any) => i.ingredient.name);

        this.menuItemForm.patchValue({
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          ingredients: ids
        });
      },
      error: () => this.router.navigate(['/home'])
    });
  }

  addIngredient() {
    const name = this.newIngredient.trim();
    if (!name) return;

    const found = this.allIngredientsFromDatabase.find(
      i => i.name.toLowerCase() === name.toLowerCase()
    );

    if (found) {
      const currentIds = this.menuItemForm.controls.ingredients.value || [];

      if (!currentIds.includes(found.id)) {
        this.menuItemForm.patchValue({
          ingredients: [...currentIds, found.id]
        });
        this.ingredientDisplayNames.push(found.name);
      }
    } else {
      alert("Ingrediente não cadastrado!");
    }

    this.newIngredient = '';
  }

  removeIngredient(index: number) {
    const currentIds = this.menuItemForm.controls.ingredients.value || [];
    currentIds.splice(index, 1);
    this.ingredientDisplayNames.splice(index, 1);

    this.menuItemForm.patchValue({ ingredients: [...currentIds] });
  }

  onFileSelect(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files?.length) {
      this.menuItemForm.patchValue({ image: element.files[0] });
    }
  }


  onSubmit() {
    if (this.menuItemForm.invalid) {
      this.menuItemForm.markAllAsTouched();
      return;
    }

    const rawValues = this.menuItemForm.getRawValue();

    const formData = new FormData();

    let priceValue = rawValues.price;
    if (typeof priceValue === 'string') {
      priceValue = priceValue.replace(',', '.');
    }
    formData.append('name', rawValues.name!);
    formData.append('description', rawValues.description!);
    formData.append('price', String(priceValue));
    formData.append('category', rawValues.category!);

    if (rawValues.ingredients) {
      formData.append('ingredients', JSON.stringify(rawValues.ingredients));
    }

    if (rawValues.image instanceof File) {
      formData.append('image', rawValues.image);
    }

    const request$ = this.mode === 'create'
      ? this.menuItemService.createMenuItem(formData)
      : this.menuItemService.updateMenuItem(this.itemId!, formData);

    request$.subscribe({
      next: () => {
        this.toastService.show('Operação realizado com sucesso!', 'success');
        this.router.navigate(['/home'])
      },
      error: (err) => console.error('Erro na operação:', err)
    });
  }
}