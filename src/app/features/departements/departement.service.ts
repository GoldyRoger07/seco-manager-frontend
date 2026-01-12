import { inject, Injectable } from '@angular/core';
import {  CrudService } from '../../share/crud.interface';
import { Departement } from './departement.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../share/url.service';

@Injectable({
  providedIn: 'root',
})
export class DepartementService extends CrudService<Departement>{

    constructor(http: HttpClient, urlService: UrlService){
        super(http, urlService.serverUrl+"/departements")
    }

    
}