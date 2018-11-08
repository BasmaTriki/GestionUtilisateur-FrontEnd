import { Component, OnInit } from '@angular/core';
import { Specialite } from '../../model/model.specialite';
import { EnseignantFonctionnaireEtat } from '../../model/model.enseignantFonctEtat';
import { Departement } from '../../model/model.departement';
import { Etat } from '../../model/model.etat';
import { ActivatedRoute, Router } from '@angular/router';
import { EnseignantFonctionnaireEtatServices } from '../../services/enseignantFonctionnaireEtat.services';
import { Http } from '@angular/http';
import { Semestre } from '../../model/model.semestre';
import { AnneeUniversitaire } from '../../model/model.anneeuniversitaire';
import { ChargeSem } from '../../model/model.chargeSem';
import { DiplomePersonnel } from '../../model/model.diplomepersonnel';
import { Diplome } from '../../model/model.diplome';
import { DiplomePersonnelComponent } from '../diplome-personnel/diplome-personnel.component';
import { SpecialiteServices } from '../../services/specialite.services';
import { DepartementServices } from '../../services/departement.services';
import { ToastrService } from 'ngx-toastr';
import { ChargeSemestreServices } from '../../services/chargeSem.services';
import { EtatPersonnelServices } from '../../services/etatPersonnel.services';
import { DiplomeServices } from '../../services/diplome.services';
import { OrganismeServices } from '../../services/organisme.services';
import { DiplomePersonnelServices } from '../../services/diplomepersonnel.services';
import { AnneeUniversitaireServices } from '../../services/anneeUniversitaire.services';
import { SemestreServices } from '../../services/semestre.services';
import { MatDialog } from '@angular/material';
import { Organisme } from '../../model/model.organisme';
import { EtatPersonnel } from '../../model/model.etatPersonnel';

@Component({
  selector: 'app-edit-enseignant-fonctionnaire',
  templateUrl: './edit-enseignant-fonctionnaire.component.html',
  styleUrls: ['./edit-enseignant-fonctionnaire.component.css']
})
export class EditEnseignantFonctionnaireComponent implements OnInit {
  idPers:number;
  specialite:Specialite=new Specialite();
  specialites:Array<Specialite>=new Array<Specialite>();
  enseignantF:EnseignantFonctionnaireEtat=new EnseignantFonctionnaireEtat();
  departements: Array<Departement> = new Array<Departement>();
  departement:Departement=new Departement();
  etat:Etat=new Etat();
  etats:Array<Etat>=new Array<Etat>();
  etatModifiable:boolean=false;
  departementModifiable:boolean=false;
  specialiteModifiable:boolean=false;
  newdiplomes:Array<DiplomePersonnel>=new Array<DiplomePersonnel>();
  diplome:Diplome=new Diplome();
  diplomes:Array<Diplome>=new Array<Diplome>()
  diplomep:DiplomePersonnel=new DiplomePersonnel();
  orgOrigine:Organisme=new Organisme();
  orgOrigines:Array<Organisme>=new Array<Organisme>();
  diplomepers:Array<DiplomePersonnel>=new Array<DiplomePersonnel>();
  etatPersonnel:EtatPersonnel=new EtatPersonnel();
  lang:string;
  chargeSem:ChargeSem=new ChargeSem();
  chargeSems:Array<ChargeSem>=new Array<ChargeSem>();
  anneeUniv:AnneeUniversitaire=new AnneeUniversitaire();
  anneeUnivs:Array<AnneeUniversitaire>=new Array<AnneeUniversitaire>();
  semestre:Semestre=new Semestre();
  ajoutAnnee:boolean=false;
  semestres:Array<Semestre>=new Array<Semestre>();
  selectedFile:File=null;
    constructor(public activatedRoute:ActivatedRoute,
      private enseignantServices:EnseignantFonctionnaireEtatServices,
      private specialiteServices:SpecialiteServices,
      private departementServices: DepartementServices,
      private toastr: ToastrService,
      private chargeSemestreService:ChargeSemestreServices,
      private etatPersonnelServices:EtatPersonnelServices,
      private diplomeServices:DiplomeServices,
      private organismeServices:OrganismeServices,
      private diplomePersonnelServices: DiplomePersonnelServices,
      private anneeUnivService:AnneeUniversitaireServices,
      private semestreServices:SemestreServices,
                public http: Http,
                public dialog: MatDialog,
                public router: Router) 
    {
      this.idPers=activatedRoute.snapshot.params['idPers'];
     }
  
    ngOnInit() {
      this.enseignantServices.getEnseignantFonctionnaireEtat(this.idPers)
      .subscribe(data=>{
        this.enseignantF=data;
        this.chercherDiplome(data);
       this.departement=this.enseignantF.departement;
       this.specialite=this.enseignantF.specialite;
       this.etat=this.enseignantF.etat;
       this.chercherEtatInactive(this.etat.idEtat);
       this.chercherChargeSem(data);
      },err=>{
        console.log(err);
      });
      this.chercherDip();
      this.chercherDep();
      this.chercherOrg();
      this.chercherAnnee();
      this.chercherSemestre();
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
    chercherDiplome(e:EnseignantFonctionnaireEtat)
    {
      this.diplomePersonnelServices.getPersonnelDiplome(e.idPers)
      .subscribe(data=>{
      this.diplomepers=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
    }
    chercherChargeSem(e:EnseignantFonctionnaireEtat)
    {
      this.chargeSemestreService.getChargeEnseignant(e.idPers)
      .subscribe(data=>{
      this.chargeSems=data;
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
  chercherDip() {
    this.diplomeServices.allDiplomes()
      .subscribe(data => {
        this.diplomes = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
  EnregistrerEtatPersonnel(en:EnseignantFonctionnaireEtat)
{this.etatPersonnel.personnel=en;
  this.etatPersonnel.etat=this.etat;
  this.etatPersonnelServices.saveEtatPersonnel(this.etatPersonnel)
  .subscribe(data => {
    console.log("Success d'ajout etatPersonnel");
    console.log(data);
  }, err => {
    console.log(err);
  });

}
  updateEtatInactive(en:EnseignantFonctionnaireEtat)
  {this.etatPersonnel.personnel=en;
    this.etatPersonnel.etat=this.etat;
    this.etatPersonnelServices.updateEtatPersonnel(this.etatPersonnel)
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
  ModifierDiplome(d:DiplomePersonnel)
  {
    let dialogRef = this.dialog.open(DiplomePersonnelComponent, {data:{num:d.id_DipP}});
  }
  EnregistrerDiplomeP(en:EnseignantFonctionnaireEtat) {
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
  showSuccess() {
    if(this.lang=='fr')
    {
      this.toastr.success("Mise à jour a été effectuée avec succès");
    }
  else
    {
      this.toastr.success("تم التعديل بنجاح");
    }
  }
  updateEnseignant() {
    this.enseignantF.departement=this.departement;
    this.enseignantF.specialite=this.specialite;
    this.enseignantF.etat=this.etat;
  if(this.ajoutAnnee)
  {
    this.EnregistreAnnee();
  }
    this.enseignantServices.updateEnseignantPermanent(this.enseignantF)
    .subscribe(data=>{
      this.showSuccess();
      if(this.chargeSem!=null)
      this.EnregistreChargeSem(data);
      this.EnregistrerDiplomeP(data);
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
      console.log(data);
      if(this.selectedFile!=null)
      {
        this.upload(this.idPers);
      }
      this.router.navigate(['/ListeEnseignantFonct']);
    },err=>{
      console.log(err);
      this.toastr.error("veuillez vérifier les informations saisies");
    });
}
onFileSelected(event)
{
  this.selectedFile=<File>event.target.files[0];
}
upload(idPers:number)
{
  const fb=new FormData();
  fb.append('upload',this.selectedFile,this.selectedFile.name);
 this.http.post("http://localhost:8080/uploadAutorisation/"+idPers,fb)
 .subscribe(res=>{
   console.log(res);
 })
}
EnregistreChargeSem(en:EnseignantFonctionnaireEtat)
{this.chargeSem.semestre=this.semestre;
  this.chargeSem.anneeuniversitaire=this.anneeUniv;
  this.chargeSem.enseignantvacataire=en;
  this.chargeSemestreService.saveChargeSem(this.chargeSem)
  .subscribe(data=>{
    console.log(data);
  },err=>{
    console.log(err);
  })
}
}
