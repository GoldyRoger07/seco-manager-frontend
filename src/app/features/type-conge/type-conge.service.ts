import { inject, Injectable } from '@angular/core';
import { CrudService } from '../../share/crud.interface';
import { TypeConge } from './type-conge.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../share/url.service';

@Injectable({
  providedIn: 'root',
})
export class TypeCongeService extends CrudService<TypeConge>{

    constructor(http: HttpClient, urlService: UrlService){
        super(http, urlService.serverUrl+"/type-conges")
    }
}