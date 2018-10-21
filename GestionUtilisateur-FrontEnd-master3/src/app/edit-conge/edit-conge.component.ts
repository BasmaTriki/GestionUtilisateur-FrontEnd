import { Component, OnInit, Inject  } from '@angular/core';
import {Conge} from '../../model/model.conge';
import {CongeServices} from '../../services/conge.services';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeConge} from '../../model/model.typeConge';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TypeCongeServices } from '../../services/typeConge.services';
import {Personnel} from '../../model/model.personnel';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-conge',
  templateUrl: './edit-conge.component.html',
  styleUrls: ['./edit-conge.component.css'],
  providers: [DatePipe]
})
export class EditCongeComponent implements OnInit {
  mode:number=1;
  conge:Conge=new Conge();
  idCong:number=0;
  typeconge:TypeConge=new TypeConge();
  typeconges:Array<TypeConge> =new Array<TypeConge>();
  nbjour:number;
  nbjourRest:number;
  Sommenbjour:number;
  nomberJour:any;
  restjour:any;
  nom:string="";
  idPers:number=0;
  selectedFile:File=null;
  url:string="";
  lang:string;
  personnel:Personnel=new Personnel();
  typeModifiable:boolean=false;
  year:number;
  congeValide:boolean=false;
  constructor(public activatedRoute:ActivatedRoute,
              public congeService:CongeServices,
              public dialogRef: MatDialogRef<EditCongeComponent>,
              private typeCongeServices:TypeCongeServices,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private datePipe: DatePipe,
              private toastr: ToastrService,
              public http: HttpClient,
              public router:Router)
   {
    this.idCong=data.idCong;
  }

  ngOnInit() {
    this.congeService.getConge(this.idCong)
      .subscribe(data=> {
        this.conge = data;
        this.nomberJour=this.conge.nbJour;
        this.typeconge=this.conge.typeconge;
        this.personnel=this.conge.personnel;
        this.NomberJour();
        this.restjour=this.typeconge.nbMaxJrs-(this.Sommenbjour+this.nomberJour);
        if(this.Sommenbjour==null)
        {
          this.restjour=this.typeconge.nbMaxJrs-this.nomberJour;
        }
      },err=>{
        console.log(err);
      })
    
       this.lang=sessionStorage.getItem("lang");
       this.AfficherTypeConge();
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
  ModifierType()
  {
    this.typeModifiable=true;
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
  {this.year=+this.datePipe.transform(new Date(),'yyyy');
    var somme:number=0;
    if(this.typeconge)
    {
      this.congeService.getNbJourParType(this.personnel.idPers,this.typeconge.idCg,this.year)
      .subscribe(data=>{
      this.Sommenbjour=data;
      somme= data;
      //alert ("Il vous Reste "+somme);
      console.log("Il vous reste "+somme);
      },err=>{
        console.log(err);
      });
    }
     
        return somme;
}
  Close()
  {
    this.dialogRef.close();
  }
  onFileSelected(event)
{
  this.selectedFile=<File>event.target.files[0];
}
  updateConge(){
    this.conge.typeconge=this.typeconge;
    this.conge.personnel=this.personnel;
    this.conge.nbJour=this.nomberJour;
    this.conge.valide="en-attente";
    this.conge.valideAr="في الإنتظار";
    this.congeService.updateConge(this.conge)
      .subscribe(data=>{
        if(this.typeconge.libelleType==="Maladie"|| this.typeconge.libelleType==="Maladie Longue durée")
        {
          if(this.selectedFile!=null)
          this.upload(data.idCong);
        }
      this.showSuccess();
      this.Close();
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      })
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
  this.nomberJour=this.CalculerNbjour();
  //this.CalculerResteJour();
 this.NomberJour();
  this.restjour=this.typeconge.nbMaxJrs-(this.Sommenbjour+this.nomberJour);
  if(this.Sommenbjour==null)
  {
    this.restjour=this.typeconge.nbMaxJrs-this.nomberJour;
  }
  console.log(event+" "+this.Sommenbjour+"   "+this.nomberJour);
 // this.restjour =this.typeconge.nbMaxJrs-(this.Sommenbjour+this.nomberJour);
 this.ValideConge();
}
SupprimerConge()
{
let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.congeService.deleteConge(this.conge.idCong)
        .subscribe(data=> {
          console.log(data);
          this.Close();
        },err=>{
          console.log(err);
        })
}
}
download(idCong:number)
{
  this.http.get("http://localhost:8080/downloadCertificat/"+idCong)
 .subscribe(res=>{
   console.log(res);
 })
}
Certaficat(c:Conge)
{
  if(c.certaficat==null||c.certaficat=="")
  {
    return true;
  }
else
  {
    return false;
  }
}
showSuccess() {
  if(this.lang=='fr')
  {
    this.toastr.success("Mise à jour de congé effectuée");
  }
else
  {
    this.toastr.success("تم تحديث العطلة بنجاح");
  }
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
  if(this.restjour>=5)
  {
    return 'green';
  }
  else if(this.restjour<5)
  {
    return 'red';
  }
}
}

