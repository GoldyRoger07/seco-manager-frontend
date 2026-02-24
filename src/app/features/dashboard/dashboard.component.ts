import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../core/services/restaurant.service';
import { TableStatus } from '../../core/models';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, ButtonModule],
  template: `
    <div class="space-y-8">
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-win-card-bg p-6 rounded-xl shadow-fluent border border-white/40 backdrop-blur-md">
          <p class="text-win-text-sec text-sm font-medium">Chiffre d'affaires</p>
          <h3 class="text-3xl font-bold text-win-text mt-1">{{ service.stats().revenue }}€</h3>
          <div class="mt-2 text-xs text-green-600 font-semibold">
            <i class="pi pi-arrow-up text-[10px]"></i> +12% vs hier
          </div>
        </div>

        <div class="bg-win-card-bg p-6 rounded-xl shadow-fluent border border-white/40">
          <p class="text-win-text-sec text-sm font-medium">Commandes actives</p>
          <h3 class="text-3xl font-bold text-win-text mt-1">{{ service.stats().totalOrders }}</h3>
          <div class="mt-2 text-xs text-win-primary font-semibold">En cuisine: 4</div>
        </div>

        <div class="bg-win-card-bg p-6 rounded-xl shadow-fluent border border-white/40">
          <p class="text-win-text-sec text-sm font-medium">Occupation</p>
          <h3 class="text-3xl font-bold text-win-text mt-1">
            {{ getOccupiedCount() }} / {{ service.tables().length }}
          </h3>
          <div class="mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div class="bg-win-primary h-full transition-all duration-500" 
                 [style.width.%]="(getOccupiedCount() / service.tables().length) * 100"></div>
          </div>
        </div>
      </div>

      <section>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-win-text">Plan de salle</h2>
          <div class="flex gap-2">
             <!-- <button pButton icon="pi pi-plus" label=" Nouvelle Table" class="p-button-sm p-button-outlined"></button> -->
             <p-button class="p-button-sm p-button-outlined">
                <i class="pi pi-plus mr-1"></i>
                Nouvelle Table
             </p-button>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          @for(table of service.tables(); track $index){

            <div (click)="onTableClick(table)"
                 class="group relative bg-win-card-bg border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95 flex flex-col items-center text-center">
              
                <div class="w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-colors"
                    [ngClass]="getStatusClass(table.status)">
                  <i class="pi pi-table text-2xl"></i>
                </div>
  
                <span class="font-bold text-win-text">{{ table.code }}</span>
                <span class="text-xs text-win-text-sec mb-3">{{ table.capacity }} places</span>
  
                <p-tag [value]="translateFromStatus(table.status)" [severity]="getSeverity(table.status)"></p-tag>
  
                <div class="absolute inset-0 bg-win-primary/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
            </div>
          }
        </div>
      </section>

    </div>
  `
})
export class DashboardComponent {
  service = inject(RestaurantService);

  getOccupiedCount() {
    return this.service.tables().filter(t => t.status === TableStatus.OCCUPIED).length;
  }

  getSeverity(status: TableStatus | undefined): any {
    switch (status) {
      case TableStatus.AVAILABLE: return 'success';
      case TableStatus.OCCUPIED: return 'danger';
      case TableStatus.RESERVED: return 'info';
      case TableStatus.DIRTY: return 'warning';
      default: return 'secondary';
    }
  }

  getStatusClass(status: TableStatus | undefined) {
    switch (status) {
      case TableStatus.AVAILABLE: return 'bg-green-50 text-green-600';
      case TableStatus.OCCUPIED: return 'bg-red-50 text-red-600';
      case TableStatus.RESERVED: return 'bg-blue-50 text-blue-600';
      case TableStatus.DIRTY: return 'bg-yellow-50 text-yellow-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  }

  onTableClick(table: any) {
    console.log('Action sur la table:', table.label);
    // Ici on pourra ouvrir un dialogue pour prendre une commande
  }

  translateFromStatus(status: TableStatus | undefined): string{
      return this.service.translateFromStatus(status)
  }
}