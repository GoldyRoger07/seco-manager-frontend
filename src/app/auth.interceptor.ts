import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "./core/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    authService = inject(AuthService)
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        const keyword = ['signup','signin']
        let withToken = true
        let authReq = req
        keyword.forEach(k => {
            if(req.url.includes(k))
                withToken = false
        })

        if(withToken && token) {
            // console.log("Hello "+req.url.includes('signup'))
            authReq = this.addToken(req, token);
        }


        return next.handle(authReq).pipe(
      catchError(error => {
        // 2. Si erreur 401, on tente le rafraîchissement
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refreshToken().pipe(
            switchMap((res: any) => {
                // 3. Stocker le nouveau token et rejouer la requête
                this.authService.saveToken(res.token);
                return next.handle(this.addToken(request, res.token));
            }),
            catchError((err) => {
                // 4. Si le refresh échoue, déconnexion forcée
                this.authService.logout();
                return throwError(() => err);
            })
        );
    }

    
}