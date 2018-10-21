import { Component, OnInit,Inject } from '@angular/core';
import { Personnel } from '../../model/model.personnel';
import { HttpClient } from '@angular/common/http';
import { PersonnelServices } from '../../services/personnel.services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { CongeServices } from '../../services/conge.services';
import { Departement } from '../../model/model.departement';
import { DepartementServices } from '../../services/departement.services';
import { EnseignantPermanentServices } from '../../services/enseignantpermanent.services';
import { TypeCongeServices } from '../../services/typeConge.services';
import { TypeConge } from '../../model/model.typeConge';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-conge-mensuel',
  templateUrl: './conge-mensuel.component.html',
  styleUrls: ['./conge-mensuel.component.css'],
  providers: [DatePipe]
})
export class CongeMensuelComponent implements OnInit {
  personnel:Personnel=new Personnel();
  personnels:Array<Personnel>=new Array<Personnel>();
  dateConge:Date;
  mois:number=0;
  annee:number=0;
  type:string="";
  typeConge:TypeConge=new TypeConge();
  typeConges:Array<TypeConge>=new Array<TypeConge>();
  lang="";
  constructor(public http:HttpClient,
    public dialogRef: MatDialogRef<CongeMensuelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public personnelServices:PersonnelServices,
    private congeServices:CongeServices,
    private typeServices:TypeCongeServices,
    private enseingnantpermanentService:EnseignantPermanentServices,
    private datePipe: DatePipe,
    public router:Router) 
    {
      this.type=this.data.name;
      this.lang=sessionStorage.getItem("lang");
     }

  ngOnInit() {
    this.AfficherPersonnel();
    this.chercherType();
  }
  AfficherPersonnel()
  {
    this.personnelServices.getAllPersonnel()
    //getPersonnelsLogin(1)
      .subscribe(data=>{
      this.personnels=data;
      },err=>{
        console.log(err);
      });
  }
  Imprimer()
  {console.log(this.dateConge);
   
    this.mois=+this.datePipe.transform(this.dateConge,'MM');
    this.annee=+this.datePipe.transform(this.dateConge,'yyyy');
    console.log(this.annee);
    console.log(this.mois);
    this.congeServices.Imprimer(this.mois,this.annee)
    .subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  ImprimerPers()
  {
    this.congeServices.ImprimerCongePersonnel(this.personnel.idPers)
    .subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  Imprimertype()
  { this.mois=+this.datePipe.transform(this.dateConge,'MM');
  this.annee=+this.datePipe.transform(this.dateConge,'yyyy');
    this.congeServices.ImprimerCongeType(this.mois,this.annee,this.typeConge.idCg)
    .subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  chercherType()
  {
    this.typeServices.allTypesConges()
      .subscribe(data=>{
        this.typeConges=data;
      },err=>{
        console.log(err);
      })
  }
  Close()
  {
    this.dialogRef.close();
   
  }
}
