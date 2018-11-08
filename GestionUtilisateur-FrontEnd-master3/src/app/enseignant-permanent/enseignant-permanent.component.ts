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
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-enseignant-permanent',
  templateUrl: './enseignant-permanent.component.html',
  styleUrls: ['./enseignant-permanent.component.css']
})
export class EnseignantPermanentComponent implements OnInit {
  email = new FormControl('', [Validators.email]);
  matricule=new FormControl('',[Validators.required, Validators.pattern("[0-9]+"),Validators.minLength(4)]);
  cinM=new FormControl('',[Validators.required, Validators.pattern("[0-9]+"),Validators.minLength(8)]);
  nom=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]+"),Validators.minLength(3)]);
  prenom=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]+"),Validators.minLength(3)]);
  tel=new FormControl('',[Validators.required,Validators.pattern("[0-9]+"),Validators.minLength(8)]);
  codePostal=new FormControl('',[Validators.pattern("[0-9]+"),Validators.minLength(4)]);
  nomAr=new FormControl('',[Validators.required,Validators.minLength(3)]);
  prenomAr=new FormControl('',[Validators.required,Validators.minLength(3)]);
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
  constructor(private agradeServices:AGradeServices,
              private gradeServices: GradeServices,
              private corpsServices: CorpsServices,
              private enseingnantpermanentService:EnseignantPermanentServices,
              private enfantservice: EnfantServices,
              private departementServices: DepartementServices,
              private toastr: ToastrService,
              private diplomeService:DiplomeServices,
              private specialiteServices:SpecialiteServices,
              private diplomePServices:DiplomePersonnelServices,
              private etatServices:EtatServices,
              private etatPersonnelServices:EtatPersonnelServices,
              private periodeServices:PeriodeServices,
              private posteServices: PosteAdministrativeServices,
              private organismeServices:OrganismeServices,
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
    this.chercherPosteAdmin();
    this.chercherOrg();
    this.enfants.push(this.enfant);
    this.diplomep.diplome=this.diplome;
    this.diplomep.organisme=this.organisme;
    this.diplomepers.push(this.diplomep);
    this.AGrades.push(this.agrade);
    this.periode.posteAdmin=this.poste;
    this.periodes.push(this.periode);
    this.lang=sessionStorage.getItem('lang');
  }
  getErrorMessage() {
    //  this.email.hasError('required') ? 'veuillez remplir le champs' :
    return this.email.hasError('email') ? 'adresse non valide' :
            '';
  }
  getErrorMessageM() {
    return this.matricule.hasError('required') ? 'Champs obligatoire' :
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
    return this.cinM.hasError('required') ? 'Champs obligatoire' :
     this.cinM.hasError('pattern') ? 'des chiffres seulement' :
     this.cinM.hasError('minLength') ? 'le minimum 8 chiffres' :
            '';
  }
  getErrorMessageT() {
    return this.tel.hasError('required') ? 'Champs obligatoire' :
     this.tel.hasError('pattern') ? 'des chiffres seulement' :
     this.tel.hasError('minLength') ? 'le minimum 8 chiffres' :
            '';
  }
  getErrorMessageN() {
    return this.nom.hasError('required') ? 'Champs obligatoire' :
     this.nom.hasError('pattern') ? 'des caractères seulement' :
     this.nom.hasError('minLength') ? 'le minimum 3 chiffres' :
            '';
  }
  getErrorMessageP() {
    return this.prenom.hasError('required') ? 'Champs obligatoire' :
     this.prenom.hasError('pattern') ? 'des caractères seulement' :
     this.prenom.hasError('minLength') ? 'le minimum 3 chiffres' :
            '';
  }
  getErrorMessageNAr() {
    return this.nomAr.hasError('required') ? 'Champs obligatoire' :
     this.nomAr.hasError('minLength') ? 'le minimum 3 chiffres' :
            '';
  }
  getErrorMessagePAr() {
    return this.prenomAr.hasError('required') ? 'Champs obligatoire' :
     this.prenomAr.hasError('minLength') ? 'le minimum 3 chiffres' :
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
  EnregistrerPoste(en:EnseignantPermanent) {
    for(let p of this.periodes)
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
  console.log(this.orgOrigine);
  if(this.orgOrigine.libelleOrg!="" || this.orgOrigine.libelleOrgAr!="")
  {
    this.enseignantP.organismeOrigine=this.orgOrigine;
  }
  else
  {
this.orgOrigine.idOrg=5;
this.enseignantP.organismeOrigine=this.orgOrigine;
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
  this.enseingnantpermanentService.saveEnseignantPermanent(this.enseignantP)
      .subscribe(data=>{
        this.showSuccess();
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
        this.EnregistrerPoste(data);
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      });
   //this.EnregistrerAgrade();

  }
  showSuccess() {
    if(this.lang=='fr')
    {
      this.toastr.success("L'ajout d'un enseignant a été effectué avec succès");
    }
  else
    {
      this.toastr.success("تم إضافة الأستاذ بنجاح");
    }
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
  chercherPosteAdmin()
  {
    this.posteServices.getAllPostes()
      .subscribe(data=>{
        this.postes=data;
        this.pages=new Array(data.totalPages);
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
  ajouterPoste()
  {if(this.periodes.length<3)
    {
    this.periode.posteAdmin=new PosteAdministrative();
    this.periode = new Periode();
    this.periodes.push(this.periode);
  }
  }
  ajouterGrade()
  {
    this.agrade=new AGrade();
    this.agrade.grade=new Grade();
    this.AGrades.push(this.agrade);
  }
  Annuler()
  {
    this.router.navigate(['/ListePersonnel']);
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
}
