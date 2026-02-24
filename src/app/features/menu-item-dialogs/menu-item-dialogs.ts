import { Component, inject, Input, OnInit } from '@angular/core';
import { ImagePickerComponent } from "../image-picker/image-picker.component";
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MenuService } from '../../core/services/menu.service';
import { Category, MenuItem } from '../../core/models';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from "primeng/dialog";
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { MenuItemDialogService } from './menu-item-dialogs.service';

@Component({
  selector: 'menu-item-dialogs',
  imports: [CommonModule, CheckboxModule, ReactiveFormsModule, ImagePickerComponent, InputTextModule, InputNumberModule, ButtonModule, DialogModule],
  templateUrl: './menu-item-dialogs.html',
  styleUrl: './menu-item-dialogs.css',
})
export class MenuItemDialogs implements OnInit{

  menuService = inject(MenuService)
  menuItemDialogService = inject(MenuItemDialogService)
  
  createDialog$ = this.menuItemDialogService.createDialogSubject.asObservable()
  updateDialog$ = this.menuItemDialogService.updateDialogSubject.asObservable()


  @Input()
  displayCreateDialog = false
  
  @Input()
  displayUpdateDialog = true
  
  createFormSubmitted = false
  updateFormSubmitted = false

  hasVariations = true

  

  private _currentMenuItem: MenuItem = {id:0}

  fb = inject(FormBuilder)

  createForm = this.fb.group({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('no content'),
    coverUrl: new FormControl(''),
    available: new FormControl(false, [Validators.required]),
    categoryId: new FormControl(0, [Validators.required]),
    variations: new FormArray([
      new FormGroup({
        name: new FormControl('',[Validators.required]),
        price: new FormControl(0,[Validators.required])
      })
    ])
  })

  updateForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('',[Validators.required]),
    description: new FormControl('no content'),
    coverUrl: new FormControl('', [Validators.required]),
    available: new FormControl(false, [Validators.required]),
    categoryId: new FormControl(0,[Validators.required]),
    variations: new FormArray([
      new FormGroup({
        id: new FormControl(0),
        name: new FormControl('',[Validators.required]),
        price: new FormControl(0,[Validators.required])
      })
    ])
  })

  @Input()
  set currentMenuItem(val: MenuItem){
    this._currentMenuItem = val

    this.initUpdateForm()
  }

  get currentMenuItem(){
    return this._currentMenuItem
  }

  createVariation(){
    return new FormGroup({
      id: new FormControl(0),
      name: new FormControl('',[Validators.required]),
      price: new FormControl(0,[Validators.required])
    })
  }

  addVariationC(){
    this.variationsC.push(this.createVariation())
  }

  addVariationU(){
    this.variationsU.push(this.createVariation())
  }

  removeVariationC(index: number){
    this.variationsC.removeAt(index)
  }

  removeVariationU(index: number){
    this.variationsU.removeAt(index)
  }

  get variationsC(){
    return this.createForm.get('variations') as FormArray
  }

  get variationsU(){
    return this.updateForm.get('variations') as FormArray
  }

  onCreateImageSelected(url: string){
    this.createForm.controls.coverUrl.setValue(url)
  }

  onUpdateImageSelected(url: string){
    this.updateForm.controls.coverUrl.setValue(url)
  }

  onSubmitCreateForm(){
    this.createFormSubmitted = true
    if(!this.createForm.invalid){
      this.createForm.controls.categoryId.setValue(this.menuService.selectedCategoryId() as number);
      
      console.log(this.createForm.value)
      this.menuService.createMenuItem(this.createForm.value)
      this.displayCreateDialog = false
      this.createFormSubmitted = false
    }
  }

  onSubmitUpdateForm(){
    this.updateFormSubmitted = true
    if(!this.updateForm.invalid){
      this.menuService.updateMenuItem(this.updateForm.value)
      this.displayUpdateDialog = false
      this.updateFormSubmitted = false
    }
  }

  isCreateFormInvalid(controlName: string) {
    return this.isInvalid(controlName, this.createForm, this.createFormSubmitted)
  }

  isUpdateFormInvalid(controlName: string) {
    return this.isInvalid(controlName, this.updateForm, this.updateFormSubmitted)
  }

  isInvalid(controlName: string, form: any, formSubmitted: boolean) {
        const control = form.get(controlName);
        return control?.invalid && (control.touched || formSubmitted) ;
  }

  initUpdateForm(){
    if(this._currentMenuItem.name){
      this.updateForm.patchValue({
        id: this._currentMenuItem.id,
        name: this._currentMenuItem.name as string,
        description: this._currentMenuItem.description as string,
        coverUrl: this._currentMenuItem.coverUrl as string,
        available: this._currentMenuItem.available as boolean,
        categoryId: this._currentMenuItem.category?.id as number,
      })

      this.variationsU.clear()

      this.currentMenuItem.variations?.forEach(v => {
        this.variationsU.push({
          id: v.id,
          name: v.name,
          price: v.price
        })
      })
    }

  }

  ngOnInit(): void {
    this.createDialog$.subscribe(status=>{
      this.displayCreateDialog = status
    })

    this.updateDialog$.subscribe(status=>{
      this.displayUpdateDialog = status
    })
  }

  
}
