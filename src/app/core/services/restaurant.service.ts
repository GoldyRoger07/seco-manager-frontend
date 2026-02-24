import { inject, Injectable, signal } from '@angular/core';
import { Table, TableStatus } from '../models';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({ providedIn: 'root' })
export class RestaurantService {

  http = inject(HttpClient)
  url = inject(UrlService)

  api = this.url.server+"/api/tables"
  // État des tables
  tables = signal<Table[]>([
    // { id: 1, code: 'Table 1', capacity: 2, status: TableStatus.AVAILABLE },
    // { id: 2, code: 'Table 2', capacity: 4, status: TableStatus.OCCUPIED },
    // { id: 3, code: 'Table 3', capacity: 4, status: TableStatus.RESERVED },
    // { id: 4, code: 'Table 4', capacity: 6, status: TableStatus.DIRTY },
    // { id: 5, code: 'Table 5', capacity: 2, status: TableStatus.AVAILABLE },
    // { id: 6, code: 'Table 6', capacity: 8, status: TableStatus.OCCUPIED, },
  ]);

  // Statistiques rapides
  stats = signal({
    totalOrders: 12,
    revenue: 450.50,
    activeTables: 2
  });

  

  updateTableStatus(tableId: number, newStatus: TableStatus) {
    this.tables.update(tables => tables.map(t => 
      t.id === tableId ? { ...t, status: newStatus } : t
    ));
  }

  // Action rapide : Libérer une table (elle devient "À nettoyer")
  releaseTable(tableId: number) {
    
    this.updateTableStatus(tableId, TableStatus.DIRTY);
  }

  // Action rapide : Marquer comme propre
  cleanTable(tableId: number) {
    this.updateTableStatus(tableId, TableStatus.AVAILABLE);
  }

  addTable(table: Table | undefined){
    if(table)
      this.tables.update( tables => [...tables, table])
  }

  getTables(){
    return this.http.get<Table[]>(this.api)
  }

  loadTables(){
    this.getTables()
    .subscribe((tables) => this.tables.set(tables))
  }

  createTable(){
    this.http.post<Table>(this.api,{})
    .subscribe((table) => this.addTable(table))
  }

  updateTable(formTable: any){
    // console.log(formTable)
    this.http.put<Table>(this.api, formTable)
    .subscribe(table => 
      this.tables.update(currentTables => currentTables.map(t => t.id === table.id? table: t))
    )
  }

  translateFromStatus(status: TableStatus | undefined): string{
      let result = ""

      switch(status){
        case TableStatus.AVAILABLE:
          result = "Libre"
        break
        case TableStatus.OCCUPIED:
          result = "Occupée"
        break
        case TableStatus.RESERVED:
          result = "Réservée"
        break
        case TableStatus.DIRTY:
          result = "Sale"
        break
      }

      return result
  }



}