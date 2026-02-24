import { Injectable, signal, computed } from '@angular/core';
import { Order, OrderStatus, OrderItem, Table, TableStatus } from '../models';

export interface ExtendedOrder extends Order {
  items: any;
  origin: 'mobile' | 'staff'; // Pour distinguer la provenance
}

@Injectable({ providedIn: 'root' })
export class OrderManagerService {
  tableInit:Table = {
    id: 0,
    code: '',
    capacity: 0,
    status: TableStatus.AVAILABLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  // Liste de TOUTES les commandes actives
  private _orders = signal<ExtendedOrder[]>([
    { 
      id: 1, 
      table: {id:1}, 
      status: OrderStatus.PENDING, 
      origin: 'mobile',
      items: [{ menuItemId: 'm1', name: 'Salade César', quantity: 2, price: 12.5 }],
      createdAt: new Date(), totalAmount: 25.0, updatedAt: new Date(),
      note: ''
    },
    { 
      id: 2, table: {id:2}, status: OrderStatus.COOKING, origin: 'staff',
      items: [{ menuItemId: 'm2', name: 'Burger Maison', quantity: 1, price: 18.0 }],
      createdAt: new Date(), totalAmount: 18.0
    }
  ]);

  orders = computed(() => this._orders());

  // Commande actuellement sélectionnée pour modification
  selectedOrderId = signal<number | null>(null);
  
  selectedOrder = computed(() => 
    this._orders().find(o => o.id === this.selectedOrderId())
  );

  updateOrderStatus(orderId: number, newStatus: OrderStatus) {
    this._orders.update(orders => orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
  }

  // Permet au staff de supprimer un item d'une commande client
  removeItemFromOrder(orderId: number, menuItemId: number) {
    this._orders.update(orders => orders.map(o => {
      if (o.id === orderId) {
        const newItems = o.items.filter((i:any) => i.menuItemId !== menuItemId);
        const newTotal = newItems.reduce((acc:any, i:any) => acc + (i.price * i.quantity), 0);
        return { ...o, items: newItems, totalAmount: newTotal };
      }
      return o;
    }));
  }
}