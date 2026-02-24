import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar'; // PrimeNG Component

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  template: `
    <header class="h-16 flex items-center justify-between px-8 bg-win-bg/50 backdrop-blur-sm z-10 sticky top-0">
      
      <div>
        <h1 class="text-xl font-semibold text-win-text">{{ title }}</h1>
        <p class="text-xs text-win-text-sec">{{ date | date:'fullDate' }}</p>
      </div>

      <div class="flex items-center gap-4">
        <button class="w-8 h-8 rounded-full bg-white hover:bg-gray-200 border border-gray-200 flex items-center justify-center transition-colors">
            <i class="pi pi-bell text-gray-500"></i>
        </button>
        <button class="w-8 h-8 rounded-full bg-white hover:bg-gray-200 border border-gray-200 flex items-center justify-center transition-colors">
            <i class="pi pi-search text-gray-500"></i>
        </button>
      </div>
    </header>
  `
})
export class TopbarComponent {
  @Input() title: string = 'Restaurant';
  date = new Date();
}