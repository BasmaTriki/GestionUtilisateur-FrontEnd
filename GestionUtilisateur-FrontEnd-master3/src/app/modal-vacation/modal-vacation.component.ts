import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DemandeVacationServices } from '../../services/demandeVacation.services';
import { DemandeVacation } from '../../model/model.demandeVacation';
import { AnneeUniversitaireServices } from '../../services/anneeUniversitaire.services';
import { AnneeUniversitaire } from '../../model/model.anneeuniversitaire';
import { ChargeSemestreServices } from '../../services/chargeSem.services';
import { EtatServices } from '../../services/etat.services';
import { SemestreServices } from '../../services/semestre.services';
import { Semestre } from '../../model/model.semestre';
import { ChargeSem } from '../../model/model.chargeSem';
import { EnseignantLibre } from '../../model/model.enseignantLibre';
import { EnseignantFonctionnaireEtat } from '../../model/model.enseignantFonctEtat';
import { EnseignantLibreServices } from '../../services/enseignantlibre.services';
import { EnseignantFonctionnaireEtatServices } from '../../services/enseignantFonctionnaireEtat.services';
import { EnseignantVacataire } from '../../model/model.enseignantVacataire';
import { Etat } from '../../model/model.etat';
import { Role } from '../../model/model.role';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-vacation',
  templateUrl: './modal-vacation.component.html',
  styleUrls: ['./modal-vacation.component.css']
})
export class ModalVacationComponent implements OnInit {
  idDemande:number=0;
  demandeVacation:DemandeVacation=new DemandeVacation();
  type:boolean=false;
  anneeUniv:AnneeUniversitaire=new AnneeUniversitaire();
  anneeUnivs:Array<AnneeUniversitaire>=new Array<AnneeUniversitaire>();
  semestre:Semestre=new Semestre();
  semestres:Array<Semestre>=new Array<Semestre>();
  ajoutAnnee:boolean=false;
  chargeSem:ChargeSem=new ChargeSem();
  enseignantLibre:EnseignantLibre=new EnseignantLibre();
  enseignantFonct:EnseignantFonctionnaireEtat=new EnseignantFonctionnaireEtat();
  etat:Etat=new Etat();
  role:Role=new Role();
  lang:string;
  constructor(public dialogRef: MatDialogRef<ModalVacationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router:Router,
    private enseingnantlibreService:EnseignantLibreServices,
    private enseignantFonctServices:EnseignantFonctionnaireEtatServices,
    private demandeServices:DemandeVacationServices,
    private toastr: ToastrService,
    private anneeServices:AnneeUniversitaireServices,
    private anneeUnivService:AnneeUniversitaireServices,
    private chargeSemServices:ChargeSemestreServices,
    private semestreServices:SemestreServices,
    public http: HttpClient) { 

    }

  ngOnInit() {
    this.idDemande=Number(this.data.id);
    this.doSearch();
    this.chercherAnnee();
    this.chercherSemestre();
    this.lang=sessionStorage.getItem("lang");
  }
  doSearch() {
    this.demandeServices.getDemandeVacation(this.idDemande)
      .subscribe(data => {
        this.demandeVacation= data;
      }, err => {
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
  Close()
  {
    this.dialogRef.close();
  }
  AjouterAnnee()
  {
    this.type=true;
  }
  EnregistrerAnnee()
  {
    this.anneeServices.saveAnnee(this.anneeUniv)
    .subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })

  }
  Accepter()
  { this.etat.idEtat=1;
    this.etat.libelleEtat="actif";
    this.role.idRole=2;
    this.demandeVacation.etatdemande="accepter";
    if(this.demandeVacation.typeDemande==="EnseignantLibre")
    {
      this.enseignantLibre.etat=this.etat;
      this.enseignantLibre.role=this.role;
      this.enseignantLibre.cin=this.demandeVacation.cin;
      this.enseignantLibre.nom=this.demandeVacation.nom;
      this.enseignantLibre.prenom=this.demandeVacation.prenom;
      this.enseignantLibre.adresse=this.demandeVacation.adresse+" "+this.demandeVacation.ville;
      this.enseignantLibre.codepostal=this.demandeVacation.codePostal;
      this.enseignantLibre.email=this.demandeVacation.email;
      this.enseignantLibre.nompere=this.demandeVacation.nompere;
      this.enseignantLibre.datenaissance=this.demandeVacation.datenaissance;
      this.enseignantLibre.lieuNaissance=this.demandeVacation.lieuNaissance;
      this.enseignantLibre.rib=this.demandeVacation.rib;
      this.enseignantLibre.etatCivil=this.demandeVacation.etatCivil;
      this.enseignantLibre.codepostal=this.demandeVacation.codePostal;
      this.enseignantLibre.telephone=this.demandeVacation.telephone;
      this.enseignantLibre.specialite=this.demandeVacation.specialite;
      console.log(this.enseignantLibre.cin);
      this.enseignantLibre.login=null;
      this.enseignantLibre.motpasse=null;
      this.enseignantLibre.matricule=null;
      this.enseingnantlibreService.saveEnseignantLibre(this.enseignantLibre)
      .subscribe(data=>{
        this.showSuccess();
        console.log(data);
        this.EnregistreChargeSem(data);
    this.demandeServices.updateDemandeVacation(this.demandeVacation)
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      });
    }
    if(this.demandeVacation.typeDemande==="EnseignantFonctionnaire")
    {this.enseignantFonct.etat=this.etat;
      this.enseignantFonct.role=this.role;
      this.enseignantFonct.cin=this.demandeVacation.cin;
      this.enseignantFonct.nom=this.demandeVacation.nom;
      this.enseignantFonct.prenom=this.demandeVacation.prenom;
      this.enseignantFonct.adresse=this.demandeVacation.adresse;
      this.enseignantFonct.codepostal=this.demandeVacation.codePostal;
      this.enseignantFonct.email=this.demandeVacation.email;
      this.enseignantFonct.email=this.demandeVacation.email;
      this.enseignantFonct.nompere=this.demandeVacation.nompere;
      this.enseignantFonct.datenaissance=this.demandeVacation.datenaissance;
      this.enseignantFonct.lieuNaissance=this.demandeVacation.lieuNaissance;
      this.enseignantFonct.rib=this.demandeVacation.rib;
      this.enseignantFonct.etatCivil=this.demandeVacation.etatCivil;
      this.enseignantFonct.codepostal=this.demandeVacation.codePostal;
      this.enseignantFonct.telephone=this.demandeVacation.telephone;
      this.enseignantFonct.specialite=this.demandeVacation.specialite;
      this.enseignantFonct.login=null;
      this.enseignantFonct.motpasse=null;
      this.enseignantFonct.matricule=null;
      this.enseignantFonctServices.saveEnseignantFonctionnaireEtat(this.enseignantFonct)
        .subscribe(data=>{
         this.showSuccess();
          console.log(data);
          this.EnregistreChargeSem(data);
          this.demandeServices.updateDemandeVacation(this.demandeVacation)
        },err=>{
          console.log(err);
          this.toastr.error("Veuillez vérifier les informations saisies");
        });
    }
    this.Close();

  }
  showSuccess() {
    if(this.lang=='fr')
    {
      this.toastr.success("L'ajout de congé a été effectué avec succès");
    }
  else
    {
      this.toastr.success("تم إضافة العطلة بنجاح");
    }
  }
  download(idDemande:number)
  {
    this.http.get("http://localhost:8080/downloadDiplomes/"+idDemande)
   .subscribe(res=>{
     console.log(res);
   })
  }
  Refuser()
  {this.demandeVacation.etatdemande="refuser";
  this.demandeServices.updateDemandeVacation(this.demandeVacation)
  .subscribe(data => {
    this.demandeVacation= data;
  }, err => {
    console.log(err);
  })
  this.Close();
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
}
