import { Component, OnInit } from '@angular/core';
import {Enfant} from '../../model/model.enfant';
import {EnfantServices} from '../../services/enfant.services';
import {Grade} from "../../model/model.grade";
import {EnseignantPermanent} from "../../model/model.enseignantpermanent";
import {Http} from "@angular/http";
import {DepartementServices} from "../../services/departement.services";
import {Router} from "@angular/router";
import {Departement} from "../../model/model.departement";
import {GradeServices} from "../../services/grade.services";
import {EnseignantPermanentServices} from "../../services/enseignantpermanent.services";
import {FormControl, NgModel, Validators} from "@angular/forms";
import {Corps} from "../../model/model.corps";
import {CorpsServices} from "../../services/corps.services";
import {PosteAdministrative} from "../../model/model.posteAdministrative";
import {PosteAdministrativeServices} from "../../services/posteAdministrative.services";
import {AGrade} from "../../model/model.agrade";
import {AGradeServices} from "../../services/agrade.services";
import {Diplome} from "../../model/model.diplome";
import {DiplomePersonnel} from "../../model/model.diplomepersonnel";
import {DiplomeServices} from "../../services/diplome.services";
import {Specialite} from "../../model/model.specialite";
import {SpecialiteServices} from "../../services/specialite.services";
import {DiplomePersonnelServices} from "../../services/diplomepersonnel.services";
import { Etat } from '../../model/model.etat';
import { EtatServices } from '../../services/etat.services';
import { Periode } from '../../model/model.periode';
import { PeriodeServices } from '../../services/periode.services';
import { Role } from '../../model/model.role';
import { OrganismeServices } from '../../services/organisme.services';
import { Organisme } from '../../model/model.organisme';
import { EtatPersonnelServices } from '../../services/etatPersonnel.services';
import { EtatPersonnel } from '../../model/model.etatPersonnel';
import { ContratServices } from '../../services/contrat.services';
import { Contrat } from '../../model/model.Contrat';

@Component({
  selector: 'app-enseignant-contractuelle',
  templateUrl: './enseignant-contractuelle.component.html',
  styleUrls: ['./enseignant-contractuelle.component.css']
})
export class EnseignantContractuelleComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  startDate = new Date(1960, 0, 1);
  currentPage: number = 0;
  pages: Array<number>;
  size: number = 5;
  enseignantP: EnseignantPermanent = new EnseignantPermanent();
  departements: Array<Departement> = new Array<Departement>();
  grades: Array<Grade> = new Array<Grade>();
  corps: Array<Corps> = new Array<Corps>();
  departement:Departement;
  poste:PosteAdministrative=new PosteAdministrative();
  postes:Array<PosteAdministrative>=new Array<PosteAdministrative>();
  periode:Periode=new Periode();
  periodes:Array<Periode>=new Array<Periode>();
  panelOpenState: boolean = false;
  agrade:AGrade=new AGrade();
  grade:Grade=new Grade();
  AGrades:Array<AGrade>=new Array<AGrade>();
  corp:Corps=new Corps();
  enfants:Array<Enfant>=new Array<Enfant>();
  enfant:Enfant=new Enfant();
  diplomes: Array<Diplome> = new Array<Diplome>();
  diplome:Diplome=new Diplome();
  diplomep:DiplomePersonnel=new DiplomePersonnel();
  diplomepers:Array<DiplomePersonnel>=new Array<DiplomePersonnel>();
  specialite:Specialite=new Specialite();
  etat:Etat=new Etat();
  role:Role=new Role();
  etats:Array<Etat>=new Array<Etat>();
  specialites:Array<Specialite>=new Array<Specialite>();
  orgOrigine:Organisme=new Organisme();
  lieuDetachement:Organisme=new Organisme();
  organisme:Organisme=new Organisme();
  orgOrigines:Array<Organisme>=new Array<Organisme>();
  lang:string;
  etatPersonnel:EtatPersonnel=new EtatPersonnel();
  contrat:Contrat=new Contrat();
  contrats:Array<Contrat>=new Array<Contrat>();
  constructor(private agradeServices:AGradeServices,
              private gradeServices: GradeServices,
              private corpsServices: CorpsServices,
              private enseingnantpermanentService:EnseignantPermanentServices,
              private enfantservice: EnfantServices,
              private departementServices: DepartementServices,
              private diplomeService:DiplomeServices,
              private specialiteServices:SpecialiteServices,
              private diplomePServices:DiplomePersonnelServices,
              private etatServices:EtatServices,
              private etatPersonnelServices:EtatPersonnelServices,
              private periodeServices:PeriodeServices,
              private posteServices: PosteAdministrativeServices,
              private organismeServices:OrganismeServices,
              private contratServices:ContratServices,
              public http: Http,
              public router: Router) {
  }

  ngOnInit() {
    this.chercherDep();
    this.chercherDip();
    this.chercherGrad();
    this.chercherCorp();
    this.chercherSpecialite();
    this.chercherEtats();
    this.chercherOrg();
    this.enfants.push(this.enfant);
    this.diplomep.diplome=this.diplome;
    this.diplomep.organisme=this.organisme;
    this.diplomepers.push(this.diplomep);
    this.AGrades.push(this.agrade);
    this.periode.posteAdmin=this.poste;
    this.periodes.push(this.periode);
    this.contrats.push(this.contrat);
    this.lang=sessionStorage.getItem('lang');
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'Vous devez entrer une valeur' :
      this.email.hasError('email') ? 'Email non valide' :
        '';
  }
  chercherOrg()
  {
    this.organismeServices.allOrganismeAccueils()
      .subscribe(data=>{
        this.orgOrigines=data;
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
  chercherSpecialite()
  {
    this.specialiteServices.allSpecialites()
      .subscribe(data=>{
        this.specialites=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  chercherDip() {
    this.diplomeService.allDiplomes()
      .subscribe(data => {
        this.diplomes = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
  EnregistrerAgrade(en:EnseignantPermanent) {
    for (let agrd of this.AGrades) {
      agrd.personnel=en;
    this.agradeServices.saveAGrade(agrd)
      .subscribe(data => {
        console.log("Success d'ajout grades");
        console.log(data);
      }, err => {
        console.log(err);
      });
  }
  var agrde:AGrade=new AGrade();
  this.agradeServices.getGradeActuel(en.idPers)
  .subscribe(data => {
    agrde=data;
    console.log(data);
  }, err => {
    console.log(err);
  });
  en.gradeActuel=agrde.grade.titre;
  en.gradeActuelAr=agrde.grade.titreAr;
  agrde.gradeActuel=true;
  this.agradeServices.updateAGrade(agrde)
  .subscribe(data => {
    console.log(data);
  }, err => {
    console.log(err);
  });
  this.enseingnantpermanentService.updateEnseignantPermanent(en)
  .subscribe(data => {
    console.log(data);
  }, err => {
    console.log(err);
  });
}
EnregistrerEtatPersonnel(en:EnseignantPermanent)
{this.etatPersonnel.personnel=en;
  this.etatPersonnel.etat=this.etat;
  this.etatPersonnel.lieuDetachement=this.lieuDetachement;
  this.etatPersonnelServices.saveEtatPersonnel(this.etatPersonnel)
  .subscribe(data => {
    console.log("Success d'ajout etatPersonnel");
    console.log(data);
  }, err => {
    console.log(err);
  });

}
  EnregistrerDiplomeP(en:EnseignantPermanent) {
    for (let dip of this.diplomepers) {
      dip.personnel = en;
      this.diplomePServices.saveDiplomePersonnel(dip)
        .subscribe(data => {
          console.log("Success d'ajout diplomes");
          console.log(data);
        }, err => {
          console.log(err);
        });
    }
  }
    EnregistrerEnfant(en:EnseignantPermanent) {
    if(en.etatCivil=="Celibataire")
    {
      return;
    }
    else
    {
      for(let e of this.enfants)
      {e.personnel=en;
        this.enfantservice.saveEnfant(e)
          .subscribe(data => {
           en.enfants.push(e);
          }, err => {
            console.log(err);
          });
      }
      this.enseingnantpermanentService.updateEnseignantPermanent(en)
      .subscribe(data=>{
        console.log(data);
      },err=>{
        console.log(err);
      })
    }
  }
  EnregistrerContrat(en:EnseignantPermanent) {
    for(let c of this.contrats)
    {c.enseignantPermanent=en;
      this.contratServices.saveContrat(c)
        .subscribe(data => {
          console.log("Success d'ajout contrat");
          console.log(data);
        }, err => {
          console.log(err);
        });
    }
  }
  Enregistrer() {
    var  mat= (this.enseignantP.matricule).substr(5,3);
  this.enseignantP.departement=this.departement;
  this.enseignantP.specialite=this.specialite;
  this.enseignantP.etat=this.etat;
  this.enseignantP.login=this.enseignantP.prenom+mat;
  this.enseignantP.motpasse=this.enseignantP.prenom+mat;
  this.role.idRole=2;
  this.role.type="utilisateur";
  this.enseignantP.role=this.role;
  if(this.orgOrigine!=null)
  {
    this.enseignantP.organismeOrigine=this.orgOrigine;
  }
  else
  {
    this.enseignantP.organismeOrigine=null;
  }
  if(this.lang=="fr")
  {
    if(this.enseignantP.sexe=="Femme")
    {
      this.enseignantP.sexeAr="انثى";
    }
    else if(this.enseignantP.sexe=="Homme")
    {
      this.enseignantP.sexeAr="ذكر";
    }
    if(this.enseignantP.etatCivil=="Célibataire" && this.enseignantP.sexe=="Femme")
    {
      this.enseignantP.etatCivilAr="عزباء";
    }
    else if(this.enseignantP.etatCivil=="Célibataire" && this.enseignantP.sexe=="Homme")
    {
      this.enseignantP.etatCivilAr="أعزب";
    }
    else if(this.enseignantP.etatCivil=="Marié(e)")
    {
      this.enseignantP.etatCivilAr="(متزوج(ة";
    }
    else
    {
      this.enseignantP.etatCivilAr="(مطلق(ة";
    }
  }
  else
  {
    if(this.enseignantP.sexeAr=="انثى")
    {
      this.enseignantP.sexe="Femme";
    }
    else if(this.enseignantP.sexeAr=="ذكر")
    {
      this.enseignantP.sexe="Homme";
    }
    if(this.enseignantP.etatCivilAr=="عزباء" || this.enseignantP.etatCivilAr=="أعزب")
    {
      this.enseignantP.etatCivil="Célibataire";
    }
    else if(this.enseignantP.etatCivilAr=="(متزوج(ة")
    {
      this.enseignantP.etatCivil="Marié(e)";
    }
    else
    {
      this.enseignantP.etatCivil="Divorcé(e)";
    }
  }
  this.enseingnantpermanentService.saveEnseignantPermanent(this.enseignantP)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
        this.enseignantP=data;
        this.EnregistrerDiplomeP(data);
        if(this.enseignantP.etat.libelleEtat=="non-actif"||this.enseignantP.etat.libelleEtat=="détaché")
        {
          this.EnregistrerEtatPersonnel(data);
        }
        if(this.enseignantP.etatCivil!='Celibataire')
        {
          this.EnregistrerEnfant(data);
        }
        this.EnregistrerAgrade(data);
        this.EnregistrerContrat(data);
      },err=>{
        console.log(err);
      });
   //this.EnregistrerAgrade();

  }

  chercherDep() {
    this.departementServices.allDepartements()
      .subscribe(data => {
        this.departements = data;
        this.pages = new Array(data.totalPages);
        console.log(data);
      }, err => {
        console.log(err);
      })
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
  chercherCorp()
  {
    this.corpsServices.allCorpss()
      .subscribe(data=>{
        this.corps=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  ajouterDiplome()
  {
    this.diplomep=new DiplomePersonnel();
    this.diplomep.diplome=new Diplome();
    this.diplomep.organisme=new Organisme();
    this.diplomepers.push(this.diplomep);
   
  }
  ajouterEnfants()
  {
    this.enfant = new Enfant();
    this.enfants.push(this.enfant);
  }
  ajouterGrade()
  {
    this.agrade=new AGrade();
    this.agrade.grade=new Grade();
    this.AGrades.push(this.agrade);
   
  }
  ajouterContrat()
  {
    this.contrat=new Contrat();
    this.contrats.push(this.contrat);
   
  }
}
