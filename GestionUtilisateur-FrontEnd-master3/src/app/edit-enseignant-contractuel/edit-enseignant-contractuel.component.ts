import { Component, OnInit } from '@angular/core';
import { EnseignantContractuel } from '../../model/model.enseignantContractuel';
import { Departement } from '../../model/model.departement';
import { Grade } from '../../model/model.grade';
import { PosteAdministrative } from '../../model/model.posteAdministrative';
import { AGrade } from '../../model/model.agrade';
import { DiplomePersonnel } from '../../model/model.diplomepersonnel';
import { Diplome } from '../../model/model.diplome';
import { Specialite } from '../../model/model.specialite';
import { Etat } from '../../model/model.etat';
import { EtatPersonnel } from '../../model/model.etatPersonnel';
import { ActivatedRoute, Router } from '@angular/router';
import { AGradeServices } from '../../services/agrade.services';
import { GradeServices } from '../../services/grade.services';
import { CorpsServices } from '../../services/corps.services';
import { SpecialiteServices } from '../../services/specialite.services';
import { EtatServices } from '../../services/etat.services';
import { ToastrService } from 'ngx-toastr';
import { EtatPersonnelServices } from '../../services/etatPersonnel.services';
import { DepartementServices } from '../../services/departement.services';
import { DiplomePersonnelServices } from '../../services/diplomepersonnel.services';
import { DiplomeServices } from '../../services/diplome.services';
import { Http } from '@angular/http';
import { MatDialog } from '@angular/material';
import { EnseignantPermanent } from '../../model/model.enseignantpermanent';
import { DiplomePersonnelComponent } from '../diplome-personnel/diplome-personnel.component';
import { AGradeComponent } from '../a-grade/a-grade.component';
import { EnseignantContractuelServices } from '../../services/enseignantcontractuel.services';
import { Contrat } from '../../model/model.Contrat';

@Component({
  selector: 'app-edit-enseignant-contractuel',
  templateUrl: './edit-enseignant-contractuel.component.html',
  styleUrls: ['./edit-enseignant-contractuel.component.css']
})
export class EditEnseignantContractuelComponent implements OnInit {

  enseignantP: EnseignantContractuel = new EnseignantContractuel();
  departements: Array<Departement> = new Array<Departement>();
  grades: Array<Grade> = new Array<Grade>();
  postes:Array<PosteAdministrative>=new Array<PosteAdministrative>();
  departement:Departement;
  poste:PosteAdministrative;
  panelOpenState: boolean = false;
  agrade:AGrade=new AGrade();
  grade:Grade=new Grade();
  idPers:number;
  AGrades:Array<AGrade>=new Array<AGrade>();
  NewAGrades:Array<AGrade>=new Array<AGrade>();
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
  etatPersonnel:EtatPersonnel=new EtatPersonnel();
  contrats:Array<Contrat>=new Array<Contrat>();
  lang:string;
  constructor(public activatedRoute:ActivatedRoute,
    private agradeServices:AGradeServices,
    private gradeServices: GradeServices,
    private corpsServices: CorpsServices,
    private specialiteServices:SpecialiteServices,
    private enseignantContractuelService:EnseignantContractuelServices,
    private etatServices:EtatServices, 
    private toastr: ToastrService,
    private etatPersonnelServices:EtatPersonnelServices,
    private departementServices: DepartementServices,
    private diplomePersonnelServices: DiplomePersonnelServices,
    private diplomeServices:DiplomeServices,
    public http: Http,
    public dialog: MatDialog,
    public router: Router)
  {
    this.idPers=activatedRoute.snapshot.params['idPers'];
  }

  ngOnInit() {
    this.enseignantContractuelService.getEnseignantContractuel(this.idPers)
      .subscribe(data=>{
        this.enseignantP=data;
       this.departement=this.enseignantP.departement;
       this.specialite=this.enseignantP.specialite;
       this.etat=this.enseignantP.etat;
        this.chercherAGrade(data);
        this.chercherDiplome(data);
        this.chercherEtatInactive(this.etat.idEtat);
      },err=>{
        console.log(err);
      });
    this.chercherDep();
    this.chercherGrad();
    this.chercherSpecialite();
    this.chercherDip();
    this.chercherEtats();
    
    this.lang=sessionStorage.getItem('lang');
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
  chercherAGrade(e:EnseignantContractuel)
  {
    this.agradeServices.getAGradesPersonnel(e.idPers)
    .subscribe(data=>{
      this.AGrades=data;
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  chercherDiplome(e:EnseignantContractuel)
  {
    this.diplomePersonnelServices.getPersonnelDiplome(e.idPers)
    .subscribe(data=>{
    this.diplomepers=data;
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  chercherContrat(e:EnseignantContractuel)
  {
   /*  this.enseignantContractuelService.ge(e.idPers)
    .subscribe(data=>{
    this.diplomepers=data;
      console.log(data);
    },err=>{
      console.log(err);
    }) */
  }
  updateEnseignant() {
    this.enseignantP.departement=this.departement;
    this.enseignantP.specialite=this.specialite;
    this.enseignantP.etat=this.etat;
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
    this.enseignantContractuelService.updateEnseignantContractuel(this.enseignantP)
      .subscribe(data=>{
        this.showSuccess();
        this.EnregistrerDiplomeP(data);
        this.EnregistrerAgrade(data);
        if(this.etat.libelleEtat=="non-actif" && this.etatPersonnel!=null)
        {
          this.updateEtatInactive(data);
        }
        else if(this.etat.libelleEtat=="non-actif" && this.etatPersonnel==null)
        {
          this.EnregistrerEtatPersonnel(data);
        }
        this.router.navigate(['/ListeEnseigContractuel']);
      },err=>{
        console.log(err);
        this.toastr.error("veuillez vérifier les informations saisies");
      });
    //this.EnregistrerAgrade();
  }
  Annuler()
  {
  this.router.navigate(['/ListeEnseigContractuel']);
  }
EnregistrerEtatPersonnel(en:EnseignantContractuel)
{this.etatPersonnel.personnel=en;
  this.etatPersonnel.etat=this.etat;
  //this.etatPersonnel.
  this.etatPersonnelServices.saveEtatPersonnel(this.etatPersonnel)
  .subscribe(data => {
    console.log("Success d'ajout etatPersonnel");
  }, err => {
    console.log(err);
  });

}
  updateEtatInactive(en:EnseignantContractuel)
  {this.etatPersonnel.personnel=en;
    this.etatPersonnel.etat=this.etat;
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
  ajouterDiplome()
  {
    this.diplomep=new DiplomePersonnel();
    this.diplomep.diplome=new Diplome();
    this.newdiplomes.push(this.diplomep);
   
  }
  ajouterGrade()
  {
    this.agrade=new AGrade();
    this.agrade.grade=new Grade();
    this.NewAGrades.push(this.agrade);
   
  }
 
  ModifierDiplome(d:DiplomePersonnel)
  {
    let dialogRef = this.dialog.open(DiplomePersonnelComponent, {data:{num:d.id_DipP}});
  }
  ModifierGrade(g:AGrade)
  {
    let dialogRef = this.dialog.open(AGradeComponent, {data:{num:g.id_agrade}});
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
  this.enseignantContractuelService.updateEnseignantContractuel(en)
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
  ajouterContrat()
  {
    
  }
}
