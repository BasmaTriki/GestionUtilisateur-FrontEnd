import { Component, OnInit } from '@angular/core';
import { Administratif } from '../../model/model.administratif';
import { Enfant } from '../../model/model.enfant';
import { ActivatedRoute, Router } from '@angular/router';
import { EnseignantPermanentServices } from '../../services/enseignantpermanent.services';
import { ImpressionServices } from '../../services/Impression.services';
import { EnfantServices } from '../../services/enfant.services';
import { DiplomePersonnelServices } from '../../services/diplomepersonnel.services';
import { AdministratifServices } from '../../services/administratif.services';
import { AGrade } from '../../model/model.agrade';
import { DiplomePersonnel } from '../../model/model.diplomepersonnel';
import { AGradeServices } from '../../services/agrade.services';

@Component({
  selector: 'app-detail-administratif',
  templateUrl: './detail-administratif.component.html',
  styleUrls: ['./detail-administratif.component.css']
})
export class DetailAdministratifComponent implements OnInit {
  AGrades:Array<AGrade>=new Array<AGrade>();
  enfants:Array<Enfant>=new Array<Enfant>();
  diplomepers:Array<DiplomePersonnel>=new Array<DiplomePersonnel>();
  administratif:Administratif=new Administratif();
 nbEnfant:number=0;
 idPers:number=0;
 nbdiplome:number=0;
 nbConge:number=0;
 motCle:string="accepte";
 currentPage:number=0;
 pages:Array<number>;
 size:number=5;
 nbGrade:number=0;
 lasteElement:number=0;
 age:number=0;
 dateNew:any;
 lang:string="";
 nom:string="";
  constructor(public activatedRoute:ActivatedRoute,
  public enseignantpService:EnseignantPermanentServices,
  public imprimerService:ImpressionServices,
  public router:Router,
  private enfantservice:EnfantServices,
  private agradeServices:AGradeServices,
  private administratifServices:AdministratifServices,
  private diplomePersonnelServices:DiplomePersonnelServices)
  { 
    this.idPers=this.activatedRoute.snapshot.params['idPers'];
    this.lang=sessionStorage.getItem("lang");
  }

  ngOnInit() {
    
    this.administratifServices.getAdministratif(this.idPers)
      .subscribe(data=> {
        this.administratif = data;
        this.chercherAGrade(data);
        this.chercherDiplome(data);
        console.log(this.administratif.datenaissance);
        if(this.lang==="fr")
        {
          this.nom=this.administratif.prenom+" "+this.administratif.nom;
        }
        else
        {
          this.nom=this.administratif.prenomAr+" "+this.administratif.nomAr;
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
      this.nbEnfant=this.enfants.length;
    },err=>{
      console.log(err);
    })
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
  chercherAGrade(e:Administratif)
  {
    this.agradeServices.getAGradesPersonnel(e.idPers)
    .subscribe(data=>{
      this.AGrades=data;
      this.nbGrade=this.AGrades.length;
     this.AGrades
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  chercherDiplome(e:Administratif)
  {
    this.diplomePersonnelServices.getPersonnelDiplome(e.idPers)
    .subscribe(data=>{
    this.diplomepers=data;
    this.nbdiplome=this.diplomepers.length;
    },err=>{
      console.log(err);
    })
  }
}
