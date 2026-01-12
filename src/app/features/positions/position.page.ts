import { Component, inject, OnInit } from '@angular/core';
import { PositionService } from './position.service';
import { Position } from './position.model';
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
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from '../employees/employee.service';
import { CustomDate } from '../../share/custom-date.interface';

@Component({
  selector: 'position-page',
  imports: [FormsModule,TableModule, IconField, InputIcon, Button, CommonModule, ToastModule, ConfirmDialog, Dialog, InputText],
  templateUrl: './position.page.html',
  styleUrl: './position.page.css',
  providers:[ConfirmationService, MessageService]
})
export class PositionPage extends CustomDate implements OnInit{
  positionService = inject(PositionService)

  confirmationService = inject(ConfirmationService)

  messageService = inject(MessageService)

  positions$ = this.positionService.elements$

  employeeService = inject(EmployeeService)
  employees$ = this.employeeService.elements$
  

  visible = false

  headerDialogTitle = "Title"

  currentOperation: "add" | "update" = "add"

  position = new Position()

  onAdd(){
        this.visible = true
        this.currentOperation = "add"
        this.headerDialogTitle = "Ajouter une Position"
        this.position = new Position()
  }
  
    onUpdate(position: Position){
        this.visible = true
        this.currentOperation = "update"
        this.headerDialogTitle = "Modifier cette Position"
        this.position = position
    }
  
    onValidate() {
      if(this.position.name.length > 0){
        this.visible = false
        if(this.currentOperation === "add"){
          this.positionService.create(this.position)
          .subscribe({
            next: (response)=> {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Position crée avec succes' })
              this.refresh()
              // console.log(response)
            },
            error: ()=> {}
          })
        }else{
          this.positionService.update(this.position)
          .subscribe({
            next: (response)=> {
              console.log(response)
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Position modifiée avec succes' })
              
              this.refresh()
            },
            error: ()=> {}
          })
        }
      }
    }

    onDelete(event: Event, position: Position) {
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
                   this.positionService.delete(position._id ).subscribe(() => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Banque supprimée avec succes' })) 
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

    ngOnInit(): void {
      this.refresh()
    }
    refresh(){
      this.positionService.findAll()
    }

    findEmployees(query:string){
      this.employeeService.findAll(query)
    }


}
