import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';
import { EnseignantPermanentServices } from '../../services/enseignantpermanent.services';
import { Router } from '../../../node_modules/@angular/router';
import { ImpressionServices } from '../../services/Impression.services';
import { DepartementServices } from '../../services/departement.services';
import { CorpsServices } from '../../services/corps.services';
import { GradeServices } from '../../services/grade.services';
import { Departement } from '../../model/model.departement';
import { Grade } from '../../model/model.grade';
import { Corps } from '../../model/model.corps';
import { SemestreServices } from '../../services/semestre.services';
import { Semestre } from '../../model/model.semestre';
import { DatePipe } from '@angular/common';
import { EnseignantPermanent } from '../../model/model.enseignantpermanent';
import { CongeServices } from '../../services/conge.services';
import { Conge } from '../../model/model.conge';
import { TypeConge } from '../../model/model.typeConge';
import { TypeCongeServices } from '../../services/typeConge.services';

@Component({
  selector: 'app-liste-etat',
  templateUrl: './liste-etat.component.html',
  styleUrls: ['./liste-etat.component.css'],
  providers: [DatePipe]
})
export class ListeEtatComponent implements OnInit {
  mois:number=0;
  annee:number=0;
  type:string="";
  lang="";
  departements: Array<Departement> = new Array<Departement>();
  grades: Array<Grade> = new Array<Grade>();
  corps: Array<Corps> = new Array<Corps>();
  departement:Departement=new Departement();
  grade:Grade=new Grade();
  corp:Corps=new Corps();
  semestre:Semestre=new Semestre();
  semestres:Array<Semestre>=new Array<Semestre>();
  date:any;
  enseignantPermanents:Array<EnseignantPermanent>=new Array<EnseignantPermanent>();
  conges:Array<Conge>=new Array<Conge>();
  conge:Conge=new Conge();
  typeConge:TypeConge=new TypeConge();
  constructor(public http:HttpClient,
    public dialogRef: MatDialogRef<ListeEtatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private impressionServices:ImpressionServices,
    private departementServices:DepartementServices,
    private corpsServices:CorpsServices,
    private gradeServices:GradeServices,
    private semestreServices:SemestreServices,
    private datePipe: DatePipe,
    private typeCongeServices:TypeCongeServices,
    private enseingnantpermanentService:EnseignantPermanentServices,
    private congeServices:CongeServices,
    public router:Router) 
    {
      this.type=this.data.name;
      this.lang=sessionStorage.getItem("lang");
    }

  ngOnInit() {
    this.chercherCorp();
    this.chercherDep();
    this.chercherGrad();
    this.chercherSem();
  
    this.typeCongeServices.getTypeConge(1)
    .subscribe(data => {
      this.typeConge=data;
    }, err => {
      console.log(err);
    })
  }
  ImprimerDepartement()
  { this.date=this.datePipe.transform(new Date(),'yyyy');
  this.annee=+this.date;
  var anneeUniv=this.date+"/"+(this.annee+1);
  var msg="  السنة الجامعية "+anneeUniv;
    this.impressionServices.ImprimerListePersonnelDepartement(this.departement.idDep,msg)
    .subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }
  ImprimerGrade()
  {this.date=this.datePipe.transform(new Date(),'yyyy');
  this.annee=+this.date;
  var anneeUniv=this.date+"/"+(this.annee+1);
  var msg="  السنة الجامعية "+anneeUniv;
    this.impressionServices.ImprimerListePersonnelGrade(this.grade.id,msg)
    .subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }
  ImprimerCorps()
  {this.date=this.datePipe.transform(new Date(),'yyyy');
  this.annee=+this.date;
  var anneeUniv=this.date+"/"+(this.annee+1);
  var msg="  السنة الجامعية "+anneeUniv;
    this.impressionServices.ImprimerListePersonnelCorps(this.corp.idcps,msg)
    .subscribe(data => {
      console.log(data);
    }, err => {
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
ListeEnseignant()
{
  this.enseingnantpermanentService.getAllEnseignantPermanents()
  .subscribe(data=>{
    this.enseignantPermanents=data;
    console.log(data);
  },err=>{
    console.log(err);
  })
}
AffecterConge()
{this.ListeEnseignant();
  for(let e of this.enseignantPermanents)
  {
  this.congeServices.getPersonnelConge(e.idPers)
   .subscribe(data=>{
    this.conges=data;
    console.log(data);
  },err=>{
    console.log(err);
  })
  if(this.conges.length==0)
  {
this.conge.nbJour=0;
this.conge.personnel=e;
this.conge.dateDebut=new Date();
this.conge.dateFin=null;
this.conge.valide="prime de rendement";
this.conge.typeconge=this.typeConge;
this.congeServices.saveConge(this.conge)
.subscribe(data=>{
  this.conge=data;
  console.log(data);
},err=>{
  console.log(err);
})
this.conge=new Conge();
  }
  }
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
  chercherCorp()
  {
    this.corpsServices.allCorpss()
      .subscribe(data=>{
        this.corps=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  chercherSem()
  {
    this.semestreServices.getAllSemestre()
      .subscribe(data => {
        this.semestres = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  ImprimerPrime()
  { this.AffecterConge();
    var date1:any;
    var date2:any;
    this.date=this.datePipe.transform(new Date(),'yyyy');
    this.annee=+this.datePipe.transform(new Date(),'yyyy');
    var anneeUniv=this.date+"/"+(this.annee+1);
   
    if(this.semestre.idSem==1)
    {
      date1='12/01/'+(this.annee-1);
      date2='05/31/'+this.annee;
      var msg=" السداسي الأول من السنة الجامعية "+anneeUniv
      this.impressionServices.ImprimerPrimeRendement(msg,date1,date2)
      .subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
    }
    else
    {
    date1='06/01/'+this.annee;
    date2='11/30/'+this.annee;
    var msg=" السداسي الثاني من السنة الجامعية "+anneeUniv
    this.impressionServices.ImprimerPrimeRendement(msg,date1,date2)
    .subscribe(data => {
    console.log(data);
  }, err => {
    console.log(err);
  })

    }
    
  }
}
