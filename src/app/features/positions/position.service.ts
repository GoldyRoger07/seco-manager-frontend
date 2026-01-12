import { inject, Injectable } from '@angular/core';
import {  CrudService } from '../../share/crud.interface';
import { Position } from './position.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../share/url.service';
import { EtatCivil } from '../etat-civils/etat-civil.model';

@Injectable({
  providedIn: 'root',
})
export class PositionService extends CrudService<Position>{
    constructor(http: HttpClient, urlService: UrlService){
        super(http, urlService.serverUrl+"/positions")
    }  
}