import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TypeCongeService } from './type-conge.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TypeConge } from './type-conge.model';
import { EmployeeService } from '../employees/employee.service';
import { CustomDate } from '../../share/custom-date.interface';
import { Employee } from '../employees/employee.model';

@Component({
  selector: 'type-conge-page',
  imports: [FormsModule,TableModule, IconField, InputIcon, Button, CommonModule, ToastModule, ConfirmDialog, Dialog, InputText],
  templateUrl: './type-conge.page.html',
  styleUrl: './type-conge.page.css',
  providers:[ConfirmationService, MessageService]
})
export class TypeCongePage extends CustomDate implements OnInit{
  typeCongeService = inject(TypeCongeService)

  confirmationService = inject(ConfirmationService)

  messageService = inject(MessageService)

  // employeeService = inject(EmployeeService)
  employees:Employee[] = []
  

  typeConges$ = this.typeCongeService.elements$

  visible = false

  headerDialogTitle = "Title"

  currentOperation: "add" | "update" = "add"

  typeConge = new TypeConge()

  onAdd(){
        this.visible = true
        this.currentOperation = "add"
        this.headerDialogTitle = "Ajouter un Type de congé"
        this.typeConge = new TypeConge()
  }
  
    onUpdate(typeConge: TypeConge){
        this.visible = true
        this.currentOperation = "update"
        this.headerDialogTitle = "Modifier ce type de congé"
        this.typeConge = typeConge
    }
  
    onValidate() {
      if(this.typeConge.name.length > 0){
        this.visible = false
        if(this.currentOperation === "add"){
          this.typeCongeService.create(this.typeConge)
          .subscribe({
            next: (response)=> {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Type de congé crée avec succes' })
              
              this.refresh()
              // console.log(response)
            },
            error: ()=> {}
          })
        }else{
          this.typeCongeService.update(this.typeConge)
          .subscribe({
            next: (response)=> {
              console.log(response)
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Type de Congé modifiée avec succes' })
            },
            error: ()=> {}
          })
        }
      }
    }

    onDelete(event: Event, typeConge: TypeConge) {
            this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: 'Etes vous sure de vouloir supprimer ce type de Conge ?',
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
                   this.typeCongeService.delete(typeConge.id ).subscribe(() => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Typede congé supprimé avec succes' })) 
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
      this.typeCongeService.findAll()
    }

    ngOnInit(): void {
      this.refresh()
    }

    setEmployees(employees: Employee[]){
      console.log(employees)
     this.employees = employees
    }

}
