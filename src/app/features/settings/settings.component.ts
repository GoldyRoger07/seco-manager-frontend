import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../core/services/settings.service';
import { InputTextModule } from 'primeng/inputtext';
// import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SelectModule, ToggleSwitchModule, CommonModule, InputTextModule, FormsModule],
  template: `
    <div class="flex h-full gap-8">
      
      <aside class="w-64 flex flex-col gap-1">
        <button *ngFor="let cat of categories"
                (click)="activeTab = cat.id"
                [class.bg-white]="activeTab === cat.id"
                [class.shadow-sm]="activeTab === cat.id"
                class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left group">
          <i [class]="'pi ' + cat.icon" [class.text-win-primary]="activeTab === cat.id"></i>
          <span class="text-sm font-medium" [class.text-win-text]="activeTab === cat.id">{{ cat.label }}</span>
        </button>
      </aside>

      <main class="flex-1 max-w-3xl">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-win-text">{{ getActiveCategoryLabel() }}</h2>
        </div>

        <div *ngIf="activeTab === 'general'" class="space-y-4 animate-fade-in">
          <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-win-text">Nom de l'établissement</p>
                <p class="text-xs text-win-text-sec">Affiché sur les tickets et l'app mobile</p>
              </div>
              <input pInputText [ngModel]="settings.config().restaurantName" 
                     (ngModelChange)="settings.updateConfig({restaurantName: $event})" />
            </div>

            <hr class="border-gray-50" />

            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-win-text">Devise</p>
                <p class="text-xs text-win-text-sec">Symbole utilisé pour les prix</p>
              </div>
              <p-select [options]="currencies" [ngModel]="settings.config().currency" 
                          (ngModelChange)="settings.updateConfig({currency: $event})"></p-select>
            </div>
          </div>
        </div>

        <div *ngIf="activeTab === 'mobile'" class="space-y-4 animate-fade-in">
          <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex gap-4">
                <div class="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                  <i class="pi pi-mobile"></i>
                </div>
                <div>
                  <p class="font-semibold text-win-text">Accepter les commandes clients</p>
                  <p class="text-xs text-win-text-sec">Permettre aux clients de commander via leur smartphone</p>
                </div>
              </div>
              <p-toggleswitch [ngModel]="settings.config().allowMobileOrders" 
                            (ngModelChange)="settings.updateConfig({allowMobileOrders: $event})"></p-toggleswitch>
            </div>
          </div>
          
          <div class="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
             <i class="pi pi-info-circle text-blue-600"></i>
             <p class="text-xs text-blue-800 leading-relaxed">
               Si cette option est désactivée, les clients pourront toujours voir le menu sur leur application mais devront appeler un serveur pour passer commande.
             </p>
          </div>
        </div>

        <div *ngIf="activeTab === 'notifications'" class="space-y-4 animate-fade-in">
           <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-win-text">Sonnerie cuisine</p>
                <p class="text-xs text-win-text-sec">Alerte sonore lors d'une nouvelle commande mobile</p>
              </div>
              <p-inputSwitch [ngModel]="settings.config().kitchenNotificationSound" 
                            (ngModelChange)="settings.updateConfig({kitchenNotificationSound: $event})"></p-inputSwitch>
            </div>
          </div>
        </div>

      </main>
    </div>
  `
})
export class SettingsComponent {
  settings = inject(SettingsService);
  activeTab = 'general';

  categories = [
    { id: 'general', label: 'Général', icon: 'pi-desktop' },
    { id: 'mobile', label: 'Commandes Mobile', icon: 'pi-mobile' },
    { id: 'taxes', label: 'Taxes & Service', icon: 'pi-percentage' },
    { id: 'notifications', label: 'Notifications', icon: 'pi-bell' },
    { id: 'hardware', label: 'Matériel', icon: 'pi-print' }
  ];

  currencies = ['EUR', 'USD', 'GBP'];

  getActiveCategoryLabel() {
    return this.categories.find(c => c.id === this.activeTab)?.label;
  }
}