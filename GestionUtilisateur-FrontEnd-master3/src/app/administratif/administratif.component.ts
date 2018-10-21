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
import { AGrade } from '../../model/model.agrade';
import { Grade } from '../../model/model.grade';
import { AGradeServices } from '../../services/agrade.services';
import { GradeServices } from '../../services/grade.services';

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
  lang:string;
  agrade:AGrade=new AGrade();
  grade:Grade=new Grade();
  grades: Array<Grade> = new Array<Grade>();
  AGrades:Array<AGrade>=new Array<AGrade>();
  constructor(  private enfantservice: EnfantServices,
                private etatServices: EtatServices,
                private agradeServices:AGradeServices,
                private gradeServices: GradeServices,
                private administratifServices:AdministratifServices,
                private serviceServices:ServiceServices,
                public http: Http,
                public router: Router) 
                {
                  this.lang=sessionStorage.getItem("lang");
                 }

  ngOnInit() {
    this.enfants.push(this.enfant);
    this.chercherService();
    this.chercherEtats();
    this.chercherGrad();
    this.AGrades.push(this.agrade);
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
  EnregistrerAgrade(a:Administratif) {
    for (let agrd of this.AGrades) {
      agrd.personnel=a;
    this.agradeServices.saveAGrade(agrd)
      .subscribe(data => {
        console.log("Success d'ajout grades");
        console.log(data);
      }, err => {
        console.log(err);
      });
  }
  var agrde:AGrade=new AGrade();
  this.agradeServices.getGradeActuel(a.idPers)
  .subscribe(data => {
    agrde=data;
    console.log(data);
  }, err => {
    console.log(err);
  });
  a.gradeActuel=agrde.grade.titre;
  a.gradeActuelAr=agrde.grade.titreAr;
  agrde.gradeActuel=true;
  this.agradeServices.updateAGrade(agrde)
  .subscribe(data => {
    console.log(data);
  }, err => {
    console.log(err);
  });
  this.administratifServices.updateAdministratif(a)
  .subscribe(data => {
    console.log(data);
  }, err => {
    console.log(err);
  });
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
    if(this.lang=="fr")
    {
      if(this.administratif.sexe=="Femme")
      {
        this.administratif.sexeAr="انثي";
      }
      else if(this.administratif.sexe=="Homme")
      {
        this.administratif.sexeAr="ذكر";
      }
      if(this.administratif.etatCivil=="Célibataire" && this.administratif.sexe=="Femme")
      {
        this.administratif.etatCivilAr="عزباء";
      }
      else if(this.administratif.etatCivil=="Célibataire" && this.administratif.sexe=="Homme")
      {
        this.administratif.etatCivilAr="أعزب";
      }
      else if(this.administratif.etatCivil=="Marie")
      {
        this.administratif.etatCivilAr="(متزوج(ة";
      }
      else
      {
        this.administratif.etatCivilAr="(مطلق(ة";
      }
    }
    else
    {
      if(this.administratif.sexeAr=="انثي")
      {
        this.administratif.sexe="Femme";
      }
      else if(this.administratif.sexeAr=="ذكر")
      {
        this.administratif.sexe="Homme";
      }
      if(this.administratif.etatCivilAr=="عزباء" || this.administratif.etatCivilAr=="أعزب")
      {
        this.administratif.etatCivil="Célibataire";
      }
      else if(this.administratif.etatCivilAr=="(متزوج(ة")
      {
        this.administratif.etatCivil="Marie";
      }
      else
      {
        this.administratif.etatCivil="Divorce";
      }
    }
    this.administratifServices.saveAdministratif(this.administratif)
      .subscribe(data=>{
        alert("Success d'ajout adminstratif");
        console.log(data);
        this.administratif=data;
        if( this.administratif.etatCivil!='Célibataire')
        {
          this.EnregistrerEnfant(data);
        }
        this.EnregistrerAgrade(data);
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
  ajouterGrade()
  {
    this.agrade=new AGrade();
    this.agrade.grade=new Grade();
    this.AGrades.push(this.agrade);
   
  }
}
