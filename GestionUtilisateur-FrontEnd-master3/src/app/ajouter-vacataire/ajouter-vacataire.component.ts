import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EnseignantLibre } from '../../model/model.enseignantLibre';
import { EnseignantFonctionnaireEtat } from '../../model/model.enseignantFonctEtat';
import { Departement } from '../../model/model.departement';
import { Diplome } from '../../model/model.diplome';
import { DiplomePersonnel } from '../../model/model.diplomepersonnel';
import { Specialite } from '../../model/model.specialite';
import { EnseignantLibreServices } from '../../services/enseignantlibre.services';
import { DepartementServices } from '../../services/departement.services';
import { DiplomeServices } from '../../services/diplome.services';
import { SpecialiteServices } from '../../services/specialite.services';
import { DiplomePersonnelServices } from '../../services/diplomepersonnel.services';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { EnseignantFonctionnaireEtatServices } from '../../services/enseignantFonctionnaireEtat.services';
import { DemandeVacation } from '../../model/model.demandeVacation';
import { DemandeVacationServices } from '../../services/demandeVacation.services';
import { EtatServices } from '../../services/etat.services';
import { Etat } from '../../model/model.etat';
import { Role } from '../../model/model.role';
import { SemestreServices } from '../../services/semestre.services';
import { AnneeUniversitaireServices } from '../../services/anneeUniversitaire.services';
import { AnneeUniversitaire } from '../../model/model.anneeuniversitaire';
import { Semestre } from '../../model/model.semestre';
import { ChargeSem } from '../../model/model.chargeSem';
import { ChargeSemestreServices } from '../../services/chargeSem.services';
import { EnseignantVacataire } from '../../model/model.enseignantVacataire';

@Component({
  selector: 'app-ajouter-vacataire',
  templateUrl: './ajouter-vacataire.component.html',
  styleUrls: ['./ajouter-vacataire.component.css']
})
export class AjouterVacataireComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  currentPage: number = 0;
  pages: Array<number>;
  type:string;
  enseignantLibre:EnseignantLibre=new EnseignantLibre();
  enseignantFonct:EnseignantFonctionnaireEtat=new EnseignantFonctionnaireEtat();
  departements: Array<Departement> = new Array<Departement>();
  departement:Departement;
  panelOpenState: boolean = false;
  diplomes: Array<Diplome> = new Array<Diplome>();
  diplome:Diplome=new Diplome();
  diplomep:DiplomePersonnel=new DiplomePersonnel();
  diplomepers:Array<DiplomePersonnel>=new Array<DiplomePersonnel>();
  specialite:Specialite=new Specialite();
  specialites:Array<Specialite>=new Array<Specialite>();
  selectedFile:File=null;
  TypeEnseignant = [
    {value: 'Enseignant Libre'},
    {value: 'Enseignant Fonctionnaire'}
  ];
  lang:string;
  TypeEnseignantAr = [
    {value: 'أستاذ حر'},
    {value: 'أستاذ لدى الدولة'}
  ];
 
  idDemande:number;
  etat:Etat=new Etat();
  etats:Array<Etat>=new Array<Etat>();
  role:Role=new Role();
  anneeUniv:AnneeUniversitaire=new AnneeUniversitaire();
  anneeUnivs:Array<AnneeUniversitaire>=new Array<AnneeUniversitaire>();
  semestre:Semestre=new Semestre();
  semestres:Array<Semestre>=new Array<Semestre>();
  demandeVacation:DemandeVacation=new DemandeVacation();
  ajoutAnnee:boolean=false;
  chargeSem:ChargeSem=new ChargeSem();
  constructor(private enseingnantlibreService:EnseignantLibreServices,
    private enseignantFonctServices:EnseignantFonctionnaireEtatServices,
    private departementServices: DepartementServices,
    private demandeServices:DemandeVacationServices,
    private diplomeService:DiplomeServices,
    private specialiteServices:SpecialiteServices,
    private diplomePServices:DiplomePersonnelServices,
    private anneeUnivService:AnneeUniversitaireServices,
    private chargeSemServices:ChargeSemestreServices,
    private semestreServices:SemestreServices,
    private etatServices:EtatServices,
    public http: HttpClient,
    public activatedRoute:ActivatedRoute,
    public router: Router) 
    {
  this.lang=sessionStorage.getItem("lang");
  if(this.lang=='ar')
  {
    this.type="أستاذ حر";
  }
  else
  {
    this.type="Enseignant Libre";
  }
      this.idDemande=activatedRoute.snapshot.params['idDemande'];
      if(this.idDemande!=null)
      {
        this.demandeServices.getDemandeVacation(this.idDemande)
        .subscribe(data=>{
          this.demandeVacation=data;
          console.log(data);
        },err=>{
          console.log(err);
        })
      } 
      if(this.demandeVacation!=null)
      {
       if(this.demandeVacation.typeDemande==="EnseignantLibre")
       {this.type="Enseignant Libre";
         this.enseignantLibre.cin=this.demandeVacation.cin;
         this.enseignantLibre.nom=this.demandeVacation.nom;
         this.enseignantLibre.prenom=this.demandeVacation.prenom;
         this.enseignantLibre.adresse=this.demandeVacation.adresse;
         this.enseignantLibre.codepostal=this.demandeVacation.codePostal;
         this.enseignantLibre.email=this.demandeVacation.email;
         this.enseignantLibre.telephone=this.demandeVacation.telephone;
         this.enseignantLibre.specialite=this.demandeVacation.specialite;
         console.log(this.enseignantLibre.cin);
       }
       if(this.demandeVacation.typeDemande==="EnseignantFonctionnaire")
       {this.type="Enseignant Fonctionnaire";
         this.enseignantFonct.cin=this.demandeVacation.cin;
         this.enseignantFonct.nom=this.demandeVacation.nom;
         this.enseignantFonct.prenom=this.demandeVacation.prenom;
         this.enseignantFonct.adresse=this.demandeVacation.adresse;
         this.enseignantFonct.codepostal=this.demandeVacation.codePostal;
         this.enseignantFonct.email=this.demandeVacation.email;
         this.enseignantFonct.telephone=this.demandeVacation.telephone;
         this.enseignantFonct.specialite=this.demandeVacation.specialite;
       }
     }
     console.log(this.enseignantFonct.cin);
     }

  ngOnInit() {
   this.chercherDep();
    this.chercherDip();
    this.chercherSpecialite();
    this.chercherEtats();
    this.diplomep.diplome=this.diplome;
    this.diplomepers.push(this.diplomep);
    this.role.idRole=2;
    this.role.type="utilisateur";
    this.chercherAnnee();
    this.chercherSemestre();
  }
  AjouterAnnee()
  {
   this.ajoutAnnee=true;
  }
  EnregistreAnnee()
  {
  this.anneeUnivService.saveAnnee(this.anneeUniv)
    .subscribe(data=>{
      this.anneeUniv=data;
    },err=>{
      console.log(err);
    })

  }
  EnregistreChargeSem(en:EnseignantVacataire)
  {this.chargeSem.semestre=this.semestre;
    this.chargeSem.anneeuniversitaire=this.anneeUniv;
    this.chargeSem.enseignantvacataire=en;
    this.chargeSemServices.saveChargeSem(this.chargeSem)
    .subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  chercherAnnee()
  {
    this.anneeUnivService.getAllAnnee()
    .subscribe(data=>{
      this.anneeUnivs=data;
    },err=>{
      console.log(err);
    })
    }
    chercherSemestre()
    {
      this.semestreServices.getAllSemestre()
      .subscribe(data=>{
        this.semestres=data;
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
        this.pages=new Array(data.totalPages);
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

  EnregistrerDiplomeP(en:EnseignantLibre) {
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
  Enregistrer() {
  this.enseignantLibre.departement=this.departement;
  this.enseignantLibre.specialite=this.specialite;
  this.enseignantLibre.etat=this.etat;
  this.enseignantLibre.role=this.role;
  this.enseignantLibre.login=null;
  this.enseignantLibre.motpasse=null;
  this.enseignantLibre.matricule=null;
  if(this.ajoutAnnee)
  {
    this.EnregistreAnnee();
  }
  if(this.lang=="fr")
  {
    if(this.enseignantLibre.sexe=="Femme")
    {
      this.enseignantLibre.sexeAr="انثى";
    }
    else if(this.enseignantLibre.sexe=="Homme")
    {
      this.enseignantLibre.sexeAr="ذكر";
    }
    if(this.enseignantLibre.etatCivil=="Célibataire" && this.enseignantLibre.sexe=="Femme")
    {
      this.enseignantLibre.etatCivilAr="عزباء";
    }
    else if(this.enseignantLibre.etatCivil=="Célibataire" && this.enseignantLibre.sexe=="Homme")
    {
      this.enseignantLibre.etatCivilAr="أعزب";
    }
    else if(this.enseignantLibre.etatCivil=="Marié(e)")
    {
      this.enseignantLibre.etatCivilAr="(متزوج(ة";
    }
    else
    {
      this.enseignantLibre.etatCivilAr="(مطلق(ة";
    }
  }
  else
  {
    if(this.enseignantLibre.sexeAr=="انثى")
    {
      this.enseignantLibre.sexe="Femme";
    }
    else if(this.enseignantLibre.sexeAr=="ذكر")
    {
      this.enseignantLibre.sexe="Homme";
    }
    if(this.enseignantLibre.etatCivilAr=="عزباء" || this.enseignantLibre.etatCivilAr=="أعزب")
    {
      this.enseignantLibre.etatCivil="Célibataire";
    }
    else if(this.enseignantLibre.etatCivilAr=="(متزوج(ة")
    {
      this.enseignantLibre.etatCivil="Marié(e)";
    }
    else
    {
      this.enseignantLibre.etatCivil="Divorcé(e)";
    }
  }
  this.enseingnantlibreService.saveEnseignantLibre(this.enseignantLibre)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
        this.EnregistrerDiplomeP(data);
        this.EnregistreChargeSem(data);
      },err=>{
        console.log(err);
      });

  }
  EnregistrerFonct()
  {
    this.enseignantFonct.departement=this.departement;
    this.enseignantFonct.specialite=this.specialite;
    this.enseignantFonct.etat=this.etat;
    this.enseignantFonct.role=this.role;
    this.enseignantFonct.motpasse=null;
    this.enseignantFonct.login=null;
    this.enseignantLibre.matricule=null;
    if(this.ajoutAnnee)
    {
      this.EnregistreAnnee();
    }
    if(this.lang=="fr")
  {
    if(this.enseignantFonct.sexe=="Femme")
    {
      this.enseignantFonct.sexeAr="انثى";
    }
    else if(this.enseignantFonct.sexe=="Homme")
    {
      this.enseignantFonct.sexeAr="ذكر";
    }
    if(this.enseignantFonct.etatCivil=="Célibataire" && this.enseignantFonct.sexe=="Femme")
    {
      this.enseignantFonct.etatCivilAr="عزباء";
    }
    else if(this.enseignantFonct.etatCivil=="Célibataire" && this.enseignantFonct.sexe=="Homme")
    {
      this.enseignantFonct.etatCivilAr="أعزب";
    }
    else if(this.enseignantFonct.etatCivil=="Marié(e)")
    {
      this.enseignantFonct.etatCivilAr="(متزوج(ة";
    }
    else
    {
      this.enseignantFonct.etatCivilAr="(مطلق(ة";
    }
  }
  else
  {
    if(this.enseignantFonct.sexeAr=="انثى")
    {
      this.enseignantFonct.sexe="Femme";
    }
    else if(this.enseignantFonct.sexeAr=="ذكر")
    {
      this.enseignantFonct.sexe="Homme";
    }
    if(this.enseignantFonct.etatCivilAr=="عزباء" || this.enseignantFonct.etatCivilAr=="أعزب")
    {
      this.enseignantFonct.etatCivil="Célibataire";
    }
    else if(this.enseignantFonct.etatCivilAr=="(متزوج(ة")
    {
      this.enseignantFonct.etatCivil="Marié(e)";
    }
    else
    {
      this.enseignantFonct.etatCivil="Divorcé(e)";
    }
  }
    //this.enseignantP.pos
    this.enseignantFonctServices.saveEnseignantFonctionnaireEtat(this.enseignantFonct)
        .subscribe(data=>{
          alert("Success d'ajout");
          console.log(data);
          this.EnregistrerDiplomeP(data);
          this.EnregistreChargeSem(data);
        },err=>{
          console.log(err);
        });
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
 ajouterDiplome()
  {
    this.diplomep=new DiplomePersonnel();
    this.diplomep.diplome=new Diplome();
    this.diplomepers.push(this.diplomep);
    console.log(this.type);
  }
  onFileSelected(event)
{
  this.selectedFile=<File>event.target.files[0];
}
upload(idCong:number)
{
  const fb=new FormData();
  fb.append('uploadfile',this.selectedFile,this.selectedFile.name);
 this.http.post("http://localhost:8080/uploadFile/"+idCong,fb)
 .subscribe(res=>{
   console.log(res);
 })
}
}
