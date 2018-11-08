import { Component, OnInit, Inject  } from '@angular/core';
import {Conge} from '../../model/model.conge';
import {CongeServices} from '../../services/conge.services';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeConge} from '../../model/model.typeConge';
import { TypeCongeServices } from '../../services/typeConge.services';
import {Personnel} from '../../model/model.personnel';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PersonnelServices } from '../../services/personnel.services';
@Component({
  selector: 'app-personnel-conge',
  templateUrl: './personnel-conge.component.html',
  styleUrls: ['./personnel-conge.component.css'],
  providers: [DatePipe]
})
export class PersonnelCongeComponent implements OnInit {
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
  idUser:number;
  congeValide:boolean=false;
  constructor(public activatedRoute:ActivatedRoute,
              public congeService:CongeServices,
              private typeCongeServices:TypeCongeServices,
              private personnelServices: PersonnelServices,
              private datePipe: DatePipe,
              private toastr: ToastrService,
              public http: HttpClient,
              public router:Router)
   {
  }

  ngOnInit() {
    if(sessionStorage.getItem('idUser')!=null)
    {
    this.idUser=Number(sessionStorage.getItem('idUser'));
    }
       this.lang=sessionStorage.getItem("lang");
       this.AfficherTypeConge();
       this.doSearch();
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
  onFileSelected(event)
{
  this.selectedFile=<File>event.target.files[0];
}
  EnregistrerConge(){
    this.conge.typeconge=this.typeconge;
    this.conge.personnel=this.personnel;
    this.conge.nbJour=this.nomberJour;
    this.conge.valide="en-attente";
    this.conge.valideAr="في الإنتظار";
    this.congeService.saveConge(this.conge)
      .subscribe(data=>{
        if(this.typeconge.libelleType==="Maladie"|| this.typeconge.libelleType==="Maladie Longue durée")
        {
          if(this.selectedFile!=null)
          this.upload(data.idCong);
        }
        this.router.navigate(['/personnelhistorique']);
      this.showSuccess();
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
  this.nomberJour=parseInt(this.CalculerNbjour()+"");
   this.NomberJour();
  this.restjour=parseInt((this.typeconge.nbMaxJrs-(this.Sommenbjour+this.nbjour))+"");
  if(this.Sommenbjour==null)
  {
    this.restjour=parseInt((this.typeconge.nbMaxJrs-this.nbjour)+"");
  }
  this.ValideConge();
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
    this.toastr.success("L'ajout de congé a été effectué avec succès");
  }
else
  {
    this.toastr.success("تم إضافة العطلة بنجاح");
  }
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
  if(this.restjour>=5)
  {
    return 'green';
  }
  else if(this.restjour<5)
  {
    return 'red';
  }
}
Annuler()
{
  this.router.navigate(['/personnelhistorique']);
}

}
