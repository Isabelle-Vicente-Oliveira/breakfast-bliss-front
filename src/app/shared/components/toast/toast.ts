import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { ToastData } from '../../../core/interfaces/toast.interface';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})


export class ToastComponent {
  data: ToastData | null = null;

  get modifierClass(): string {
    return this.data ? `toast--${this.data.type}` : '';
  }
}