import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Personnel } from '../../model/model.personnel';
import { Conge } from '../../model/model.conge';
import { TypeConge } from '../../model/model.typeConge';
import { CongeServices } from '../../services/conge.services';
import { TypeCongeServices } from '../../services/typeConge.services';
import { PersonnelServices } from '../../services/personnel.services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-conge-personnel',
  templateUrl: './conge-personnel.component.html',
  styleUrls: ['./conge-personnel.component.css'],
  providers: [DatePipe]
})
export class CongePersonnelComponent implements OnInit {
  idUser:number=0;
  pageConge:any;
  conge:Conge= new Conge();
  personnel:Personnel;
  pagePersonnels:any;
  typeconge:TypeConge=new TypeConge();
  typeconges:Array<TypeConge> =new Array<TypeConge>();
  nbjour:number;
  nbjourRest:number;
  Sommenbjour:number;
  nom:string="";
  selectedFile:File=null;
  lang="";
   year:number;
   congeValide:boolean=false;
   nomberJour:number;
   restjour:number;
  constructor(private congeServices:CongeServices, 
    private typeCongeServices:TypeCongeServices,
    public http: HttpClient,
    private datePipe: DatePipe,
    private personnelServices: PersonnelServices) 
    {
      this.lang=sessionStorage.getItem("lang");
     }

  ngOnInit() {
    if(sessionStorage.getItem('idUser')!=null)
    {
    this.idUser=Number(sessionStorage.getItem('idUser'));
    }
    this.doSearch();
    this.AfficherTypeConge();
  }
  doSearch()
  {
  this.personnelServices.getPersonnel(this.idUser)
  .subscribe(data=>{
    this.personnel=data;
    if(this.lang=='fr')
    {
      this.nom=this.personnel.prenom+" "+this.personnel.nom;
    }
    if(this.lang=='ar')
    {
      this.nom=this.personnel.prenomAr+" "+this.personnel.nomAr;
    }
    
    console.log(data);
  },err=>{
    console.log(err);
  })
}
AfficherTypeConge()
{
  this.typeCongeServices.allTypesConges()
    .subscribe(data=>{
      this.typeconges=data;
      console.log(data);
    },err=>{
      console.log(err);
    });
}
CalculerNbjour()
{ console.log(this.conge.dateFin);
  console.log(this.conge.dateDebut);
  if(this.conge.dateFin!=null && this.conge.dateDebut!=null)
  {this.nbjour=((Number(this.conge.dateFin) - Number(this.conge.dateDebut))/86400000)+1;
  return parseInt(this.nbjour+"");
}
else
  return 0;
}
NomberJour()
{this.year=+this.datePipe.transform(new Date(),'yyyy');
  var somme:number=0;
  if(this.typeconge)
  {
    this.congeServices.getNbJourParType(this.personnel.idPers,this.typeconge.idCg,this.year)
    .subscribe(data=>{
    this.Sommenbjour=data;
    somme= data;
    //alert ("Il vous Reste "+somme);
    console.log("il reste "+somme);
    },err=>{
      console.log(err);
    });
  }
   
      return somme;
}
ajouter(){
  this.conge.typeconge=this.typeconge;
  this.conge.personnel=this.personnel;
  this.conge.nbJour=this.nomberJour;
  this.conge.valide="en-attente";
  this.conge.valideAr="في الإنتظار";
  this.conge.dateCreationConge=new Date();
  console.log(this.conge.dateFin);
  console.log(this.conge.dateDebut);
  this.congeServices.saveConge(this.conge)
    .subscribe(data=>{
      alert("Succès d'ajout");
      console.log(data);
      this.personnel.conges.push(data);
      this.personnelServices.updatePersonnel(this.personnel);
      if(this.typeconge.libelleType==="Maladie"|| this.typeconge.libelleType==="Maladie Longue durée")
      {
        this.upload(data.idCong);
      }
      console.log(data);
    },err=>{
      console.log(err);
    });
}
onFileSelected(event)
{
this.selectedFile=<File>event.target.files[0];
}
upload(idCong:number)
{
const fb=new FormData();
fb.append('upload',this.selectedFile,this.selectedFile.name);
this.http.post("http://localhost:8080/uploadCertificat/"+idCong,fb)
.subscribe(res=>{
 console.log(res);
})
}

onSelected(event)
{ 
this.nomberJour=parseInt(this.CalculerNbjour()+"");
 this.NomberJour();
this.restjour=parseInt((this.typeconge.nbMaxJrs-(this.Sommenbjour+this.nbjour))+"");
if(this.Sommenbjour==null)
{
  this.restjour=+(this.typeconge.nbMaxJrs-this.nbjour);
}
this.ValideConge();
// this.restjour =this.typeconge.nbMaxJrs-(this.Sommenbjour+this.nomberJour) 
}
ValideConge()
{
if(this.restjour>=0)
{
  this.congeValide=true;
}
else
{
  this.congeValide=false;
}
}
getColor()
{
if(this.restjour>5)
{
  return 'green';
}
else if(this.restjour<5)
{
  return 'red';
}
}
}
