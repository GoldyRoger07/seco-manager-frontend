import { Injectable, signal, computed } from '@angular/core';
import { Order, OrderItem, MenuItem, OrderStatus } from '../models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  // La table actuellement sélectionnée pour la commande
  currentTableId = signal<string | null>(null);
  
  // Les items dans le "panier" actuel
  cartItems = signal<OrderItem[]>([]);

  // Calcul du total en temps réel (Signal calculé)
  total = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + ((item.price as number) * (item.quantity as number)), 0);
  });

  addToCart(menuItem: MenuItem) {
    this.cartItems.update((items:any) => {
      const existing = items.find((i:any) => i.menuItemId === menuItem.id);
      if (existing) {
        return items.map((i:any) => i.menuItemId === menuItem.id 
          ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...items, { 
        menuItemId: menuItem.id, 
        name: menuItem.name, 
        quantity: 1, 
        // price: menuItem.price 
      }];
    });
  }

  removeFromCart(menuItemId: number) {
    this.cartItems.update(items => items.filter(i => i.menuItem?.id !== menuItemId));
  }

  clearCart() {
    this.cartItems.set([]);
    this.currentTableId.set(null);
  }
}