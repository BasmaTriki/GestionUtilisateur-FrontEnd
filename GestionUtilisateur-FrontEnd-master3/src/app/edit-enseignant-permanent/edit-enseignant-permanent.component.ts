import { Component, OnInit } from '@angular/core';
import {FormControl, NgModel, Validators} from "@angular/forms";
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
import { Organisme } from '../../model/model.organisme';
import { OrganismeServices } from '../../services/organisme.services';
import { EtatPersonnelServices } from '../../services/etatPersonnel.services';
import { EtatPersonnel } from '../../model/model.etatPersonnel';
import { ToastrService } from 'ngx-toastr';

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
  idPers:number;
  email = new FormControl('', [Validators.email]);
  matricule=new FormControl('',[Validators.required, Validators.pattern("[0-9]+"),Validators.minLength(4)]);
  cinM=new FormControl('',[Validators.required, Validators.pattern("[0-9]+"),Validators.minLength(8)]);
  nom=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Zéàçèùî]+"),Validators.minLength(3)]);
  prenom=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Zéàçèùî]+"),Validators.minLength(3)]);
  tel=new FormControl('',[Validators.required,Validators.pattern("[0-9]+"),Validators.minLength(8)]);
  codePostal=new FormControl('',[Validators.pattern("[0-9]+"),Validators.minLength(4)]);
  nomAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"), Validators.required,Validators.minLength(3)]);
  prenomAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  nomPereFr=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Zéàçèùî]+"),Validators.minLength(3)]);
  nomPereAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  lieuNaissFr=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Zéàçèùî]+"),Validators.minLength(3)]);
  lieuNaissAr= new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  nomConjFr=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Zéàçèùî]+"),Validators.minLength(3)]);
  nomConjAr= new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  profConjFr=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Zéàçèùî]+"),Validators.minLength(3)]);
  profConjAr= new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  lieuTrConjFr=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Zéàçèùî]+"),Validators.minLength(3)]);
  lieuTrConjAr= new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  nomEnfantFr=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Zéàçèùî]+"),Validators.minLength(3)]);
  nomEnfantAr= new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
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
  orgModifiable:boolean=false;
  periode:Periode=new Periode();
  periodes:Array<Periode>=new Array<Periode>();
  newperiodes:Array<Periode>=new Array<Periode>();
  orgOrigine:Organisme=new Organisme();
  lieuDetachement:Organisme=new Organisme();
  orgOrigines:Array<Organisme>=new Array<Organisme>();
  etatPersonnel:EtatPersonnel=new EtatPersonnel();
  lang:string;
  constructor(public activatedRoute:ActivatedRoute,
    private agradeServices:AGradeServices,
    private posteService:PosteAdministrativeServices,
    private gradeServices: GradeServices,
    private corpsServices: CorpsServices,
    private specialiteServices:SpecialiteServices,
    private enseingnantpermanentService:EnseignantPermanentServices,
    private enfantservice: EnfantServices,
    private etatServices:EtatServices, 
    private toastr: ToastrService,
    private etatPersonnelServices:EtatPersonnelServices,
    private departementServices: DepartementServices,
    private diplomePersonnelServices: DiplomePersonnelServices,
    private diplomeServices:DiplomeServices,
    private organismeServices:OrganismeServices,
    private periodeServices:PeriodeServices,
    public http: Http,
    public dialog: MatDialog,
    public router: Router)
  {
    this.idPers=activatedRoute.snapshot.params['idPers'];
  }

  ngOnInit() {
    this.enseingnantpermanentService.getEnseignantPermanent(this.idPers)
      .subscribe(data=>{
        this.enseignantP=data;
        this.departement=this.enseignantP.departement;
        this.specialite=this.enseignantP.specialite;
        this.etat=this.enseignantP.etat;
        this.orgOrigine=this.enseignantP.organismeOrigine;
        this.chercherEnfant(data);
        this.chercherAGrade(data);
        this.chercherDiplome(data);
        this.chercherPeriode(data);
        this.chercherEtatInactive(this.etat.idEtat);

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
    this.chercherOrg();
    
    this.lang=sessionStorage.getItem('lang');
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
  ModifierDepartement()
  {
  this.departementModifiable=true;
  }
  ModifierSpecialite()
  {
  this.specialiteModifiable=true;
  }
  ModifierOrganisme()
  {
  this.orgModifiable=true;
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
    this.enseignantP.organismeOrigine=this.orgOrigine;
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
      else if(this.enseignantP.etatCivil=="Divorcé(e)")
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
      else if(this.enseignantP.etatCivilAr=="(مطلق(ة")
      {
        this.enseignantP.etatCivil="Divorcé(e)";
      }
    }
    this.enseingnantpermanentService.updateEnseignantPermanent(this.enseignantP)
      .subscribe(data=>{
        this.showSuccess();
        this.ajouterenfants(data);
        this.EnregistrerDiplomeP(data);
        this.EnregistrerAgrade(data);
        this.EnregistrerPoste(data);
        if(this.etat.libelleEtat=="non-actif" && this.etatPersonnel!=null)
        {
          this.updateEtatInactive(data);
        }
        else if(this.etat.libelleEtat=="détaché" && this.etatPersonnel!=null)
        {
          this.updateEtatInactive(data);
        }
        else if(this.etat.libelleEtat=="non-actif" && this.etatPersonnel==null)
        {
          this.EnregistrerEtatPersonnel(data);
        }
        else if(this.etat.libelleEtat=="détaché" && this.etatPersonnel==null)
        {
          this.EnregistrerEtatPersonnel(data);
        }
        console.log(data);
        this.router.navigate(['/ListePersonnel']);
      },err=>{
        console.log(err);
        this.toastr.error("veuillez vérifier les informations saisies");
      });
    //this.EnregistrerAgrade();
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
  updateEtatInactive(en:EnseignantPermanent)
  {this.etatPersonnel.personnel=en;
    this.etatPersonnel.etat=this.etat;
    this.etatPersonnel.lieuDetachement=this.lieuDetachement;
    this.etatPersonnelServices.updateEtatPersonnel(this.etatPersonnel)
    .subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
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
    if(e.etatCivil=="Célibataire")
    {
      return;
    }
    else{
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

  this.agradeServices.getGradeActuel(en.idPers)
  .subscribe(data => {
    this.agrade=data;
    console.log(data);
  }, err => {
    console.log(err);
  });
  en.gradeActuel=this.agrade.grade.titre;
  en.gradeActuelAr=this.agrade.grade.titreAr;
  this.agrade.gradeActuel=true;
/*   this.agradeServices.updateAGrade(this.agrade)
  .subscribe(data => {
    console.log(data);
  }, err => {
    console.log(err);
  }); */
  this.enseingnantpermanentService.updateEnseignantPermanent(en)
  .subscribe(data => {
    console.log(data);
  }, err => {
    console.log(err);
  });
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
  getErrorMessage() {
    //  this.email.hasError('required') ? 'veuillez remplir le champs' :
    return this.email.hasError('email') ? 'adresse non valide' :
            '';
  }
  getErrorMessageM() {
    return this.matricule.hasError('required') ? 'Champ obligatoire' :
     this.matricule.hasError('pattern')? 'des chiffres seulement' :
     this.matricule.hasError('minLength')? 'le minimum 4 chiffres' :
            '';
  }
  getErrorMessageCode() {
    return this.codePostal.hasError('pattern')? 'des chiffres seulement' :
     this.codePostal.hasError('minLength')? 'le minimum 4 chiffres' :
            '';
  }
  getErrorMessageC() {
    return this.cinM.hasError('required') ? 'Champ obligatoire' :
     this.cinM.hasError('pattern') ? 'des chiffres seulement' :
     this.cinM.hasError('minLength') ? 'le minimum 8 chiffres' :
            '';
  }
  getErrorMessageT() {
    return this.tel.hasError('required') ? 'Champ obligatoire' :
     this.tel.hasError('pattern') ? 'des chiffres seulement' :
     this.tel.hasError('minLength') ? 'le minimum 8 chiffres' :
            '';
  }
  getErrorMessageN() {
    return this.nom.hasError('required') ? 'Champ obligatoire' :
     this.nom.hasError('pattern') ? 'des caractères seulement' :
     this.nom.hasError('minLength') ? 'le minimum 3 chiffres' :
            '';
  }
  getErrorMessageP() {
    return this.prenom.hasError('required') ? 'Champ obligatoire' :
     this.prenom.hasError('pattern') ? 'des caractères seulement' :
     this.prenom.hasError('minLength') ? 'le minimum 3 chiffres' :
            '';
  }
  getErrorMessageNAr() {
    return this.nomAr.hasError('required') ? 'Champ obligatoire' :
     this.nomAr.hasError('minLength') ? 'le minimum 3 chiffres' :
            '';
  }
  getErrorMessagePAr() {
    return this.prenomAr.hasError('required') ? 'Champ obligatoire' :
     this.prenomAr.hasError('minLength') ? 'le minimum 3 chiffres' :
            '';
  }
  getErrorMessageNpereFr() {
    return this.nomPereFr.hasError('pattern')? 'des caractères en français seulement':
    this.nomPereFr.hasError('minLength') ? 'le minimum 3 chiffres':
    '';
  }
  getErrorMessageNpereAr() {
    return this.nomPereAr.hasError('pattern')? 'des caractères en arabe seulement':
    this.nomPereAr.hasError('minLength') ? 'le minimum 4 chiffres':
    '';
  }
  getErrorMessageLNaisFr() {
    return this.lieuNaissFr.hasError('pattern')? 'des caractères en français seulement':
    this.nomPereFr.hasError('minLength') ? 'le minimum 3 chiffres':
    '';
  }
  getErrorMessageLNaisAr() {
    return this.lieuNaissAr.hasError('pattern')? 'des caractères en arabe seulement':
    this.nomPereFr.hasError('minLength') ? 'le minimum 4 chiffres':
    '';
  }
  getErrorMessageNomConjFr() {
    return this.nomConjFr.hasError('pattern')? 'des caractères en français seulement':
    this.nomConjFr.hasError('minLength') ? 'le minimum 3 chiffres':
    '';
  }
  getErrorMessageNomConjAr() {
    return this.nomConjAr.hasError('pattern')? 'des caractères en arabe seulement':
    this.nomConjAr.hasError('minLength') ? 'le minimum 4 chiffres':
    '';
  }
  getErrorMessageProfConjFr() {
    return this.profConjFr.hasError('pattern')? 'des caractères en français seulement':
    this.profConjFr.hasError('minLength') ? 'le minimum 3 chiffres':
    '';
  }
  getErrorMessageProfConjAr() {
    return this.profConjAr.hasError('pattern')? 'des caractères en arabe seulement':
    this.profConjAr.hasError('minLength') ? 'le minimum 4 chiffres':
    '';
  }
  getErrorMessageLieuTrconjFr() {
    return this.lieuTrConjFr.hasError('pattern')? 'des caractères en français seulement':
    this.lieuTrConjFr.hasError('minLength') ? 'le minimum 3 chiffres':
    '';
  }
  getErrorMessageLieuConjAr() {
    return this.lieuTrConjAr.hasError('pattern')? 'des caractères en arabe seulement':
    this.lieuTrConjAr.hasError('minLength') ? 'le minimum 4 chiffres':
    '';
  }
  getErrorMessageNomEnfFr(){
    return this.nomEnfantFr.hasError('pattern')? 'des caractères en français seulement':
    this.nomEnfantFr.hasError('minLength') ? 'le minimum 3 chiffres':
    '';
  }
  getErrorMessageNomEnfAr(){
    return this.nomEnfantAr.hasError('pattern')? 'des caractères en arabe seulement':
    this.nomEnfantAr.hasError('minLength') ? 'le minimum 4 chiffres':
    '';
  }
  valideFormulaire()
  {
    if(this.enseignantP.matricule!=""&& !(this.matricule.hasError('pattern'))&& !(this.matricule.hasError('minLength')) 
    && !(this.cinM.hasError('pattern'))&&  this.enseignantP.cin!=""&&!(this.cinM.hasError('minLength')) 
    && this.enseignantP.nom!="" && !(this.nom.hasError('pattern'))&&!(this.nom.hasError('minLength')) 
    && this.enseignantP.datenaissance!=null
    && this.enseignantP.nomAr!="" &&!(this.nomAr.hasError('minLength'))
    && this.enseignantP.prenomAr!="" &&!(this.prenomAr.hasError('minLength'))
    &&!(this.prenom.hasError('pattern'))&& this.enseignantP.prenom!="" &&!(this.prenom.hasError('minLength')) 
    &&(this.enseignantP.telephone!="") && !(this.tel.hasError("pattern"))&&!(this.tel.hasError('minLength')))
    {
      if((this.enseignantP.email!="")&&(this.email.hasError('email')))
      {return true;}
      else if((this.enseignantP.email!="")&& !(this.email.hasError('email')))
      {
      return false;
      }
      if((this.enseignantP.codepostal!=0)&&(this.codePostal.hasError('pattern')))
      {return true;}
      else if((this.enseignantP.codepostal!=0)&& !(this.codePostal.hasError('pattern')))
      {
      return false;
      }
      return false;
    }
    else
    return true;
  }
  Annuler()
  {
    this.router.navigate(['/ListePersonnel']);
  }
  showSuccess() {
    if(this.lang=='fr')
    {
      this.toastr.success("Mise à jour effectuée avec succes");
    }
  else
    {
      this.toastr.success("تم التعديل بنجاح");
    }
  }
}
