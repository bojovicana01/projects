import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router : Router) {}

  ucenikReg() {
    this.router.navigate(['registracijaUcenik'])
  }

  nastavnikReg() {
    this.router.navigate(['registracijaNastavnik'])
  }

  nazad(event : Event) {
    event.preventDefault()
    this.router.navigate([''])
  }

}
