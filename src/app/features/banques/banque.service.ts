import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UrlService } from '../../share/url.service';
import {  CrudService } from '../../share/crud.interface';
import { Banque } from './banque.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BanqueService extends CrudService<Banque>{
    // http = inject(HttpClient)
    
    // urlService = inject(UrlService)

    constructor(http: HttpClient, urlService: UrlService){
        super(http, urlService.serverUrl+"/banques")
    }

    // private banquesSubject$ = new BehaviorSubject<Banque[]>([]); 
    // banques$ = this.banquesSubject$.asObservable()
    
    
    // create(element: Banque): Observable<any> {
    //     return this.http.post(this.urlService.serverUrl+"/banques",element)
    // }

    // find(id: string): Observable<Banque> {
    //     return this.http.get<Banque>(this.urlService.serverUrl+"/banques/"+id)
    // }

    // findAll(){
    //     this.http.get<Banque[]>(this.urlService.serverUrl+"/banques")
    //     .subscribe((data) => this.banquesSubject$.next(data))
    // }

    // update(element: Banque): Observable<any> {
    //     return this.http.put(this.urlService.serverUrl+"/banques/",element)
    // }

    // delete(id: string): Observable<any> {
    //     return this.http.delete(this.urlService.serverUrl+"/banques/"+id)
    // }

}