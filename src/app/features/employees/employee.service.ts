import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UrlService } from '../../share/url.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Employee, EmployeeForm } from './employee.model';
import { CrudService } from '../../share/crud.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends CrudService<Employee>{
  constructor(http: HttpClient, urlService: UrlService){
        super(http, urlService.serverUrl+"/employees")
  }

  

}
