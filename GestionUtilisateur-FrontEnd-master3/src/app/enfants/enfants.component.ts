import { Component, OnInit } from '@angular/core';
import {Enfant} from "../../model/model.enfant";

@Component({
  selector: 'app-enfants',
  templateUrl: './enfants.component.html',
  styleUrls: ['./enfants.component.css']
})
export class EnfantsComponent implements OnInit {
  enfant:Enfant=new Enfant();
  constructor() { }

  ngOnInit() {
  }

}
