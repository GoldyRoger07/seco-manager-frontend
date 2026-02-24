import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UrlService } from "./url.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
   url = inject(UrlService)
   private api = this.url.server+"/api/auth";
   http = inject(HttpClient)

   signup(form: any){
       return this.http.post(this.api+"/signup", form)   
   }

   signin(form: any){
      return this.http.post(this.api+"/signin", form)   
   }

   refreshToken(){
      return this.http.get(this.api+"/refresh-token", {})
   }

   saveToken(token: string){
      localStorage.setItem('token', token)
   }

   getToken(){
      return localStorage.getItem('token')
   }

   logout(){
      localStorage.removeItem('token')
   }

   getMe(){
      this.http.get(this.api+"/me").subscribe()
   }

}