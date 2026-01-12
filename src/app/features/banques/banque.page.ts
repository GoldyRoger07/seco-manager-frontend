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

@Component({
  selector: 'banque-page',
  imports: [ReactiveFormsModule, FormsModule,TableModule, IconField, InputIcon, Button, CommonModule, ToastModule, ConfirmDialog, Dialog, InputText],
  templateUrl: './banque.page.html',
  styleUrl: './banque.page.css',
  providers:[ConfirmationService, MessageService]
})
export class BanquePage extends CustomDate implements OnInit{

  banqueService = inject(BanqueService)

  employeeService = inject(EmployeeService)

  banques$ = this.banqueService.elements$

  employees$ = this.employeeService.elements$

  visible = false

  confirmationService = inject(ConfirmationService)

  messageService = inject(MessageService)

  headerDialogTitle = "Title"

  currentOperation: "add" | "update" = "add"

  banque = new Banque();

  formGroupe = new FormGroup({
    name: new FormControl('',[Validators.required])
  })

  onAdd(){
      this.visible = true
      this.currentOperation = "add"
      this.headerDialogTitle = "Ajouter une Banque"
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

  refresh(){
    this.banqueService.findAll()
  }

  ngOnInit(): void {
    this.refresh()
  }

  findEmployees(query:string){
      this.employeeService.findAll(query)
  }
  
}
