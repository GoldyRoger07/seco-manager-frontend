import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../core/services/menu.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, MenuItem } from '../../core/models';
import {CheckboxModule} from 'primeng/checkbox'
import { MyFileUploader } from "../../shared/my-file-uploader/my-file-uploader";
import { toSignal } from '@angular/core/rxjs-interop';
import { UrlService } from '../../core/services/url.service';
import { ImagePickerComponent } from "../image-picker/image-picker.component";
import { CategoryDialogs } from "../category-dialogs/category-dialogs";
import { MenuItemDialogs } from "../menu-item-dialogs/menu-item-dialogs";
import { CategoryDialogService } from '../category-dialogs/category-dialogs.service';
import { MenuItemDialogService } from '../menu-item-dialogs/menu-item-dialogs.service';

@Component({
  selector: 'app-menu-management',
  standalone: true,
  imports: [CheckboxModule, ReactiveFormsModule, CommonModule, ButtonModule, DialogModule, InputTextModule, InputNumberModule, FormsModule, CategoryDialogs, MenuItemDialogs],
  template: `
    <category-dialogs [currentCategory]="currentCategory"/>

    <menu-item-dialogs [currentMenuItem]="currentMenuItem"/>
    
    <div class="flex h-[calc(100vh-120px)] gap-6">
      
      
      <aside class="w-64 bg-white backdrop-blur-md rounded-2xl border border-white/40 p-4 shadow-sm flex flex-col">
        <div class="flex justify-between items-center mb-4 px-2">
          <h3 class="font-bold text-win-text">Catégories</h3>
          <div class="flex items-center">
            <button (click)="openCreateCategoryDialog()" class="w-7 h-7 hover:bg-gray-100 rounded text-win-primary transition-colors">
                <i class="pi pi-plus text-sm"></i>
            </button>
            <button (click)="openUpdateCategoryDialog()" class="w-7 h-7 hover:bg-gray-100 rounded text-win-primary transition-colors">
                <i class="pi pi-pencil"></i>
            </button>
            
          </div>

          
        </div>
        
        <div class="space-y-1 overflow-y-auto">
          @for(cat of menuService.categories(); track $index){

            <button 
                    (click)="menuService.selectedCategoryId.set(cat.id)"
                    [ngClass]="{'bg-win-primary text-white shadow-md': menuService.selectedCategoryId() === cat.id}"
                    class="w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 hover:bg-win-hover group">
              <i [class]="'pi ' + (cat.coverUrl || 'pi-tag') + ' mr-3'" [ngClass]="{'text-white': menuService.selectedCategoryId() === cat.id, 'text-win-primary': menuService.selectedCategoryId() !== cat.id}"></i>
              <span class="text-sm font-medium">{{ cat.name }}</span>
            </button>
          }
        </div>
      </aside>

      <main class="flex-1 overflow-y-auto pr-2">
        <div class="flex justify-between items-center mb-6 sticky top-0 bg-win-bg/80 backdrop-blur-md py-2 z-10">
          <h2 class="text-xl font-bold text-win-text">Articles</h2>
          <button (click)="openCreateMenuItemDialog()" pButton icon="pi pi-plus" label="Ajouter un article" class="p-button-sm rounded-full shadow-fluent"></button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div *ngFor="let item of menuService.filteredItems()" 
               class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow relative group">
            
            <div class="flex justify-between items-start mb-2 relative">
              <div class="w-full h-full  rounded-lg flex items-center justify-center">
                @if(item.coverUrl){
                  <img [src]="item.coverUrl" class="w-full h-40 object-contain object-center rounded-md" alt="cover">
                }@else{

                  <i class="pi pi-image text-gray-400 " style="font-size: 140px;"></i>
                }
              </div>
              <div class="absolute top-0 right-0 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <!-- <button (click)="menuService.deleteItem(item.id)" class=" h-10 w-10 text-red-500 hover:bg-red-50 rounded-lg"><i class="pi pi-trash"></i></button> -->
                <button (click)="currentMenuItem=item; openUpdateMenuItemDialog()" class="h-10 w-10 text-win-primary hover:bg-blue-50 rounded-lg"><i class="pi pi-pencil"></i></button>
              </div>
            </div>

            <h4 class="font-bold text-win-text">{{ item.name }}</h4>
            <p class="text-xs text-win-text-sec line-clamp-2 mb-1 h-8">{{ item.description }}</p>
            
            <div class="flex justify-between items-center pt-1 border-t border-gray-50">
              @if(item.variations){
                <span class="text-lg font-bold text-win-primary">{{ item.variations[0].price| number:'1.2-2' }} HTG</span>
              }
              <span [class]="item.available ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'" 
                    class="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded">
                {{ item.available ? 'Disponible' : 'Épuisé' }}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>

    
  `
})
export class MenuManagementComponent implements OnInit{
  menuService = inject(MenuService);
  categoryDialogService = inject(CategoryDialogService)
  menuItemDialogService = inject(MenuItemDialogService)
  
  url = inject(UrlService)
  server = this.url.server
 
 
  currentCategory:Category = {id:0}
  currentMenuItem:MenuItem = {id:0}



  ngOnInit(): void {
    this.menuService.loadCategories()
    this.menuService.loadMenuItems()
  }

  openCreateCategoryDialog(){
    this.categoryDialogService.openCreateDialog()
  }

  openUpdateCategoryDialog(){
    this.categoryDialogService.openUpdateDialog()
  }

  openCreateMenuItemDialog(){
    this.menuItemDialogService.openCreateDialog()
  }

  openUpdateMenuItemDialog(){
    this.menuItemDialogService.openUpdateDialog()
  }

  
}