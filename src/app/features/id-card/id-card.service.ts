import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UrlService } from '../../share/url.service';

@Injectable({
  providedIn: 'root',
})
export class IdCardService {
  http = inject(HttpClient)
  url = inject(UrlService)

  createCardId(badgeForm: any){
    return this.http.post(this.url.serverUrl+"/badges/create", badgeForm)
  }
}
