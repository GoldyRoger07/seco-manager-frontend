import { Component, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { AuthService } from "../../core/services/auth.service";

@Component({
    selector: "app-signin",
    template: `
        <div class="h-screen w-screen flex items-center justify-center bg-blue-100">
            <div class="shadow-2xl w-75 h-fit flex flex-col bg-white p-5" >
                <h1 class="mb-5 font-bold text-gray-600">Se connecter</h1>

                <form [formGroup]="signinForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-2">
                    <!-- <div class="flex flex-col gap-2"> -->
                        <!-- <label class="text-sm font-semibold">Username</label> -->
                        <!-- <input pInputText formControlName="fullname"  placeholder="Nom Complet" /> -->
                        <input pInputText formControlName="username"  placeholder="Username" />
                    <!-- </div>  -->

                    <!-- <div class="flex flex-col gap-2"> -->
                        <!-- <label class="text-sm font-semibold">Password</label> -->
                        <input pInputText type="password" formControlName="password"  placeholder="Password" />
                    <!-- </div>  -->

                    <button pButton label="Enregistrer" type="submit" [disabled]="signinForm.invalid" class="shadow-fluent"></button>
                </form>
            </div>
        </div>
    `,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule]
})
export class SigninComponent implements OnInit {

    authService = inject(AuthService)

    signinForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    })

    onSubmit(){
        if(!this.signinForm.invalid){
            console.log(this.signinForm.value)

            this.authService.signin(this.signinForm.value)
            .subscribe((response:any) => localStorage.setItem('token',response.token))
        }
    }

    ngOnInit(): void {
        this.authService.getMe()
    }
}