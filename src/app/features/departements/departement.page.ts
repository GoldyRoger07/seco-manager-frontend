import { Component, inject, OnInit } from '@angular/core';
import { Departement } from './departement.model';
import { DepartementService } from './departement.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { EmployeeService } from '../employees/employee.service';
import { CustomCurrencyPipe } from "../../share/custom-currency.pipe";
import { CustomDate } from '../../share/custom-date.interface';

@Component({
  selector: 'departement-page',
  imports: [FormsModule, TableModule, IconField, InputIcon, Button, CommonModule, ToastModule, ConfirmDialog, Dialog, InputText],
  templateUrl: './departement.page.html',
  styleUrl: './departement.page.css',
  providers:[ConfirmationService, MessageService]
})
export class DepartementPage extends CustomDate implements OnInit {

  departementService = inject(DepartementService)

  employeeService = inject(EmployeeService)
  employees$ = this.employeeService.elements$

  departements$ = this.departementService.elements$


  confirmationService = inject(ConfirmationService)
  
  messageService = inject(MessageService)
  

  visible = false

  headerDialogTitle = "Title"

  currentOperation: "add" | "update" = "add"

  departement = new Departement()

  onAdd(){
        this.visible = true
        this.currentOperation = "add"
        this.headerDialogTitle = "Ajouter un departement"
  }
  
    onUpdate(departement: Departement){
        this.visible = true
        this.currentOperation = "update"
        this.headerDialogTitle = "Modifier ce departement"
        this.departement = departement
    }
  
    onValidate() {
      if(this.departement.name.length > 0){
        this.visible = false
        if(this.currentOperation === "add"){
          this.departementService.create(this.departement)
          .subscribe({
            next: (response)=> {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Departement crée avec succes' })
              this.refresh()
              console.log(response)
            },
            error: ()=> {}
          })
        }else{
          this.departementService.update(this.departement)
          .subscribe({
            next: (response)=> {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Departement modifiée avec succes' })

              console.log(response)
            },
            error: ()=> {}
          })
        }
      }
    }

    ngOnInit(): void {
      this.refresh()
    }

    refresh(){
     this.departementService.findAll()
    }

    findEmployees(query:string){
      this.employeeService.findAll(query)
    }

    
}
