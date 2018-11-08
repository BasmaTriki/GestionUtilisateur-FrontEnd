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
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-conge',
  templateUrl: './modal-conge.component.html',
  styleUrls: ['./modal-conge.component.css'],
  providers: [DatePipe]
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
  year:number;
selectedFile:File=null;
lang:string;
congeValide:boolean=false;
nomberJour:number;
restjour:number;
  constructor(private congeServices:CongeServices, 
    private typeCongeServices:TypeCongeServices,
    private personnelServices: PersonnelServices,
    public dialogRef: MatDialogRef<ModalCongeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    public router:Router,
    private datePipe: DatePipe,
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
    this.lang=sessionStorage.getItem("lang");
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
      console.log(this.conge.dateFin);
      console.log(this.conge.dateDebut);
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
  Close()
  {
    this.dialogRef.close();
  }
  ajouter(){
    this.conge.typeconge=this.typeconge;
    this.conge.personnel=this.personnel;
    this.conge.nbJour=this.nomberJour;
    this.conge.valide="en-attente";
    this.conge.valideAr="في الإنتظار";
    this.conge.dateCreationConge=new Date();
    this.congeServices.saveConge(this.conge)
      .subscribe(data=>{
       this.showSuccess();
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
        this.toastr.error("Veuillez vérifier les informations saisies");
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
  fb.append('upload',this.selectedFile,this.selectedFile.name);
  this.http.post("http://localhost:8080/uploadCertificat/"+idCong,fb)
 .subscribe(res=>{
   console.log(res);
 })
}
showSuccess() {
  if(this.lang=='fr')
  {
    this.toastr.success("L'ajout de congé a été effectué avec succès");
  }
else
  {
    this.toastr.success("تم إضافة العطلة بنجاح");
  }
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
  if(this.restjour>=0 && this.typeconge!=null && this.conge.dateDebut!=null && this.conge.dateFin!=null && this.conge.nbJour!=0)
  {
    return true;
  }
  else
  {
    return false;
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
