import { Component, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'my-file-uploader',
  imports: [Skeleton],
  templateUrl: './my-file-uploader.html',
  styleUrl: './my-file-uploader.css',
})
export class MyFileUploader {

  isPhotoReady$ = signal(false)
  photoPreview$: WritableSignal<string | null> = signal(null);

  @Output()
  loadFile = new EventEmitter()

  onFileChange(event: any) {
    const file = event.target.files[0];
    // console.log(file)
    if (!file) return;

    this.loadFile.next(file)
    // this.badgeForm.patchValue({ photo: file });

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview$.set(reader.result as string);
      this.isPhotoReady$.set(true)
    };
    reader.readAsDataURL(file);
  }
}
