import { Component, OnInit } from '@angular/core';
import { AGrade } from '../../model/model.agrade';
import { Enfant } from '../../model/model.enfant';
import { DiplomePersonnel } from '../../model/model.diplomepersonnel';
import { ActivatedRoute, Router } from '@angular/router';
import { ImpressionServices } from '../../services/Impression.services';
import { EnfantServices } from '../../services/enfant.services';
import { AGradeServices } from '../../services/agrade.services';
import { DiplomePersonnelServices } from '../../services/diplomepersonnel.services';
import { EnseignantFonctionnaireEtat } from '../../model/model.enseignantFonctEtat';
import { EnseignantFonctionnaireEtatServices } from '../../services/enseignantFonctionnaireEtat.services';
import { ChargeSemestreServices } from '../../services/chargeSem.services';
import { EtatPersonnelServices } from '../../services/etatPersonnel.services';
import { ChargeSem } from '../../model/model.chargeSem';

@Component({
  selector: 'app-details-fonctionnaire',
  templateUrl: './details-fonctionnaire.component.html',
  styleUrls: ['./details-fonctionnaire.component.css']
})
export class DetailsFonctionnaireComponent implements OnInit {
  AGrades:Array<AGrade>=new Array<AGrade>();
  enfants:Array<Enfant>=new Array<Enfant>();
  diplomepers:Array<DiplomePersonnel>=new Array<DiplomePersonnel>();
  enseignantF:EnseignantFonctionnaireEtat=new EnseignantFonctionnaireEtat();
 idPers:number=0;
 dateNew:any;
 lang:string="";
 nom:string="";
 chargeSems:Array<ChargeSem>=new Array<ChargeSem>();
  constructor(public activatedRoute:ActivatedRoute,
              public enseignantFService:EnseignantFonctionnaireEtatServices,
              public imprimerService:ImpressionServices,
              public router:Router,
              private chargeSemestreService:ChargeSemestreServices,
              private etatPersonnelServices:EtatPersonnelServices,
              private enfantservice:EnfantServices,
              private agradeServices:AGradeServices,
              private diplomePersonnelServices:DiplomePersonnelServices) 
              {
this.idPers=this.activatedRoute.snapshot.params['idPers'];
this.lang=sessionStorage.getItem("lang");
               }

  ngOnInit() {
    
    this.enseignantFService.getEnseignantFonctionnaireEtat(this.idPers)
      .subscribe(data=> {
        this.enseignantF = data;
        this.chercherAGrade(data);
        this.chercherDiplome(data);
        console.log(this.enseignantF.datenaissance);
        if(this.lang==="fr")
        {
          this.nom=this.enseignantF.prenom+" "+this.enseignantF.nom;
        }
        else
        {
          this.nom=this.enseignantF.prenomAr+" "+this.enseignantF.nomAr;
        }
      },err=>{
        console.log(err);
      })
      this.chercherEnfant();
     
    }
    chercherEnfant()
    {
      this.enfantservice.getEnfantsPersonnel(this.idPers)
      .subscribe(data=>{
        this.enfants=data;
      },err=>{
        console.log(err);
      })
    }
    modifier(idPers:number)
    {
      this.router.navigate(['EditEnseignantF',idPers]);
    }
    ImprimerFichePersonnel(idPers:number)
    {
      this.imprimerService.ImprimerFichePersonnel(idPers)
      .subscribe(data=>{
        console.log(data);
      },err=>{
        console.log(err);
      })
    }
    chercherAGrade(e:EnseignantFonctionnaireEtat)
    {
      this.agradeServices.getAGradesPersonnel(e.idPers)
      .subscribe(data=>{
        this.AGrades=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
    }
    chercherDiplome(e:EnseignantFonctionnaireEtat)
    {
      this.diplomePersonnelServices.getPersonnelDiplome(e.idPers)
      .subscribe(data=>{
      this.diplomepers=data;
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
}
