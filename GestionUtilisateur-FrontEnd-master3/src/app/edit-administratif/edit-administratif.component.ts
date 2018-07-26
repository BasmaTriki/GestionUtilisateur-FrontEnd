import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministratifServices } from '../../services/administratif.services';
import { Administratif } from '../../model/model.administratif';
import { Enfant } from '../../model/model.enfant';
import { Service } from '../../model/model.service';
import { ServiceServices } from '../../services/service.services';
import { EnfantServices } from '../../services/enfant.services';
import { EnfantsComponent } from '../enfants/enfants.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit-administratif',
  templateUrl: './edit-administratif.component.html',
  styleUrls: ['./edit-administratif.component.css']
})
export class EditAdministratifComponent implements OnInit {
matricule:number;
administratif:Administratif=new Administratif();
enfants:Array<Enfant>=new Array<Enfant>();
newEnfants:Array<Enfant>=new Array<Enfant>();
enfant:Enfant=new Enfant();
services:Array<Service>=new Array<Service>();
service:Service=new Service();
  constructor(public activatedRoute:ActivatedRoute,
    public administratifService:AdministratifServices,
    public router:Router,
    public dialog: MatDialog,
    private serviceServices:ServiceServices,
    private enfantService:EnfantServices) 
    {
      this.matricule=activatedRoute.snapshot.params['matricule'];
     }

  ngOnInit() {
    this.administratifService.getAdministratif(this.matricule)
    .subscribe(data=> {
      this.administratif = data;
      this.chercherEnfant(data);
    },err=>{
    console.log(err);
    })
    this.chercherService();
  }
  updateAdmin()
  {
    this.administratif.service=this.service;
    this.administratifService.updateAdministratif(this.administratif)
      .subscribe(data=>{
        alert("Success de Mise à jour");
        console.log(data);
        this.EnregistrerEnfant(data);
      },err=>{
        console.log(err);
      });
  }
  chercherEnfant(a:Administratif)
  {
    this.enfantService.getEnfantsPersonnel(a.matricule)
    .subscribe(data=>{
      this.enfants=data;
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  ajouterEnfants()
  {
    this.enfant = new Enfant();
    this.newEnfants.push(this.enfant);
  }
  ModifierEnfants(e:Enfant)
  {
    let dialogRef = this.dialog.open(EnfantsComponent, {data:{name:e.num,nom:e.nom}});
    this.chercherEnfant(this.administratif);
  }
  EnregistrerEnfant(a:Administratif) {
    for(let e of this.newEnfants)
    {e.personnel=a;
      this.enfantService.saveEnfant(e)
        .subscribe(data => {
          console.log("Success d'ajout enfant");
          console.log(data);
        }, err => {
          console.log(err);
        });
    }
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
