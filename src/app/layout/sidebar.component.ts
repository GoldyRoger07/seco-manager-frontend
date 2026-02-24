import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="w-64 h-full bg-white flex flex-col border-r border-gray-200 shadow-sm select-none">
      
      <div class="h-16 flex items-center px-6 border-b border-gray-100">
        <div class="w-8 h-8 bg-win-primary rounded-lg flex items-center justify-center mr-3 text-white font-bold">
          R
        </div>
        <span class="text-lg font-bold text-win-text tracking-tight">RestoManager</span>
      </div>

      <nav class="flex-1 px-2 py-4 space-y-1">
        
        <ng-container *ngFor="let item of menuItems">
          <a [routerLink]="item.route"
             routerLinkActive="bg-win-hover text-win-primary font-semibold relative"
             class="flex items-center px-4 py-2.5 rounded-md text-win-text-sec hover:bg-win-hover transition-colors duration-200 group cursor-pointer no-underline">
            
            <div class="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 bg-win-primary rounded-r-full opacity-0 group-[.font-semibold]:opacity-100 transition-opacity"></div>

            <i [class]="item.icon + ' mr-3 text-lg'"></i>
            <span class="text-sm">{{ item.label }}</span>
          </a>
        </ng-container>

      </nav>

      <div class="p-4 border-t border-gray-100">
        <div class="flex items-center p-2 rounded-md hover:bg-win-hover cursor-pointer transition-colors">
          <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
            AD
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-win-text">Admin</p>
            <p class="text-xs text-win-text-sec">Gérant</p>
          </div>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  menuItems = [
    { label: 'Tableau de bord', icon: 'pi pi-th-large', route: '/dashboard' },
    { label: 'Commandes', icon: 'pi pi-shopping-bag', route: '/orders' },
    { label: 'Menu & Carte', icon: 'pi pi-book', route: '/menu' },
    { label: 'Tables', icon: 'pi pi-map', route: '/tables' },
    { label: 'Images', icon: 'pi pi-images', route: '/images-manager' },
    { label: 'Paramètres', icon: 'pi pi-cog', route: '/settings' },
  ];
}