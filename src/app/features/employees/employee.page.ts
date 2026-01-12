import { Component, inject, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { EmployeeService } from './employee.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Employee } from './employee.model';
import { FormsModule } from '@angular/forms';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { Banque } from '../banques/banque.model';
import { Departement } from '../departements/departement.model';
import { EtatCivil } from '../etat-civils/etat-civil.model';
import { Position } from '../positions/position.model';
import { TypeConge } from '../type-conge/type-conge.model';
import { BanqueService } from '../banques/banque.service';
import { DepartementService } from '../departements/departement.service';
import { EtatCivilService } from '../etat-civils/etat-civil.service';
import { PositionService } from '../positions/position.service';
import { TypeCongeService } from '../type-conge/type-conge.service';
import { CustomCurrencyPipe } from "../../share/custom-currency.pipe";
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { CustomDate } from '../../share/custom-date.interface';

interface SelectType{
  name: string;
  code: any;
}

@Component({
  selector: 'employee-page',
  imports: [DatePickerModule ,SelectModule ,FormsModule, TableModule, IconField, InputIcon, ButtonModule, CommonModule, ToastModule, ConfirmDialog, Dialog, InputText, CustomCurrencyPipe],
  templateUrl: './employee.page.html',
  styleUrl: './employee.page.css',
  providers:[DecimalPipe,ConfirmationService, MessageService]

})
export class EmployeePage extends CustomDate implements OnInit{

  employeeService = inject(EmployeeService)

  employees$ = this.employeeService.elements$

  banqueService = inject(BanqueService)
  departementService = inject(DepartementService)
  etatCivilService = inject(EtatCivilService)
  positionService = inject(PositionService)
  typeCongeService = inject(TypeCongeService)
  
  confirmationService = inject(ConfirmationService)

  messageService = inject(MessageService)

  visible = false

  headerDialogTitle = "Title"
  headerDialogSubtitle = "Les champs annotes avec un * sont obligatoire"

  currentOperation: "add" | "update" | "view" = "add"

  employee = new Employee()

  sexes: SelectType[] = [
    { name: 'Masculin', code: 'MASCULIN' },
    { name: 'Feminin', code: 'FEMININ' }
  ];

  departements$!: Observable<Departement[]> ;
  banques$!: Observable<Banque[]> ;
  etatCivils$!: Observable<EtatCivil[]> ;
  typeConges$!: Observable<TypeConge[]> ;
  positions$!: Observable<Position[]> ;



  departements: SelectType[] = [];

  etatCivils: SelectType[] = [];

  positions: SelectType[] = []

  banques: SelectType[] = []

  typeConges: SelectType[] = []

  selectedSexe: SelectType  = { name: 'Masculin', code: 'MASCULIN' };

  selectedDepartement: SelectType  = {
    name: '',
    code: 0
  };
  selectedEtatCivil: SelectType = {
    name: '',
    code: 0
  };
  selectedPosition: SelectType  = {
    name: '',
    code: 0
  };
  selectedBanque: SelectType  = {
    name: '',
    code: 0
  };
  selectedTypeConge: SelectType  = {
    name: '',
    code: 0
  };

  ngOnInit(): void {
    this.employeeService.findAll()
    this.banques$ = this.banqueService.elements$
    this.departements$ = this.departementService.elements$    
    this.etatCivils$ = this.etatCivilService.elements$
    this.typeConges$ = this.typeCongeService.elements$
    this.positions$ = this.positionService.elements$

    this.banqueService.findAll()
    this.departementService.findAll()
    this.etatCivilService.findAll()
    this.typeCongeService.findAll()
    this.positionService.findAll()
  }

    onView(employee:Employee){
      this.visible = true
      
    }

    showDialog(
      currentOperation: "add"|"update"|"view",
      title: string,
      subtitle?:string,
      employee?:Employee
    ){
      this.visible = true
      this.currentOperation = currentOperation
      this.headerDialogTitle = title
      this.headerDialogSubtitle = subtitle?subtitle:""
      this.employee = employee? employee:new Employee()
    }

    onAdd(){
          this.visible = true
          this.currentOperation = "add"
          this.headerDialogTitle = "Ajouter une employee"
          this.employee = new Employee()
    }
  
    onUpdate(employee: Employee){
        this.visible = true
        this.currentOperation = "update"
        this.headerDialogTitle = "Modifier cet employe"
        this.employee = employee

        this.employee.dateEmbauche = new Date(employee.dateEmbauche)
        this.employee.dateNaissance = new Date(employee.dateNaissance)
        
        this.selectedDepartement = {
          name: this.capitalizeFirstLetter(this.employee.departement.name),
          code: this.employee.departement._id
        }

        this.selectedPosition = {
          name: this.capitalizeFirstLetter(this.employee.position.name),
          code: this.employee.position._id
        }

        this.selectedEtatCivil = {
          name: this.capitalizeFirstLetter(this.employee.etatCivil.name),
          code: this.employee.etatCivil._id
        }

        this.selectedSexe = {
          name: this.capitalizeFirstLetter(this.employee.sexe),
          code: this.employee.sexe
        }

        this.selectedBanque = {
          name: this.capitalizeFirstLetter(this.employee.banque.name),
          code: this.employee.banque._id
        }

        this.selectedTypeConge = {
          name: this.capitalizeFirstLetter(this.employee.typeConge.name),
          code: this.employee.typeConge._id
        }
    }
  
    onValidate() {
      if(this.employee.nom.length > 0){
        this.visible = false
        if(this.currentOperation === "add"){
          this.getInfoFromSelects()
          this.employeeService.create(this.employee)
          .subscribe({
            next: (response)=> {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'employee crée avec succes' })
              this.refresh()
              // console.log(response)
            },
            error: ()=> {}
          })
        }else{
          this.getInfoFromSelects()
          this.employeeService.update(this.employee)
          .subscribe({
            next: (response)=> {
              console.log(response)
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'employee modifiée avec succes' })
            },
            error: ()=> {}
          })
        }
      }
    }

    onDelete(event: Event, employee: Employee) {
            this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: 'Etes vous sure de vouloir supprimer cette employee ?',
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
                   this.employeeService.delete(employee._id ).subscribe(() => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Banque supprimée avec succes' })) 
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

    fullSelectsFromServices(banques: Banque[], departements: Departement[], etatCivils: EtatCivil[], positions: Position[], typeConges: TypeConge[]){
    this.banques = banques.map(banque => ({
      name: this.capitalizeFirstLetter(banque.name as string),
      code: banque._id
    }))

    this.etatCivils = etatCivils.map(etatCivil => ({
      name: this.capitalizeFirstLetter(etatCivil.name),
      code: etatCivil._id
    }))

    this.departements = departements.map(departements => ({
      name: this.capitalizeFirstLetter(departements.name),
      code: departements._id
    }))

    this.positions = positions.map(position => ({
      name: this.capitalizeFirstLetter(position.name),
      code: position._id
    }))

    this.typeConges = typeConges.map(typeConge => ({
      name: this.capitalizeFirstLetter(typeConge.name),
      code: typeConge._id
    }))
  }

  getInfoFromSelects(){
    this.employee.departement._id = this.selectedDepartement.code 
    this.employee.etatCivil._id =  this.selectedEtatCivil.code 
    this.employee.position._id = this.selectedPosition.code ;
    this.employee.sexe = this.selectedSexe ? this.selectedSexe.code as 'MASCULIN' | 'FEMININ' : 'MASCULIN';
    this.employee.banque._id = this.selectedBanque.code ;
    this.employee.typeConge._id = this.selectedTypeConge.code

    // console.log(this.selectedDepartement.code )

  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  refresh(){
    this.employeeService.findAll()
  }

}
