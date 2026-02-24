import { Injectable, signal, computed, inject } from '@angular/core';
import { Category, MenuItem } from '../models';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class MenuService {

  http = inject(HttpClient)
  url = inject(UrlService)

  // État
  categories = signal<Category[]>([]);

  menuItems = signal<MenuItem[]>([]);

  // Filtre réactif
  selectedCategoryId = signal<number | undefined>(1);

  filteredItems = computed(() => {
    const catId = this.selectedCategoryId();
    return catId 
      ? this.menuItems().filter(item => item.category?.id === catId)
      : this.menuItems();
  });

  // Méthodes CRUD simples
  addItem(item: MenuItem) {
    this.menuItems.update(items => [...items, item]);
  }

  deleteItem(id: number) {
    this.menuItems.update(items => items.filter(i => i.id !== id));
  }

  // ... (reste du code)

  addCategory(newCategory: Category | undefined) {
    
    this.categories.update(cats => [...cats, newCategory as Category]);
    // Optionnel : Sélectionner automatiquement la nouvelle catégorie
    this.selectedCategoryId.set(newCategory?.id);
  }

  getMenuItems(){
    return this.http.get<MenuItem[]>(this.url.server+"/api/menu-items") 
  }

  loadMenuItems(){
    this.getMenuItems()
    .subscribe((items) => this.menuItems.set( items))
  }

  getCategories(){
    return this.http.get<Category[]>(this.url.server+"/api/categories")
  }


  loadCategories(){
    this.getCategories()
    .subscribe((cats) => this.categories.set(cats))
  }

  createCategory(formCategory: any){
    this.http.post<Category>(this.url.server+"/api/categories",formCategory)
    .subscribe((category) => this.addCategory(category))
  }

  updateCategory(formCategory: any){
    this.http.put<Category>(this.url.server+"/api/categories",formCategory)
    .subscribe((category) => {
      this.categories.update(currentCategories =>
        currentCategories.map(item => item.id === category.id? category:item)
      )
    })
  }

  createMenuItem(formMenuItem: any){
    this.http.post<MenuItem>(this.url.server+"/api/menu-items",formMenuItem)
    .subscribe((menuItem) => this.addItem(menuItem))
  }

  updateMenuItem(formMenuItem: any){
    this.http.put<MenuItem>(this.url.server+"/api/menu-items",formMenuItem)
    .subscribe((menuItem) => {
      this.menuItems.update(currentMenuItems => 
        currentMenuItems.map((item) => item.id === menuItem.id?menuItem:item)
      )
    })
  }

  getCurrentCategory(){
    const id = this.selectedCategoryId()
    return this.categories().find((cat) => cat.id === id)
  }
}