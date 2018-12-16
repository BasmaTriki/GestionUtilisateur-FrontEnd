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
import { Etat } from '../../model/model.etat';
import { EtatServices } from '../../services/etat.services';
import { AGradeServices } from '../../services/agrade.services';
import { GradeServices } from '../../services/grade.services';
import { EtatPersonnelServices } from '../../services/etatPersonnel.services';
import { AGrade } from '../../model/model.agrade';
import { Grade } from '../../model/model.grade';
import { EtatPersonnel } from '../../model/model.etatPersonnel';

@Component({
  selector: 'app-edit-administratif',
  templateUrl: './edit-administratif.component.html',
  styleUrls: ['./edit-administratif.component.css']
})
export class EditAdministratifComponent implements OnInit {
idPers:number;
administratif:Administratif=new Administratif();
enfants:Array<Enfant>=new Array<Enfant>();
newEnfants:Array<Enfant>=new Array<Enfant>();
enfant:Enfant=new Enfant();
services:Array<Service>=new Array<Service>();
service:Service=new Service();
etat:Etat=new Etat();
  etats:Array<Etat>=new Array<Etat>();
  etatModifiable:boolean=false;
  serviceModifiable:boolean=false;
  etatPersonnel:EtatPersonnel=new EtatPersonnel();
  agrade:AGrade=new AGrade();
  grade:Grade=new Grade();
  AGrades:Array<AGrade>=new Array<AGrade>();
  NewAGrades:Array<AGrade>=new Array<AGrade>();
  grades: Array<Grade> = new Array<Grade>();
  lang:string="";
  startDate:"01/01/1970";
  constructor(public activatedRoute:ActivatedRoute,
    public administratifService:AdministratifServices,
    public router:Router,
    public dialog: MatDialog,
    private etatServices:EtatServices,
    private serviceServices:ServiceServices,
    private agradeServices:AGradeServices,
    private gradeServices: GradeServices,
    private etatPersonnelServices:EtatPersonnelServices,
    private enfantService:EnfantServices) 
    {
      this.idPers=activatedRoute.snapshot.params['idPers'];
      this.lang=sessionStorage.getItem("lang");
     }

  ngOnInit() {
    this.administratifService.getAdministratif(this.idPers)
    .subscribe(data=> {
      this.administratif = data;
      this.etat=this.administratif.etat;
      this.service=this.administratif.service;
      this.chercherEnfant(data);
      this.chercherAGrade(data);
    },err=>{
    console.log(err);
    })
    this.chercherService();
    this.chercherEtats();
    this.chercherGrad();
  }
  chercherGrad()
  {
    this.gradeServices.getAllGrades()
      .subscribe(data=>{
        this.grades=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
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
  chercherAGrade(a:Administratif)
  {
    this.agradeServices.getAGradesPersonnel(a.idPers)
    .subscribe(data=>{
      this.AGrades=data;
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  chercherEtatInactive(idEtat:number)
  {
    this.etatPersonnelServices.getEtatInactive(this.idPers,idEtat)
    .subscribe(data=>{
      this.etatPersonnel=data;
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  ModifierEtat()
  {
  this.etatModifiable=true;
  }
  ModifierService()
  {
  this.serviceModifiable=true;
  }
  updateAdmin()
  {
    this.administratif.service=this.service;
    this.administratif.etat=this.etat;
    this.administratifService.updateAdministratif(this.administratif)
      .subscribe(data=>{
        alert("Success de Mise à jour");
        console.log(data);
        this.EnregistrerAgrade(data);
        this.EnregistrerEnfant(data);
      },err=>{
        console.log(err);
      });
  }
  chercherEnfant(a:Administratif)
  {
    this.enfantService.getEnfantsPersonnel(a.idPers)
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
    if(a.etatCivil=="Celibataire")
    {
      return;
    }
    else
    {
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
  }
  EnregistrerAgrade(a:Administratif) {
    for (let agrd of this.NewAGrades) {
      agrd.personnel=a;
    this.agradeServices.saveAGrade(agrd)
      .subscribe(data => {
        console.log("Success d'ajout grades");
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  this.agradeServices.getGradeActuel(a.idPers)
  .subscribe(data => {
    this.agrade=data;
    console.log(data);
  }, err => {
    console.log(err);
  });
  a.gradeActuel=this.agrade.grade.titre;
  a.gradeActuelAr=this.agrade.grade.titreAr;
  this.agrade.gradeActuel=true;
/*   this.agradeServices.updateAGrade(this.agrade)
  .subscribe(data => {
    console.log(data);
  }, err => {
    console.log(err);
  }); */
  this.administratifService.updateAdministratif(a)
  .subscribe(data => {
    console.log(data);
  }, err => {
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
  ajouterGrade()
  {
    this.agrade=new AGrade();
    this.agrade.grade=new Grade();
    this.NewAGrades.push(this.agrade);
   
  }
  Annuler()
  {
    this.router.navigate(['/ListeAdmin']);
  }
}
