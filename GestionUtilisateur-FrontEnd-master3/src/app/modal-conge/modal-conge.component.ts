import { Component, OnInit, Inject } from '@angular/core';
import { CongeServices } from '../../services/conge.services';
import { TypeCongeServices } from '../../services/typeConge.services';
import { PersonnelServices } from '../../services/personnel.services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Conge } from '../../model/model.conge';
import { Personnel } from '../../model/model.personnel';
import { TypeConge } from '../../model/model.typeConge';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-conge',
  templateUrl: './modal-conge.component.html',
  styleUrls: ['./modal-conge.component.css']
})
export class ModalCongeComponent implements OnInit {
  pageConge:any;
  currentPage:number=0;
  pages:Array<number>;
  size:number=5;
  conge:Conge= new Conge();
  personnel:Personnel;
  pagePersonnels:any;
  typeconge:TypeConge=new TypeConge();
  typeconges:Array<TypeConge> =new Array<TypeConge>();
  nbjour:number=0;
  nbjourRest:number=0;
  Sommenbjour:number;
  nom:string="";
  idPers:number=0;
selectedFile:File=null;
  constructor(private congeServices:CongeServices, 
    private typeCongeServices:TypeCongeServices,
    private personnelServices: PersonnelServices,
    public dialogRef: MatDialogRef<ModalCongeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router:Router,
    public http: HttpClient) { }

  ngOnInit() {
    this.AfficherTypeConge();
    this.nom=this.data.name;
    this.idPers=Number(this.data.idPers);
    this.personnelServices.getPersonnel(this.idPers)
    .subscribe(data=>{
      this.personnel=data;
    },err=>{
      console.log(err);
    });
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
  {if(this.conge.dateFin!=null && this.conge.dateDebut!=null)
    {this.nbjour=((Number(this.conge.dateFin) - Number(this.conge.dateDebut))/86400000)+1;
      console.log(this.nbjour);
    return this.nbjour;
  }
  else
    return 0;
  }
  NomberJour()
  {var somme:number=0;
    if(this.typeconge)
    {
      this.congeServices.getNbJourParType(this.personnel.idPers,this.typeconge.idCg)
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
  CalculerResteJour()
  {
    if(this.conge.dateFin!=null && this.conge.dateDebut!=null)
  {
    this.congeServices.getNbJourParType(this.personnel.idPers,this.typeconge.idCg)
      .subscribe(data=>{
       this.Sommenbjour=data;
       //alert ("Il vous Reste "+this.nbjourRest);
        console.log(data+" Marwa ");
      },err=>{
        console.log(err);
      });
    }
   return this.Sommenbjour;
  }
  Close()
  {
    this.dialogRef.close();
  }
  ajouter(){
    this.conge.typeconge=this.typeconge;
    this.conge.personnel=this.personnel;
    this.conge.nbJour=this.nbjour;
    this.conge.valide="en-attente";
    this.conge.valideAr="في الإنتظار";
    this.conge.dateCreationConge=new Date();
    this.congeServices.saveConge(this.conge)
      .subscribe(data=>{
        alert("Succès d'ajout");
        console.log(data);
        this.personnel.conges.push(data);
        this.personnelServices.updatePersonnel(this.personnel);
        if(this.typeconge.libelleType==="Maladie")
        {
          this.upload(data.idCong);
        }
        console.log(data);
      },err=>{
        console.log(err);
      });
      this.Close();
  }
onFileSelected(event)
{
  this.selectedFile=<File>event.target.files[0];
}
upload(idCong:number)
{
  const fb=new FormData();
  fb.append('uploadfile',this.selectedFile,this.selectedFile.name);
 this.http.post("http://localhost:8080/uploadFile/"+idCong,fb)
 .subscribe(res=>{
   console.log(res);
 })
}
nomberJour:any;
restjour:any;
onSelected1(event)
{ if(this.restjour)
  {
  this.nomberJour=this.CalculerNbjour();
  this.Sommenbjour=this.CalculerResteJour();
  this.restjour=this.typeconge.nbMaxJrs-(this.Sommenbjour+this.nbjour)
  }

//console.log(event);

}
onSelected(event)
{ 
  this.nomberJour=this.CalculerNbjour();
  //this.CalculerResteJour();
 this.NomberJour();
  this.restjour=this.typeconge.nbMaxJrs-(this.Sommenbjour+this.nbjour);
  if(this.Sommenbjour==null)
  {
    this.restjour=this.typeconge.nbMaxJrs-this.nbjour;
  }
  console.log(event+" "+this.Sommenbjour+"   "+this.nomberJour);
 // this.restjour =this.typeconge.nbMaxJrs-(this.Sommenbjour+this.nomberJour);
 
}
}
