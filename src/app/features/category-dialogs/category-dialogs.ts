import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImagePickerComponent } from "../image-picker/image-picker.component";
import { MenuService } from '../../core/services/menu.service';
import { Dialog } from "primeng/dialog";
import { InputTextModule } from 'primeng/inputtext';
import { Category } from '../../core/models';
import { ButtonModule } from 'primeng/button';
import { CategoryDialogService } from './category-dialogs.service';

@Component({
  selector: 'category-dialogs',
  imports: [ImagePickerComponent, ReactiveFormsModule, Dialog, InputTextModule, ButtonModule],
  templateUrl: './category-dialogs.html',
  styleUrl: './category-dialogs.css',
})
export class CategoryDialogs implements OnInit{

  menuService = inject(MenuService)
  categoryDialogService = inject(CategoryDialogService)

  createDialog$ = this.categoryDialogService.createDialogSubject.asObservable()
  updateDialog$ = this.categoryDialogService.updateDialogSubject.asObservable()

  
  displayCreateDialog = false

  displayUpdateDialog = false

  createFormSubmitted = false
  updateFormSubmitted = false

  @Input()
  currentCategory: Category = {id: 0}

  createForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('',[Validators.required]),
      description: new FormControl('no content'),
      coverUrl: new FormControl(''),
  })

  updateForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('',[Validators.required]),
      description: new FormControl('no content'),
      coverUrl: new FormControl(''),
  })

  onCreateImageSelected(url: string){
    this.createForm.controls.coverUrl.setValue(url)
  }

  onUpdateImageSelected(url: string){
    this.createForm.controls.coverUrl.setValue(url)
  }

  onSubmitCreateForm(){
    this.createFormSubmitted = true
    if(!this.createForm.invalid){
      this.menuService.createCategory(this.createForm.value)
      this.displayCreateDialog = false
      this.createFormSubmitted = false
    }
  }

  onSubmitUpdateForm(){
    this.updateFormSubmitted = true
    if(!this.updateForm.invalid){
      this.menuService.updateCategory(this.updateForm.value)
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
    this.currentCategory = this.menuService.getCurrentCategory() as Category
    this.updateForm.setValue({
      id: this.currentCategory.id,
      name: this.currentCategory.name as string,
      description: this.currentCategory.description as string,
      coverUrl: this.currentCategory.coverUrl as string
    })

  }

  ngOnInit(): void {
    this.createDialog$.subscribe(status=>{
      this.displayCreateDialog = status
    })

    this.updateDialog$.subscribe(status=>{
      if(status)
        this.initUpdateForm()
      this.displayUpdateDialog = status
      
    })
  }

  
}
