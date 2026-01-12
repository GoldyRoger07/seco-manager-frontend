import { inject, Injectable } from '@angular/core';
import { EtatCivil } from './etat-civil.model';
import { CrudService } from '../../share/crud.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../share/url.service';

@Injectable({
  providedIn: 'root',
})
export class EtatCivilService extends CrudService<EtatCivil>{
    
    constructor(http: HttpClient, urlService: UrlService){
        super(http, urlService.serverUrl+"/etat-civils")
    }
  
}