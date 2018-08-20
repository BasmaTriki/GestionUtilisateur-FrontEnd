import { Component, OnInit } from '@angular/core';
import {Enfant} from "../../model/model.enfant";
import {Administratif} from "../../model/model.administratif";
import {Http} from "@angular/http";
import {EnfantServices} from "../../services/enfant.services";
import {Router} from "@angular/router";
import {AdministratifServices} from "../../services/administratif.services";
import {ServiceServices} from "../../services/service.services";
import {Service} from "../../model/model.service";
import { Etat } from '../../model/model.etat';
import { EtatServices } from '../../services/etat.services';
import { Role } from '../../model/model.role';

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
  etat:Etat=new Etat();
  etats:Array<Etat>=new Array<Etat>();
  role:Role=new Role();
  year:number=1970;
  constructor(  private enfantservice: EnfantServices,
                private etatServices: EtatServices,
                private administratifServices:AdministratifServices,
                private serviceServices:ServiceServices,
                public http: Http,
                public router: Router) { }

  ngOnInit() {
    this.enfants.push(this.enfant);
    this.chercherService();
    this.chercherEtats();
  }
  chercherEtats()
  {
    this.etatServices.getAllEtats()
      .subscribe(data=>{
        this.etats=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  ajouterEnfants()
  { this.enfant = new Enfant();
    this.enfants.push(this.enfant);
  }
  EnregistrerEnfant(a:Administratif) {
    if(a.etatCivil=="Celibataire")
    {
      return;
    }
    else
    {
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
    
  }
  Enregistrer() {
    var  mat= (this.administratif.matricule+"").substr(5,3);
    this.administratif.service=this.service;
    this.administratif.etat=this.etat;
    this.administratif.login=this.administratif.prenom+mat;
    this.administratif.motpasse=this.administratif.prenom+mat;
    this.role.idRole=2;
    this.role.type="utilisateur";
    this.administratif.role=this.role;
    this.administratifServices.saveAdministratif(this.administratif)
      .subscribe(data=>{
        alert("Success d'ajout adminstratif");
        console.log(data);
        this.administratif=data;
        if( this.administratif.etatCivil!='Celibataire')
        {
          this.EnregistrerEnfant(data);
        }
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
