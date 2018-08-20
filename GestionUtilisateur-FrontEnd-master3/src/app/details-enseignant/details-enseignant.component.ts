import { Component, OnInit } from '@angular/core';
import {CongeServices} from "../../services/conge.services";
import {ActivatedRoute, Router} from "@angular/router";
import {EnseignantPermanentServices} from "../../services/enseignantpermanent.services";
import {EnseignantPermanent} from "../../model/model.enseignantpermanent";
import { AGrade } from '../../model/model.agrade';
import { Enfant } from '../../model/model.enfant';
import { DiplomePersonnel } from '../../model/model.diplomepersonnel';
import { EnfantServices } from '../../services/enfant.services';
import { AGradeServices } from '../../services/agrade.services';
import { DiplomePersonnelServices } from '../../services/diplomepersonnel.services';

@Component({
  selector: 'app-details-enseignant',
  templateUrl: './details-enseignant.component.html',
  styleUrls: ['./details-enseignant.component.css']
})
export class DetailsEnseignantComponent implements OnInit {
  AGrades:Array<AGrade>=new Array<AGrade>();
  enfants:Array<Enfant>=new Array<Enfant>();
  diplomepers:Array<DiplomePersonnel>=new Array<DiplomePersonnel>();
  enseignantP:EnseignantPermanent=new EnseignantPermanent();
 nbEnfant:number=0;
 matricule:number=0;
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
  constructor(public activatedRoute:ActivatedRoute,
              public enseignantpService:EnseignantPermanentServices,
              public router:Router,
              private enfantservice:EnfantServices,
              private agradeServices:AGradeServices,
              private diplomePersonnelServices:DiplomePersonnelServices,
              private congeServices:CongeServices) 
              {
this.matricule=this.activatedRoute.snapshot.params['idPers'];
               }

  ngOnInit() {
    
    this.enseignantpService.getEnseignantPermanent(this.matricule)
      .subscribe(data=> {
        this.enseignantP = data;
        this.chercherAGrade(data);
        this.chercherDiplome(data);
      },err=>{
        console.log(err);
      })
      this.chercherEnfant();
      this.chercherConge(); 
      this.dateNew =new Date();
      console.log(this.dateNew);
      console.log(this.enseignantP.datenaissance);
      //this.age=this.dateNew -(this.enseignantP.datenaissance);
      console.log(this.age);
    }
    chercherEnfant()
    {
      this.enfantservice.getEnfantsPersonnel(this.matricule)
      .subscribe(data=>{
        this.enfants=data;
        this.nbEnfant=this.enfants.length;
      },err=>{
        console.log(err);
      })
    }
    chercherAGrade(e:EnseignantPermanent)
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
    chercherDiplome(e:EnseignantPermanent)
    {
      this.diplomePersonnelServices.getPersonnelDiplome(e.idPers)
      .subscribe(data=>{
      this.diplomepers=data;
      this.nbdiplome=this.diplomepers.length;
      },err=>{
        console.log(err);
      })
    }
    chercherConge()
    {
      this.congeServices.getCongesPersonnel(this.matricule,this.currentPage,this.size)
      .subscribe(data=>{
       this.nbConge=data.totalElements;
      },err=>{
        console.log(err);
      })
    }
}
