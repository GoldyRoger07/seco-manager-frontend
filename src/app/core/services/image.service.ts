import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UrlService } from "./url.service";

@Injectable({ providedIn: 'root' })
export class ImageService {

    url = inject(UrlService)
    private api = this.url.server+"/api/images";

    http = inject(HttpClient)

//   constructor(private http: HttpClient) {}

  list() {
    return this.http.get<string[]>(this.api);
  }

  upload(files: File[]) {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    return this.http.post<string[]>(`${this.api}/upload`, formData);
  }

  delete(filename: string) {
    return this.http.delete(`${this.api}/${filename}`);
  }

  imageUrl(filename: string) {
    return `${this.url.server}/uploads/${filename}`;
  }
}
