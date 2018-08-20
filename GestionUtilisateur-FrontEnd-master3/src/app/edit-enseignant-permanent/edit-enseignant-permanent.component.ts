import { Component, OnInit } from '@angular/core';
import {Enfant} from "../../model/model.enfant";
import {PosteAdministrative} from "../../model/model.posteAdministrative";
import {AGrade} from "../../model/model.agrade";
import {Departement} from "../../model/model.departement";
import {Grade} from "../../model/model.grade";
import {Corps} from "../../model/model.corps";
import {EnseignantPermanent} from "../../model/model.enseignantpermanent";
import {AGradeServices} from "../../services/agrade.services";
import {EnseignantPermanentServices} from "../../services/enseignantpermanent.services";
import {Http} from "@angular/http";
import {PosteAdministrativeServices} from "../../services/posteAdministrative.services";
import {ActivatedRoute, Router} from "@angular/router";
import {GradeServices} from "../../services/grade.services";
import {CorpsServices} from "../../services/corps.services";
import {EnfantServices} from "../../services/enfant.services";
import {DepartementServices} from "../../services/departement.services";
import { Diplome } from '../../model/model.diplome';
import { DiplomePersonnel } from '../../model/model.diplomepersonnel';
import { Specialite } from '../../model/model.specialite';
import { SpecialiteServices } from '../../services/specialite.services';
import { Personnel } from '../../model/model.personnel';
import { MatDialog } from '@angular/material';
import { EnfantsComponent } from '../enfants/enfants.component';
import { DiplomePersonnelServices } from '../../services/diplomepersonnel.services';
import { DiplomeServices } from '../../services/diplome.services';
import { DiplomePersonnelComponent } from '../diplome-personnel/diplome-personnel.component';
import { AGradeComponent } from '../a-grade/a-grade.component';
import { Etat } from '../../model/model.etat';
import { EtatServices } from '../../services/etat.services';
import { Periode } from '../../model/model.periode';
import { PeriodeServices } from '../../services/periode.services';
import { PeriodeComponent } from '../periode/periode.component';

@Component({
  selector: 'app-edit-enseignant-permanent',
  templateUrl: './edit-enseignant-permanent.component.html',
  styleUrls: ['./edit-enseignant-permanent.component.css']
})
export class EditEnseignantPermanentComponent implements OnInit {
  enseignantP: EnseignantPermanent = new EnseignantPermanent();
  departements: Array<Departement> = new Array<Departement>();
  grades: Array<Grade> = new Array<Grade>();
  corps: Array<Corps> = new Array<Corps>();
  postes:Array<PosteAdministrative>=new Array<PosteAdministrative>();
  departement:Departement;
  poste:PosteAdministrative;
  panelOpenState: boolean = false;
  agrade:AGrade=new AGrade();
  grade:Grade=new Grade();
  corp:Corps=new Corps();
  matricule:number;
  AGrades:Array<AGrade>=new Array<AGrade>();
  NewAGrades:Array<AGrade>=new Array<AGrade>();
  enfants:Array<Enfant>=new Array<Enfant>();
  newEnfants:Array<Enfant>=new Array<Enfant>();
  enfant:Enfant=new Enfant();
  newdiplomes:Array<DiplomePersonnel>=new Array<DiplomePersonnel>();
  diplome:Diplome=new Diplome();
  diplomes:Array<Diplome>=new Array<Diplome>()
  diplomep:DiplomePersonnel=new DiplomePersonnel();
  diplomepers:Array<DiplomePersonnel>=new Array<DiplomePersonnel>();
  specialite:Specialite=new Specialite();
  specialites:Array<Specialite>=new Array<Specialite>();
  etat:Etat=new Etat();
  etats:Array<Etat>=new Array<Etat>();
  etatModifiable:boolean=false;
  departementModifiable:boolean=false;
  specialiteModifiable:boolean=false;
  periode:Periode=new Periode();
  periodes:Array<Periode>=new Array<Periode>();
  newperiodes:Array<Periode>=new Array<Periode>();
  constructor(public activatedRoute:ActivatedRoute,
    private agradeServices:AGradeServices,
    private posteService:PosteAdministrativeServices,
    private gradeServices: GradeServices,
    private corpsServices: CorpsServices,
    private specialiteServices:SpecialiteServices,
    private enseingnantpermanentService:EnseignantPermanentServices,
    private enfantservice: EnfantServices,
    private etatServices:EtatServices, 
    private departementServices: DepartementServices,
    private diplomePersonnelServices: DiplomePersonnelServices,
    private diplomeServices:DiplomeServices,
    private periodeServices:PeriodeServices,
    public http: Http,
    public dialog: MatDialog,
    public router: Router)
  {
    this.matricule=activatedRoute.snapshot.params['idPers'];
  }

  ngOnInit() {
    this.enseingnantpermanentService.getEnseignantPermanent(this.matricule)
      .subscribe(data=>{
        this.enseignantP=data;
       this.departement=this.enseignantP.departement;
       this.specialite=this.enseignantP.specialite;
       this.etat=this.enseignantP.etat;
        this.chercherEnfant(data);
        this.chercherAGrade(data);
        this.chercherDiplome(data);
        this.chercherPeriode(data);
        
      },err=>{
        console.log(err);
      });
    this.chercherDep();
    this.chercherGrad();
    this.chercherCorp();
    this.chercherPoste();
    this.chercherSpecialite();
    this.chercherDip();
    this.chercherEtats();
    
  }
  ModifierEtat()
  {
  this.etatModifiable=true;
  }
  ModifierDepartement()
  {
  this.departementModifiable=true;
  }
  ModifierSpecialite()
  {
  this.specialiteModifiable=true;
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
  chercherDip() {
    this.diplomeServices.allDiplomes()
      .subscribe(data => {
        this.diplomes = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
  chercherSpecialite()
  {
    this.specialiteServices.allSpecialites()
      .subscribe(data=>{
        this.specialites=data;
      },err=>{
        console.log(err);
      })
  }
  chercherEnfant(e:EnseignantPermanent)
  {
    this.enfantservice.getEnfantsPersonnel(e.idPers)
    .subscribe(data=>{
      this.enfants=data;
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  chercherAGrade(e:EnseignantPermanent)
  {
    this.agradeServices.getAGradesPersonnel(e.idPers)
    .subscribe(data=>{
      this.AGrades=data;
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  chercherPeriode(e:EnseignantPermanent)
  {
    this.periodeServices.getPeriodePersonnel(e.idPers)
    .subscribe(data=>{
      this.periodes=data;
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  chercherDiplome(e:EnseignantPermanent)
  {
    this.diplomePersonnelServices.getPersonnelDiplome(e.idPers)
    .subscribe(data=>{
    this.diplomepers=data;
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  chercherPoste()
  {
    this.posteService.getAllPostes()
      .subscribe(data=>{
        this.postes=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  updateEnseignant() {
    this.enseignantP.departement=this.departement;
    this.enseignantP.specialite=this.specialite;
    this.enseignantP.etat=this.etat;
    this.enseingnantpermanentService.updateEnseignantPermanent(this.enseignantP)
      .subscribe(data=>{
        alert("Mise à jour effectuée");
        this.ajouterenfants(data);
        this.EnregistrerDiplomeP(data);
        this.EnregistrerAgrade(data);
        this.EnregistrerPoste(data);
        console.log(data);
        this.router.navigate(['ListePersonnel']);
      },err=>{
        console.log(err);
      });
    //this.EnregistrerAgrade();
  }
  chercherDep() {
    this.departementServices.allDepartements()
      .subscribe(data => {
        this.departements = data;
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
  ajouterenfants(e:EnseignantPermanent)
  {
    for(let enf of this.newEnfants)
    {enf.personnel=e;
      this.enfantservice.saveEnfant(enf)
        .subscribe(data => {
          console.log("Success d'ajouter enfant");
          e.enfants.push(enf);
        }, err => {
          console.log(err);
        });
    }
    this.enseingnantpermanentService.updateEnseignantPermanent(e)
    .subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  ajouterDiplome()
  {
    this.diplomep=new DiplomePersonnel();
    this.diplomep.diplome=new Diplome();
    this.newdiplomes.push(this.diplomep);
   
  }
  ajouterEnfants()
  {
    this.enfant = new Enfant();
    this.newEnfants.push(this.enfant);
  }
  ajouterGrade()
  {
    this.agrade=new AGrade();
    this.agrade.grade=new Grade();
    this.NewAGrades.push(this.agrade);
   
  }
  ajouterPoste()
  {if(this.periodes.length==0 && this.newperiodes.length<3)
    {
    this.periode.posteAdmin=new PosteAdministrative();
    this.periode = new Periode();
    this.newperiodes.push(this.periode);
  }
  else if(this.periodes.length==1 && this.newperiodes.length<2)
  {
    this.periode.posteAdmin=new PosteAdministrative();
    this.periode = new Periode();
    this.newperiodes.push(this.periode);
  }
  else if(this.periodes.length==2 && this.newperiodes.length<1)
  {
    this.periode.posteAdmin=new PosteAdministrative();
    this.periode = new Periode();
    this.newperiodes.push(this.periode);
  }
  else if(this.periodes.length==3)
  {
   return;
  }
  }
  EnregistrerPoste(en:EnseignantPermanent) {
   
      for(let p of this.newperiodes)
      {p.personnel=en;
        this.periodeServices.savePeriode(p)
          .subscribe(data => {
            console.log("Success d'ajout periode");
            console.log(data);
          }, err => {
            console.log(err);
          });
      
    }
  }
  ModifierEnfants(e:Enfant)
  {
    let dialogRef = this.dialog.open(EnfantsComponent, {data:{name:e.num,nom:e.nom}});
    this.chercherEnfant(this.enseignantP);
  }
  ModifierDiplome(d:DiplomePersonnel)
  {
    let dialogRef = this.dialog.open(DiplomePersonnelComponent, {data:{num:d.id_DipP}});
  }
  ModifierGrade(g:AGrade)
  {
    let dialogRef = this.dialog.open(AGradeComponent, {data:{num:g.id_agrade}});
  }
  ModifierPoste(p:Periode)
  {
    let dialogRef = this.dialog.open(PeriodeComponent, {data:{num:p.id_periode}});
  }
  EnregistrerAgrade(en:EnseignantPermanent) {
    for (let agrd of this.NewAGrades) {
      agrd.personnel=en;
    this.agradeServices.saveAGrade(agrd)
      .subscribe(data => {
        console.log("Success d'ajout grades");
        console.log(data);
      }, err => {
        console.log(err);
      });
  }
}
  EnregistrerDiplomeP(en:EnseignantPermanent) {
    for (let dip of this.newdiplomes) {
      dip.personnel = en;
      this.diplomePersonnelServices.saveDiplomePersonnel(dip)
        .subscribe(data => {
          console.log("Success d'ajout diplomes");
          console.log(data);
        }, err => {
          console.log(err);
        });
    }
  }
}
