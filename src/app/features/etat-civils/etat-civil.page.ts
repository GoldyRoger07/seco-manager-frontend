import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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
import { EtatCivilService } from './etat-civil.service';
import { EtatCivil } from './etat-civil.model';
import { EmployeeService } from '../employees/employee.service';
import { CustomDate } from '../../share/custom-date.interface';

@Component({
  selector: 'etat-civil-page',
  imports: [FormsModule,TableModule, IconField, InputIcon, Button, CommonModule, ToastModule, ConfirmDialog, Dialog, InputText],
  templateUrl: './etat-civil.page.html',
  styleUrl: './etat-civil.page.css',
  providers:[ConfirmationService, MessageService]
})
export class EtatCivilPage extends CustomDate implements OnInit{
  etatCivilService = inject(EtatCivilService)
  
    confirmationService = inject(ConfirmationService)
  
    messageService = inject(MessageService)
  
    etatCivils$ = this.etatCivilService.elements$

    employeeService = inject(EmployeeService)
    employees$ = this.employeeService.elements$
    
  
    visible = false
  
    headerDialogTitle = "Title"
  
    currentOperation: "add" | "update" = "add"
  
    etatCivil = new EtatCivil()
  
    onAdd(){
          this.visible = true
          this.currentOperation = "add"
          this.headerDialogTitle = "Ajouter un etat civil"
          this.etatCivil = new EtatCivil()
    }
    
      onUpdate(etatCivil: EtatCivil){
          this.visible = true
          this.currentOperation = "update"
          this.headerDialogTitle = "Modifier cet etat civil"
          this.etatCivil = etatCivil
      }
    
      onValidate() {
        if(this.etatCivil.name.length > 0){
          this.visible = false
          if(this.currentOperation === "add"){
            this.etatCivilService.create(this.etatCivil)
            .subscribe({
              next: (response)=> {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'EtatCivil crée avec succes' })
                
                this.refresh()
                // console.log(response)
              },
              error: ()=> {}
            })
          }else{
            this.etatCivilService.update(this.etatCivil)
            .subscribe({
              next: (response)=> {
                console.log(response)
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'EtatCivil modifiée avec succes' })
              },
              error: ()=> {}
            })
          }
        }
      }
  
      onDelete(event: Event, etatCivil: EtatCivil) {
              this.confirmationService.confirm({
                  target: event.target as EventTarget,
                  message: 'Etes vous sure de vouloir supprimer cette etatCivil ?',
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
                     this.etatCivilService.delete(etatCivil._id ).subscribe(() => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Banque supprimée avec succes' })) 
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
        this.etatCivilService.findAll()
      }

  
      findEmployees(query:string){
        this.employeeService.findAll(query)
      }
}
