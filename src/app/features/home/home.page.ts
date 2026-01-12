import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { Button } from "primeng/button";

@Component({
  selector: 'home-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Button],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  router = inject(Router)
}
