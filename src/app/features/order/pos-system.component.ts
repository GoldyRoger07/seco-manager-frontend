import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../core/services/menu.service';
import { OrderService } from '../../core/services/order.service';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-pos-system',
  standalone: true,
  imports: [CommonModule, ButtonModule, ScrollPanelModule, DividerModule],
  template: `
    <div class="flex h-[calc(100vh-100px)] gap-4 overflow-hidden">
      
      <div class="flex-1 flex flex-col min-w-0">
        <div class="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
          <button *ngFor="let cat of menuService.categories()"
                  (click)="menuService.selectedCategoryId.set(cat.id)"
                  [class]="menuService.selectedCategoryId() === cat.id ? 'bg-win-primary text-white' : 'bg-white text-win-text hover:bg-win-hover'"
                  class="px-6 py-2 rounded-full border border-gray-100 shadow-sm whitespace-nowrap transition-all font-medium text-sm">
            {{ cat.name }}
          </button>
        </div>

        <p-scrollPanel class="flex-1 rounded-2xl">
          <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 p-1">
            <div *ngFor="let item of menuService.filteredItems()"
                 (click)="orderService.addToCart(item)"
                 class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-win-primary hover:shadow-md cursor-pointer transition-all active:scale-95 group">
              <div class="h-24 bg-win-bg rounded-lg mb-3 flex items-center justify-center group-hover:bg-blue-50">
                <i class="pi pi-image text-gray-300 text-2xl"></i>
              </div>
              <h4 class="font-bold text-win-text text-sm truncate">{{ item.name }}</h4>
              <!-- <p class="text-win-primary font-bold mt-1">{{ item.price | number:'1.2-2' }}€</p> -->
            </div>
          </div>
        </p-scrollPanel>
      </div>

      <aside class="w-96 bg-white rounded-2xl border border-gray-200 shadow-fluent flex flex-col overflow-hidden">
        <div class="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h3 class="font-bold text-win-text flex items-center">
            <i class="pi pi-shopping-cart mr-2 text-win-primary"></i>
            Commande #{{ orderService.currentTableId() || 'Table...' }}
          </h3>
          <button (click)="orderService.clearCart()" class="text-xs text-red-500 font-medium hover:underline">Vider</button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <div *ngIf="orderService.cartItems().length === 0" class="h-full flex flex-col items-center justify-center text-gray-400">
            <i class="pi pi-inbox text-4xl mb-2"></i>
            <p class="text-sm italic">Aucun article sélectionné</p>
          </div>

          <div *ngFor="let item of orderService.cartItems()" class="flex justify-between items-center animate-fade-in">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 flex items-center justify-center bg-win-hover rounded-lg text-xs font-bold text-win-primary">
                {{ item.quantity }}x
              </span>
              <div>
                <p class="text-sm font-semibold text-win-text">{{ item.name }}</p>
                <p class="text-[10px] text-win-text-sec">{{ item.price }}€ / unité</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm font-bold text-win-text">{{ (item.price || 0) * (item.quantity || 0) | number:'1.2-2' }}€</span>
              <button (click)="orderService.removeFromCart(item.menuItem?.id || 0)" class="text-gray-300 hover:text-red-500 transition-colors">
                <i class="pi pi-times-circle"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="p-6 bg-win-bg/30 border-t border-gray-100">
          <div class="flex justify-between items-center mb-4">
            <span class="text-win-text-sec font-medium">Total</span>
            <span class="text-2xl font-black text-win-primary">{{ orderService.total() | number:'1.2-2' }}€</span>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            <button pButton label="Cuisine" icon="pi pi-send" class="p-button-outlined p-button-secondary rounded-xl"></button>
            <button pButton label="Payer" icon="pi pi-credit-card" 
                    [disabled]="orderService.cartItems().length === 0"
                    class="p-button-primary shadow-lg rounded-xl"></button>
          </div>
        </div>
      </aside>

    </div>
  `
})
export class POSSystemComponent {
  menuService = inject(MenuService);
  orderService = inject(OrderService);
}