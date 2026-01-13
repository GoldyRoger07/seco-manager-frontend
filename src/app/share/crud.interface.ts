import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

export abstract class CrudService<T>{

    private elementsSubject$ = new BehaviorSubject<T[]>([])
    elements$ = this.elementsSubject$.asObservable()

    constructor(protected http: HttpClient, protected url: string){}

    create(element: T): Observable<any>{
        return this.http.post(this.url,element)
    }

    find(id: string): Observable<T>{
        return this.http.get<T>(this.url+"/"+id)
    }

    findAll(query=""){
        this.http.get<T[]>(this.url+query)
        .subscribe((data) => this.elementsSubject$.next(data))
    }


    update(element: T): Observable<any>{
        return this.http.put(this.url,element)
    }

    delete(id: number): Observable<any>{
        return this.http.delete(this.url+"/"+id)
    }
}