import { Component, OnInit } from '@angular/core';
import { AGrade } from '../../model/model.agrade';
import { Enfant } from '../../model/model.enfant';
import { DiplomePersonnel } from '../../model/model.diplomepersonnel';
import { ActivatedRoute, Router } from '@angular/router';
import { EnseignantLibreServices } from '../../services/enseignantlibre.services';
import { ImpressionServices } from '../../services/Impression.services';
import { EnfantServices } from '../../services/enfant.services';
import { AGradeServices } from '../../services/agrade.services';
import { DiplomePersonnelServices } from '../../services/diplomepersonnel.services';
import { EnseignantLibre } from '../../model/model.enseignantLibre';
import { HttpClient } from '@angular/common/http';
import { ChargeSem } from '../../model/model.chargeSem';
import { ChargeSemestreServices } from '../../services/chargeSem.services';
import { EtatPersonnelServices } from '../../services/etatPersonnel.services';

@Component({
  selector: 'app-details-libre',
  templateUrl: './details-libre.component.html',
  styleUrls: ['./details-libre.component.css']
})
export class DetailsLibreComponent implements OnInit {
  AGrades:Array<AGrade>=new Array<AGrade>();
  enfants:Array<Enfant>=new Array<Enfant>();
  diplomepers:Array<DiplomePersonnel>=new Array<DiplomePersonnel>();
  enseignantL:EnseignantLibre=new EnseignantLibre();
 idPers:number=0;
 dateNew:any;
 lang:string="";
 nom:string="";
 chargeSems:Array<ChargeSem>=new Array<ChargeSem>();
  constructor(public activatedRoute:ActivatedRoute,
              public enseignantLService:EnseignantLibreServices,
              public imprimerService:ImpressionServices,
              public router:Router,
              public http:HttpClient,
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
    
    this.enseignantLService.getEnseignantLibre(this.idPers)
      .subscribe(data=> {
        this.enseignantL = data;
        this.chercherAGrade(data);
        this.chercherDiplome(data);
        this.chercherChargeSem(data);
        if(this.lang==="fr")
        {
          this.nom=this.enseignantL.prenom+" "+this.enseignantL.nom;
        }
        else
        {
          this.nom=this.enseignantL.prenomAr+" "+this.enseignantL.nomAr;
        }
      },err=>{
        console.log(err);
      })
      this.chercherEnfant();
     
    }
    modifier(idPers:number)
    {
      this.router.navigate(['/editVacationLibre',idPers]);
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
    chercherAGrade(e:EnseignantLibre)
    {
      this.agradeServices.getAGradesPersonnel(e.idPers)
      .subscribe(data=>{
        this.AGrades=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
    }
    chercherDiplome(e:EnseignantLibre)
    {
      this.diplomePersonnelServices.getPersonnelDiplome(e.idPers)
      .subscribe(data=>{
      this.diplomepers=data;
      },err=>{
        console.log(err);
      })
    }
    chercherChargeSem(e:EnseignantLibre)
    {
      this.chargeSemestreService.getChargeEnseignant(e.idPers)
      .subscribe(data=>{
      this.chargeSems=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
    }
    downloadDiplomes(idPers:number)
    {
      this.http.get("http://localhost:8080/downloadDiplomesEnseignant/"+idPers)
     .subscribe(res=>{
       console.log(res);
     })
    }
    downloadDeclarartionA(idPers:number)
    {
      this.http.get("http://localhost:8080/downloadDeclaration/"+idPers)
     .subscribe(res=>{
       console.log(res);
     })
    }
}
