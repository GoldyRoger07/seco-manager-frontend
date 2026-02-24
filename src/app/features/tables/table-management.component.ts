  import { Component, inject, OnInit, signal } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { RestaurantService } from '../../core/services/restaurant.service';
  import { Table, TableStatus } from '../../core/models';
  import { ButtonModule } from 'primeng/button';
  import { DialogModule } from 'primeng/dialog';
  import { SelectButtonModule } from 'primeng/selectbutton';
  import { TabsModule } from 'primeng/tabs';
  import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
  import { InputTextModule } from 'primeng/inputtext';
  import {  InputNumberModule } from 'primeng/inputnumber';
  import { MyNumberStepperComponent } from "../../shared/my-number-stepper/my-number-stepper.component";
  import { CheckboxModule } from 'primeng/checkbox';

  interface TableForm{
    id: number;
    capacity: number;
    enable: boolean;
    status: TableStatus
  }

  @Component({
    selector: 'app-table-management',
    standalone: true,
    imports: [CheckboxModule, ReactiveFormsModule, InputTextModule, InputNumberModule, ButtonModule, TabsModule, FormsModule, CommonModule, ButtonModule, DialogModule, SelectButtonModule, MyNumberStepperComponent],
    template: `
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-win-text">Gestion des Tables</h2>
          <div class="flex gap-2 bg-white/50 p-1 rounded-xl border border-gray-100">
            <button pButton (click)="createTable()" label="Ajouter" icon="pi pi-plus" class="p-button-sm shadow-sm"></button>
            <!-- <button pButton label="Vue Plan" icon="pi pi-map" class="p-button-sm shadow-sm"></button> -->
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          @for(table of service.tables(); track $index){

            <div (click)="openEditor(table)"
                class="table group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-fluent transition-all cursor-pointer overflow-hidden"
                [class.enable]="!table.enable">
              
              <div class="absolute top-0 left-0 right-0 h-1.5" [ngClass]="getStatusColor(table.status)"></div>
  
              <div class="flex flex-col items-center py-2">
                <span class="text-3xl font-black text-win-text mb-1">{{ table.code }}</span>
                <span class="text-xs text-win-text-sec uppercase tracking-widest">{{ translateFromStatus(table.status) }}</span>
                
                <div class="mt-4 flex gap-1">
                  <i *ngFor="let i of [].constructor(table.capacity)" class="pi pi-user text-[10px] text-gray-300"></i>
                </div>
              </div>
  
              <div class="z-4 absolute inset-0 bg-win-primary/90 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-sm">
                <i class="pi pi-pencil text-white text-xl mb-2"></i>
                <span class="text-white text-xs font-bold uppercase">Modifier</span>
              </div>
            </div>
          }
        </div>

      

        <p-dialog 
          [(visible)]="showEditor"
          [header]="(selectedTable()?.code || '')"
          [modal]="false" 
          [draggable]="false"
          class="win11-dialog "
          position="top">
          <p-tabs value="0">
                  <p-tablist>
                      <p-tab value="0">Modifier L'etat</p-tab>
                      <p-tab value="1">Modifier les details</p-tab>   
                  </p-tablist>
                  <p-tabpanels>
                      <p-tabpanel value="0">
                          <div class="py-4 space-y-6">
                            <div class="space-y-3 flex flex-col">
                              <label class="text-sm font-bold text-win-text-sec uppercase italic">Statut actuel</label>
                              <p-selectButton [options]="statusOptions" 
                                              [(ngModel)]="selectedStatus" 
                                              (onChange)="onStatusChange($event)"
                                              class="win-selectbutton">
                              </p-selectButton>
                            </div>

                            <div class="pt-4 border-t border-gray-100 flex flex-col gap-2">
                              <button *ngIf="selectedTable()?.status === 'OCCUPIED'" 
                                      pButton label="Libérer la table" icon="pi pi-check-circle" 
                                      class="p-button-warning w-full rounded-xl shadow-md"
                                      (click)="quickRelease()"></button>
                                      
                              <button *ngIf="selectedTable()?.status === 'DIRTY'" 
                                      pButton label="Marquer comme propre" icon="pi pi-sparkles" 
                                      class="p-button-success w-full rounded-xl shadow-md"
                                      (click)="quickClean()"></button>
                            </div>
                          </div>
                      </p-tabpanel>
                      <p-tabpanel value="1">
                          <!-- < class="flex flex-col gap-2 h-15"> -->
                            <!-- [invalid]="isCreateFormInvalid('name')" -->
                            <div class="flex flex-col gap-2 grow overscroll-y-auto pb-2" >

                              <!-- <div class="flex flex-col items-start gap-2 p-2 w-full hover:bg-gray-50">
                                  <label class="text-xs font-bold text-win-text-sec uppercase tracking-wider">Numero de la table</label>
                                  <small>Le numero de la table doit etre unique</small>
                                  <my-number-stepper />
                              </div> -->

                              <div class="flex flex-col items-start gap-2 p-2 w-full hover:bg-gray-100">
                                  <label class="text-xs font-bold text-win-text-sec uppercase tracking-wider">Nombre de place de la table</label>
                                  <my-number-stepper [(value)]="updateTableForm.capacity"/>
                              </div>

                              <div class="flex flex-col items-start gap-2 p-2 w-full hover:bg-gray-100">
                                  <label class="text-xs font-bold text-win-text-sec uppercase tracking-wider">Activer ou désactiver la table</label>
                                  <div class="flex items-start gap-2">
                                      <p-checkbox  [binary]="true" inputId="available" [(ngModel)]="updateTableForm.enable"/>
                                      <small class="-translate-y-0.75">Lorsque vous activer une table elle devient accessible au client</small>

                                  </div>

                              </div>

                            </div>

                            <div class=" flex grow-0 justify-end gap-2">
                                  <button pButton label="Annuler"
                                          type="button" 
                                          (click)="showEditor = false"
                                          class="p-button-text p-button-secondary text-sm"></button>
                                  <button pButton label="Enregistrer" 
                                          (click)="updateTable()"
                                          class="p-button-primary shadow-fluent text-sm px-6"></button>
                              </div>

                            
                          <!-- </form> -->
                      </p-tabpanel>
                      
                  </p-tabpanels>
              </p-tabs>
        </p-dialog>
      </div>
    `,
    styles: [`
      /* Custom Styling pour Windows 11 SelectButton */
      :host ::ng-deep .win-selectbutton .p-selectbutton {
        display: grid;
        grid-template-cols: 1fr 1fr;
        gap: 8px;
      }
      :host ::ng-deep .win-selectbutton .p-button {
        background: #f9f9f9;
        border: 1px solid #eee !important;
        border-radius: 12px !important;
        color: #555;
        font-size: 0.8rem;
      }
      :host ::ng-deep .win-selectbutton .p-button.p-highlight {
        background: var(--color-win-primary) !important;
        color: white !important;
        box-shadow: 0 4px 12px rgba(0,103,192,0.2);
      }
    `]
  })
  export class TableManagementComponent implements OnInit{
    service = inject(RestaurantService);

    updateTableForm: TableForm = {
      id: 0,
      capacity: 0,
      enable: false,
      status: TableStatus.AVAILABLE
    }
    
    showEditor = false;
    selectedTable = signal<Table | null>(null);
    selectedStatus: TableStatus | undefined = undefined;

    // createForm = new FormGroup({
    //   code: new FormControl('',[Validators.required]),
    //   capacity: new FormControl(2,[Validators.required]),
    //   status: new FormControl<TableStatus>(TableStatus.AVAILABLE,[Validators.required])
    // })

    updateForm = new FormGroup({
      id: new FormControl(0,[Validators.required]),
      code: new FormControl('',[Validators.required]),
      capacity: new FormControl(2,[Validators.required]),
      status: new FormControl<TableStatus>(TableStatus.AVAILABLE,[Validators.required])
    })

    statusOptions = [
      { label: 'Libre', value: TableStatus.AVAILABLE },
      { label: 'Occupée', value: TableStatus.OCCUPIED },
      { label: 'Réservée', value: TableStatus.RESERVED },
      { label: 'Sale', value: TableStatus.DIRTY }
    ];

    translateFromStatus(status: TableStatus | undefined): string{
      return this.service.translateFromStatus(status)
    }

    openEditor(table: Table) {
      this.selectedTable.set(table);
      this.selectedStatus = table.status;
      this.initUpdateTableForm(table)
      this.showEditor = true;
    }

    initUpdateTableForm(table: Table){
      this.updateTableForm.id = table.id
      this.updateTableForm.capacity = table.capacity as number
      this.updateTableForm.status = table.status as TableStatus
      this.updateTableForm.enable = table.enable as boolean
    }

    onStatusChange(event: any) {
      if (this.selectedTable() && event.value) {
        console.log(this.selectedTable())
        this.selectedTable.update( st => {
          if(st)
            st.status = event.value
            
          return st
        })
        this.service.updateTable(this.selectedTable())
        // this.service.updateTableStatus(this.selectedTable()!.id, event.value);
      }
    }

    quickRelease() {
      this.service.releaseTable(this.selectedTable()!.id);
      this.showEditor = false;
    }

    quickClean() {
      this.service.cleanTable(this.selectedTable()!.id);
      this.showEditor = false;
    }

    getStatusColor(status: TableStatus | undefined): string {
      switch (status) {
        case TableStatus.AVAILABLE: return 'bg-green-500';
        case TableStatus.OCCUPIED: return 'bg-red-500';
        case TableStatus.RESERVED: return 'bg-win-primary';
        case TableStatus.DIRTY: return 'bg-yellow-500';
        default: return 'bg-gray-300';
      }
    }

    isCreateFormInvalid(arg0: string) {
      throw new Error('Method not implemented.');
    }

    createTable(){
      this.service.createTable()
    }

    updateTable(){
      this.showEditor = false
      this.service.updateTable(this.updateTableForm)
    }

    onSubmitCreateForm(){}

    onSubmitUpdateForm(){}

    ngOnInit(): void {
      this.service.loadTables()
    }
  }