import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {

  serverUrl = "http://localhost:8080/api"

}
