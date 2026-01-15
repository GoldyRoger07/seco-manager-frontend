import { Component, inject } from '@angular/core';
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
interface Item{
  code: string
  name: string
}


@Component({
  selector: 'app-id-card',
  imports: [ReactiveFormsModule, FileUpload, CommonModule, Button, InputTextModule, Select],
  templateUrl: './id-card.html',
  styleUrl: './id-card.css',
  providers: [MessageService]
})
export class IdCard extends CustomDate{

  idCardService = inject(IdCardService)

  badgeForm: FormGroup = new FormGroup({
    id: new FormControl('',[Validators.required]),
    nom: new FormControl('', Validators.required),
    groupeSanguin: new FormControl('', Validators.required),
    nif: new FormControl('', Validators.required),
    photo: new FormControl(null, Validators.required)
  })

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
photoPreview: string | ArrayBuffer | null = null;
cardIdPreview: string | ArrayBuffer | Blob | null = null

onFileChange(event: any) {
  const file = event.target.files[0];

  if (!file) return;

  this.badgeForm.patchValue({ photo: file });

  const reader = new FileReader();
  reader.onload = () => {
    this.photoPreview = reader.result;
  };
  reader.readAsDataURL(file);
}


  submit() {
    if (!this.badgeForm.invalid) {
      
      const formData = new FormData();
      Object.entries(this.badgeForm.value).forEach(([key, value]) => {
        formData.append(key, value as any);
      });

      this.idCardService.createCardId(formData)
      .subscribe((blob)=>{
          const url = URL.createObjectURL(blob)
          this.cardIdPreview = url
          
      })

      console.log('FormData prêt à être envoyé', formData);
    }
  }
}
