import { Component, OnInit } from '@angular/core';
import { UniversalService } from '../services/universal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ocenjivanje-nastavnika',
  templateUrl: './ocenjivanje-nastavnika.component.html',
  styleUrls: ['./ocenjivanje-nastavnika.component.css']
})
export class OcenjivanjeNastavnikaComponent implements OnInit {

  constructor(private universalService : UniversalService, private router : Router) {}

  komentar : string = ""

  ngOnInit(): void {
    
  }

}
