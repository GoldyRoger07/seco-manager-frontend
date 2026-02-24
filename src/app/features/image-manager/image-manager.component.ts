import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { ImageService } from "../../core/services/image.service";

@Component({
    selector: 'image-manager',
    standalone: true,
    imports: [],
    templateUrl: './image-manager.component.html',
    styles: `
        .grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  gap: 12px;
}

.img-card {
  position: relative;
}

img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

button {
  position: absolute;
  top: 4px;
  right: 4px;
}

    `
})
export class ImageManagerComponent implements OnInit {

    imageService = inject(ImageService)
    images: WritableSignal<string[]> = signal([]);
    selectedFiles: File[] = [];

    
    ngOnInit() {
        this.loadImages();
    }

    loadImages() {
        this.imageService.list().subscribe(data => this.images.update(() => data));
    }

    onFilesSelected(event: any) {
        this.selectedFiles = Array.from(event.target.files);
    }

    upload() {
        if (!this.selectedFiles.length) return;

        this.imageService.upload(this.selectedFiles).subscribe(() => {
        this.selectedFiles = [];
        this.loadImages();
        });
    }

    remove(filename: string) {
        this.imageService.delete(filename).subscribe(() => {
        this.loadImages();
        });
    }

    imageUrl(filename: string) {
        return this.imageService.imageUrl(filename);
    }
}
