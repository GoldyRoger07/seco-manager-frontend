import { Injectable, signal } from '@angular/core';

export interface AppSettings {
  restaurantName: string;
  currency: string;
  vatRate: number;
  allowMobileOrders: boolean;
  theme: 'light' | 'dark' | 'system';
  kitchenNotificationSound: boolean;
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  config = signal<AppSettings>({
    restaurantName: 'Mon Restaurant',
    currency: 'EUR',
    vatRate: 20,
    allowMobileOrders: true,
    theme: 'light',
    kitchenNotificationSound: true
  });

  updateConfig(newConfig: Partial<AppSettings>) {
    this.config.update(c => ({ ...c, ...newConfig }));
  }
}