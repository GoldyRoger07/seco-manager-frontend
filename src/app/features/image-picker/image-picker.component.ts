import { Component, EventEmitter, inject, Input, input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { ImageService } from '../../core/services/image.service';
import { Button } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { Skeleton } from "primeng/skeleton";

@Component({
  selector: 'image-picker',
  imports: [ Dialog, Skeleton],
  templateUrl: './image-picker.component.html',
  styleUrl: './image-picker.component.css'
})
export class ImagePickerComponent implements OnInit {

    isPhotoReady$ = signal(false)

    selectedImage = ""

    private _currentImage:string | undefined = ""

    @Input()
    set currentImage(val: string | undefined){
        this._currentImage = val

        if(val)
            this.onValueChanged(val)
    }

    get currentImage(){
        return this._currentImage
    }

    onValueChanged(value: string) {
        this.isPhotoReady$.set(true)
       this.photoPreview$.set(value)
    }

    photoPreview$:WritableSignal<string|undefined> = signal("")

    imageService = inject(ImageService)

    @Output()
    imageSelected = new EventEmitter<string>();

    visible = false;
    images: string[] = [];
    
    ngOnInit() {
        this.loadImages();
    }

    open() {
        // this.visible = true;
    }

    close() {
        this.visible = false;
    }

    loadImages() {
        this.imageService.list().subscribe(images => {
        this.images = images;
        });
    }

    selectImage(filename: string) {
        const url = this.imageService.imageUrl(filename);
        this.imageSelected.emit(url);
        this.photoPreview$.set(url)
        this.isPhotoReady$.set(true)
        this.selectedImage = filename
    }

    imageUrl(filename: string) {
        return this.imageService.imageUrl(filename);
    }
}
