import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-signup",
    imports: [InputTextModule, ButtonModule, ReactiveFormsModule],
    template: `
        <div class="h-screen w-screen flex items-center justify-center bg-blue-100">
            <div class="shadow-2xl w-75 h-fit flex flex-col bg-white p-5" >
                <h1 class="mb-5 font-bold text-gray-600">Creer un Compte</h1>

                <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-2">
                    <!-- <div class="flex flex-col gap-2"> -->
                        <!-- <label class="text-sm font-semibold">Username</label> -->
                        <input pInputText formControlName="fullname"  placeholder="Nom Complet" />
                        <input pInputText formControlName="username"  placeholder="Username" />
                    <!-- </div>  -->

                    <!-- <div class="flex flex-col gap-2"> -->
                        <!-- <label class="text-sm font-semibold">Password</label> -->
                        <input pInputText type="password" formControlName="password"  placeholder="Password" />
                    <!-- </div>  -->

                    <button pButton label="Enregistrer" type="submit" [disabled]="signupForm.invalid" class="shadow-fluent"></button>
                </form>
            </div>
        </div>
    `,
    styleUrl: "./signup.component.ts"
})
export class SignupComponent {

    authService = inject(AuthService)
    router = inject(Router)

    signupForm = new FormGroup({
        fullname: new FormControl('',[Validators.required]),
        username: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required])
    })

    onSubmit(){
        if(!this.signupForm.invalid){
            console.log(this.signupForm.value)
            this.authService.signup(this.signupForm.value)
            .subscribe((response:any) => this.router.navigate(['/signin']))
            // .subscribe((response:any) => localStorage.setItem('token',response.token))
        }
    }
}