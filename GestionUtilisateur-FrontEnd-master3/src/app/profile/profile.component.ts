import { Component, OnInit } from '@angular/core';
import {EnseignantPermanent} from "../../model/model.enseignantpermanent";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
enseignantP:EnseignantPermanent;
  constructor() { }

  ngOnInit() {
  }

}
