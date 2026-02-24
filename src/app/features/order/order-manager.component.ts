import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManagerService } from '../../core/services/order-manager.service';
import { OrderStatus } from '../../core/models';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-order-manager',
  standalone: true,
  imports: [CommonModule, ButtonModule, TagModule],
  template: `
    <div class="flex h-[calc(100vh-120px)] gap-6">
      
      <aside class="w-1/3 flex flex-col gap-4">
        <h2 class="text-xl font-bold text-win-text px-2">Flux de commandes</h2>
        
        <div class="flex-1 overflow-y-auto pr-2 space-y-3 pt-3">
          <div *ngFor="let order of orderManager.orders()"
               (click)="orderManager.selectedOrderId.set(order.id)"
               [class.border-win-primary]="orderManager.selectedOrderId() === order.id"
               class="bg-white p-4 rounded-xl border-2 border-transparent shadow-sm cursor-pointer hover:shadow-md transition-all relative">
            
            <div class="absolute -top-2 -right-2">
              <span *ngIf="order.origin === 'mobile'" class="bg-purple-600 text-white text-[10px] px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                <i class="pi pi-mobile text-[10px]"></i> Client
              </span>
              <span *ngIf="order.origin === 'staff'" class="bg-gray-600 text-white text-[10px] px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                <i class="pi pi-user text-[10px]"></i> Serveur
              </span>
            </div>

            <div class="flex justify-between items-start mb-2">
              <div>
                <span class="text-lg font-black text-win-text">Table {{ order.table?.id }}</span>
                <p class="text-xs text-win-text-sec">{{ order.createdAt | date:'HH:mm' }} • {{ order.items.length }} articles</p>
              </div>
              <p-tag [value]="order.status" [severity]="getStatusSeverity(order.status)"></p-tag>
            </div>
            
            <div class="text-sm font-bold text-win-primary">{{ order.totalAmount | number:'1.2-2' }}€</div>
          </div>
        </div>
      </aside>

      <main class="flex-1 bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 shadow-fluent flex flex-col overflow-hidden">
        
        <ng-container *ngIf="orderManager.selectedOrder() as order; else noSelection">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 class="text-2xl font-bold text-win-text">Détails Table {{ order.table?.id }}</h3>
              <p class="text-sm text-win-text-sec">ID: {{ order.id }}</p>
            </div>
            <div class="flex gap-2">
              <button pButton label="Prêt" icon="pi pi-check" class="p-button-success p-button-sm rounded-lg"
                      (click)="orderManager.updateOrderStatus(order.id, statuses.READY)"></button>
              <button pButton icon="pi pi-print" class="p-button-outlined p-button-secondary p-button-sm rounded-lg"></button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-6">
            <table class="w-full text-left">
              <thead>
                <tr class="text-xs uppercase text-win-text-sec border-b border-gray-100">
                  <th class="pb-3">Article</th>
                  <th class="pb-3">Qté</th>
                  <th class="pb-3 text-right">Prix</th>
                  <th class="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr *ngFor="let item of order.items" class="group">
                  <td class="py-4 font-semibold text-win-text">{{ item.name }}</td>
                  <td class="py-4">
                     <span class="bg-win-hover px-3 py-1 rounded-lg font-bold text-sm">{{ item.quantity }}</span>
                  </td>
                  <td class="py-4 text-right font-medium">{{ item.price * item.quantity | number:'1.2-2' }}€</td>
                  <td class="py-4 text-right">
                    <button (click)="orderManager.removeItemFromOrder(order.id, item.menuItemId)"
                            class="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <i class="pi pi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <!-- <button pButton label="Ajouter un article à cette commande" icon="pi pi-plus" 
                    class="p-button-text p-button-sm mt-4 text-win-primary"></button> -->

            <p-button class="p-button-text p-button-sm mt-4 text-win-primary">
              <i class="pi pi-plus mr-1"></i>
              Ajouter un article à cette commande
            </p-button>
          </div>

          <div class="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
            <span class="text-win-text-sec font-medium">Total de la commande</span>
            <span class="text-3xl font-black text-win-primary">{{ order.totalAmount | number:'1.2-2' }}€</span>
          </div>
        </ng-container>

        <ng-template #noSelection>
          <div class="flex-1 flex flex-col items-center justify-center text-gray-400">
            <i class="pi pi-arrow-left text-4xl mb-4 animate-bounce-h"></i>
            <p>Sélectionnez une commande pour la gérer</p>
          </div>
        </ng-template>
      </main>

    </div>
  `,
  styles: [`
    @keyframes bounceH {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(-10px); }
    }
    .animate-bounce-h { animation: bounceH 2s infinite; }
  `]
})
export class OrderManagerComponent {
  orderManager = inject(OrderManagerService);
  statuses = OrderStatus;

  getStatusSeverity(status: OrderStatus | undefined): any {
    switch (status) {
      case OrderStatus.PENDING: return 'warning';
      case OrderStatus.COOKING: return 'info';
      case OrderStatus.READY: return 'success';
      case OrderStatus.SERVED: return 'secondary';
      default: return 'info';
    }
  }
}