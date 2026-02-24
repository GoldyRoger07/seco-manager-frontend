import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { TopbarComponent } from './topbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="flex h-screen w-screen overflow-hidden bg-win-bg font-sans">
      
      <app-sidebar class="flex-shrink-0 z-20"></app-sidebar>

      <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        
        <app-topbar [title]="'Vue d\\'ensemble'"></app-topbar>

        <main class="flex-1 overflow-auto p-6 scroll-smooth">
          <div class="animate-fade-in">
             <router-outlet></router-outlet>
          </div>
        </main>

      </div>
    </div>
  `,
  styles: [`
    /* Petite animation d'entrée douce style Windows */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `]
})
export class MainLayoutComponent {}