import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { CustomDate } from '../../share/custom-date.interface';
import { CommonModule } from '@angular/common';
import { Button } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { Select } from "primeng/select";
import { FileUpload, FileUploadEvent, UploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { Skeleton } from 'primeng/skeleton';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdCardService } from './id-card.service';
import { Message } from 'primeng/message';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ProgressBar } from 'primeng/progressbar';

interface Item{
  code: string
  name: string
}


@Component({
  selector: 'app-id-card',
  imports: [ProgressBar, ProgressSpinner,ReactiveFormsModule, CommonModule, Button, InputTextModule, Select, Skeleton],
  templateUrl: './id-card.html',
  styleUrl: './id-card.css',
  providers: [MessageService]
})
export class IdCard extends CustomDate{


  isLoading$ = signal(false)
  isPhotoReady$ = signal(false)
  isIdCardLoading$ = signal(false)

  idCardService = inject(IdCardService)

  badgeForm: FormGroup = new FormGroup({
    id: new FormControl('',[Validators.required]),
    nom: new FormControl('', Validators.required),
    groupeSanguin: new FormControl('', Validators.required),
    nif: new FormControl('', Validators.required),
    photo: new FormControl(null, Validators.required)
  })

  formSubmitted = false;

  messageService = inject(MessageService)

  items: Item[] = [
    { code: "A+", name: "A+" },
    { code: "A-", name: "A-" },
    { code: "B+", name: "B+" },
    { code: "B-", name: "B-" },
    { code: "AB+", name: "AB+" },
    { code: "AB-", name: "AB-" },
    { code: "O+", name: "O+" },
    { code: "O-", name: "O-" },

  ]

  selectedItem: Item = { code: "A+", name: "A+" }

  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.badgeForm.patchValue({ photo: file });
  //   }
  // }
photoPreview$: WritableSignal<string | null> = signal(null);
cardIdPreview$: WritableSignal<String | null> = signal("img/recto-id-card-4.png")

onFileChange(event: any) {
  const file = event.target.files[0];
  console.log(file)
  if (!file) return;

  this.badgeForm.patchValue({ photo: file });

  const reader = new FileReader();
  reader.onload = () => {
    this.photoPreview$.set(reader.result as string);
    this.isPhotoReady$.set(true)
  };
  reader.readAsDataURL(file);
}


  submit() {
    this.formSubmitted = true;
    
    if (!this.badgeForm.invalid) {
      this.isLoading$.set(true)
      // this.cardIdPreview$.set('img/recto-id-card-4.png')
      this.isIdCardLoading$.set(true)
      const formData = new FormData();
      Object.entries(this.badgeForm.value).forEach(([key, value]) => {
        formData.append(key, value as any);
      });

      this.idCardService.createCardId(formData)
      .subscribe({
        next:(response:any)=>{
          this.isLoading$.set(false)
          console.log(this.isLoading$)
          this.cardIdPreview$.set(`${response.file}?t=${Date.now()}`);
          
            // console.log()
        },
        error: () => this.isLoading$.set(false)
      })
      this.formSubmitted = false;
      
      console.log('FormData prêt à être envoyé', formData);
    }
  }

    isInvalid(controlName: string) {
        const control = this.badgeForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted) ;
    }

  //  downloadIdCard() {
  //   const a = document.createElement('a');
  //   a.href = this.cardIdPreview as string; // URL serveur

  //   a.download = 'badge.png';
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   console.log(a)
  //  }

  async downloadIdCard() {
    const response = await fetch(this.cardIdPreview$() as string);
    const blob = await response.blob();

    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'badge.png';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(blobUrl);
  }
}
