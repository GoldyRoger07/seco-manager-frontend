import { Component, inject, OnInit } from '@angular/core';
import { BanqueService } from './banque.service';
import { TableModule } from "primeng/table";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Dialog } from "primeng/dialog";
import { Banque } from './banque.model';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from '../employees/employee.service';
import { CustomDate } from '../../share/custom-date.interface';
import { TooltipModule } from 'primeng/tooltip';
import { TooltipDirective } from '../../shared/tooltip';
import { Employee } from '../employees/employee.model';

@Component({
  selector: 'banque-page',
  imports: [TooltipDirective, TooltipModule, ReactiveFormsModule, FormsModule, TableModule, IconField, InputIcon, Button, CommonModule, ToastModule, ConfirmDialog, Dialog, InputText],
  templateUrl: './banque.page.html',
  styleUrl: './banque.page.css',
  providers:[ConfirmationService, MessageService]
})
export class BanquePage extends CustomDate implements OnInit{

  banqueService = inject(BanqueService)

  
  banques$ = this.banqueService.elements$

  employees:Employee[] = []

  visible = false

  confirmationService = inject(ConfirmationService)

  messageService = inject(MessageService)

  headerDialogTitle = "Title"

  currentOperation: "add" | "update" = "add"

  banque = new Banque();

  tooltipOptions = {
        showDelay: 150,
        autoHide: false,
        tooltipEvent: 'hover',
        tooltipPosition: 'left'
  };

  tooltipText = " Liste des employés ayant un compte bancaire au pres de cette banque"

  formGroupe = new FormGroup({
    name: new FormControl('',[Validators.required])
  })

  onAdd(){
      this.visible = true
      this.currentOperation = "add"
      this.headerDialogTitle = "Ajouter une Banque"
      this.banque = new Banque()
  }

  onUpdate(banque: Banque){
      this.visible = true
      this.currentOperation = "update"
      this.headerDialogTitle = "Modifier cette Banque"
      this.banque = banque
  }

  onValidate() {
    if(this.banque.name.length > 0){
      this.visible = false
      if(this.currentOperation === "add"){
        this.banqueService.create(this.banque)
        .subscribe({
          next: (response)=> {
            this.refresh()
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Banque crée avec succes' })

            console.log(response)
          },
          error: ()=> {}
        })
      }else{
        this.banqueService.update(this.banque)
        .subscribe({
          next: (response)=> {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Banque modifée avec succes' })

            console.log(response)
          },
          error: ()=> {}
        })
      }
    }
  }

  onDelete(event: Event, banque: Banque) {
              this.confirmationService.confirm({
                  target: event.target as EventTarget,
                  message: 'Etes vous sure de vouloir supprimer cette position ?',
                  header: 'Confirmation',
                  closable: true,
                  closeOnEscape: true,
                  icon: 'pi pi-exclamation-triangle',
                  rejectButtonProps: {
                      label: 'Cancel',
                      severity: 'secondary',
                      outlined: true,
                  },
                  acceptButtonProps: {
                      label: 'Delete',
                      severity: 'danger'
                  },
                  accept: () => {
                      // this.employeeService.delete(emp.id as number).subscribe(() => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employé supprimé avec succes' }))
                     this.banqueService.delete(banque.id ).subscribe(() => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Position supprimée avec succes' })) 
                  },
                  reject: () => {
                      // this.messageService.add({
                      //     severity: 'error',
                      //     summary: 'Rejected',
                      //     detail: 'You have rejected',
                      //     life: 3000,
                      // });
                  },
              });
      }

  refresh(){
    this.banqueService.findAll()
  }

  ngOnInit(): void {
    this.refresh()
  }

  setEmployees(employees: Employee[]){
            
           this.employees = employees
  }
  
}
