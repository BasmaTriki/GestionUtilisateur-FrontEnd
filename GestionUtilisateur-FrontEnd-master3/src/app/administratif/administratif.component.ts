import { Component, OnInit } from '@angular/core';
import {Enfant} from "../../model/model.enfant";
import {Administratif} from "../../model/model.administratif";
import {Http} from "@angular/http";
import {EnfantServices} from "../../services/enfant.services";
import {Router} from "@angular/router";
import {AdministratifServices} from "../../services/administratif.services";
import {ServiceServices} from "../../services/service.services";
import {Service} from "../../model/model.service";

@Component({
  selector: 'app-administratif',
  templateUrl: './administratif.component.html',
  styleUrls: ['./administratif.component.css']
})
export class AdministratifComponent implements OnInit {
  enfants:Array<Enfant>=new Array<Enfant>();
  enfant:Enfant=new Enfant();
  services:Array<Service>=new Array<Service>();
  service:Service=new Service();
  administratif:Administratif=new Administratif();
  constructor(  private enfantservice: EnfantServices,
                private administratifServices:AdministratifServices,
                private serviceServices:ServiceServices,
                public http: Http,
                public router: Router) { }

  ngOnInit() {
    this.enfants.push(this.enfant);
    this.chercherService();
  }
  ajouterEnfants()
  { this.enfant = new Enfant();
    this.enfants.push(this.enfant);
  }
  EnregistrerEnfant(a:Administratif) {
    for(let e of this.enfants)
    {e.personnel=a;
      this.enfantservice.saveEnfant(e)
        .subscribe(data => {
          console.log("Success d'ajout enfant");
          console.log(data);
        }, err => {
          console.log(err);
        });
    }
  }
  Enregistrer() {
    this.administratif.service=this.service;
    this.administratifServices.saveAdministratif(this.administratif)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
        this.EnregistrerEnfant(data);
      },err=>{
        console.log(err);
      });
  }
  chercherService()
  {
    this.serviceServices.getAllServices()
      .subscribe(data=>{
        console.log(data);
        this.services=data;
      },err=>{
        console.log(err);
      })
  }

}
