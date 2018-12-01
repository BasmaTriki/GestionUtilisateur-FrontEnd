import { Component, OnInit } from '@angular/core';
import {FormControl, NgModel, Validators} from "@angular/forms";
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
import { ToastrService } from 'ngx-toastr';

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
  email = new FormControl('', [Validators.email]);
  matricule=new FormControl('',[Validators.required, Validators.pattern("[0-9]+"),Validators.minLength(4)]);
  cinM=new FormControl('',[Validators.required, Validators.pattern("[0-9]+"),Validators.minLength(8)]);
  nom=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]+"),Validators.minLength(3)]);
  prenom=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]+"),Validators.minLength(3)]);
  tel=new FormControl('',[Validators.required,Validators.pattern("[0-9]+"),Validators.minLength(8)]);
  codePostal=new FormControl('',[Validators.pattern("[0-9]+"),Validators.minLength(4)]);
  nomAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"), Validators.required,Validators.minLength(3)]);
  prenomAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  nomPereFr=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]+"),Validators.minLength(3)]);
  nomPereAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  lieuNaissFr=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]+"),Validators.minLength(3)]);
  lieuNaissAr= new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  nomConjFr=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]+"),Validators.minLength(3)]);
  nomConjAr= new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  profConjFr=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]+"),Validators.minLength(3)]);
  profConjAr= new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  lieuTrConjFr=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]+"),Validators.minLength(3)]);
  lieuTrConjAr= new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  nomEnfantFr=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z]+"),Validators.minLength(3)]);
  nomEnfantAr= new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  constructor(  private enfantservice: EnfantServices,
                private etatServices: EtatServices,
                private agradeServices:AGradeServices,
                private gradeServices: GradeServices,
                private administratifServices:AdministratifServices,
                private serviceServices:ServiceServices,
                public http: Http,
                private toastr: ToastrService,
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
        this.administratif.sexeAr="انثى";
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
      if(this.administratif.sexeAr=="انثى")
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
  Annuler()
  {
    this.router.navigate(['/ListeAdmin']);
  }
  showSuccess() {
    if(this.lang=='fr')
    {
      this.toastr.success("L'ajout d'un administratif a été effectué avec succès");
    }
  else
    {
      this.toastr.success("تم إضافة العون بنجاح");
    }
  }
  valideFormulaire()
  {
    if(this.administratif.matricule!=""&& !(this.matricule.hasError('pattern'))&& !(this.matricule.hasError('minLength')) 
    && !(this.cinM.hasError('pattern'))&&  this.administratif.cin!=""&&!(this.cinM.hasError('minLength')) 
    && this.administratif.nom!="" && !(this.nom.hasError('pattern'))&&!(this.nom.hasError('minLength')) 
    && this.administratif.datenaissance!=null
    && this.administratif.nomAr!="" &&!(this.nomAr.hasError('minLength'))
    && this.administratif.prenomAr!="" &&!(this.prenomAr.hasError('minLength'))
    &&!(this.prenom.hasError('pattern'))&& this.administratif.prenom!="" &&!(this.prenom.hasError('minLength')) 
    &&(this.administratif.telephone!="") && !(this.tel.hasError("pattern"))&&!(this.tel.hasError('minLength')))
    {
      if((this.administratif.email!="")&&(this.email.hasError('email')))
      {return true;}
      else if((this.administratif.email!="")&& !(this.email.hasError('email')))
      {
      return false;
      }
      if((this.administratif.codepostal!=0)&&(this.codePostal.hasError('pattern')))
      {return true;}
      else if((this.administratif.codepostal!=0)&& !(this.codePostal.hasError('pattern')))
      {
      return false;
      }
      return false;
    }
    else
    return true;
  }
}
