import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent {

  constructor(private router : Router) {}

  poznataStaraLozinka() {
    this.router.navigate(['promenaLozinkePoznataStara'])
  }

  nepoznataStaraLozinka() {
    this.router.navigate(['promenaLozinkeNepoznataStara'])
  }

  nazad(event : Event) {
    event.preventDefault()
    this.router.navigate([''])
  }

}
