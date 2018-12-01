import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Conge} from "../../model/model.conge";
import {Http} from "@angular/http";
import {CongeServices} from "../../services/conge.services";
import {Router, ActivatedRoute} from "@angular/router";
import {PersonnelServices} from "../../services/personnel.services";
import {Personnel} from "../../model/model.personnel";
import { RepriseCongeComponent } from '../reprise-conge/reprise-conge.component';
import { MatDialog } from '@angular/material';
import { EditCongeComponent } from '../edit-conge/edit-conge.component';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
import { ImpressionServices } from '../../services/Impression.services';
import { DatePipe } from '@angular/common';
import { Timestamp } from 'rxjs';
import { timestamp } from 'rxjs/operators';
@Component({
  selector: 'app-historique-conge',
  templateUrl: './historique-conge.component.html',
  styleUrls: ['./historique-conge.component.css'],
  providers: [DatePipe]
})
export class HistoriqueCongeComponent implements OnInit {
  conges:Array<Conge>=new Array<Conge>();
  pageConge:any;
  motCle:string="accepte";
  currentPage:number=0;
  pages:Array<number>;
  size:number=1000;
  conge:Conge= new Conge();
  personnel:Personnel=new Personnel();
  personnels:Array<Personnel>=new Array<Personnel>();
  idPers:number;
  dataTable: any;
  //canReprise:boolean=false;
  nom:string;
  lang:string;
  congeModifiable:boolean=false;
  date:any;
  constructor(private congeServices:CongeServices,
    public activatedRoute:ActivatedRoute,
    public personnelService:PersonnelServices,
    private datePipe: DatePipe,
    public imprimerService:ImpressionServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    public dialog: MatDialog,
    public router:Router) 
    {
      this.idPers=activatedRoute.snapshot.params['idPers'];
      this.lang=sessionStorage.getItem("lang");
     }

  ngOnInit() {
    this.personnelService.getPersonnel(this.idPers)
    .subscribe(data=>{
      this.personnel=data;
      if(this.lang=="fr")
    {
      this.nom=this.personnel.prenom+" "+this.personnel.nom;  
    }
    else
    {
      this.nom=this.personnel.prenomAr+" "+this.personnel.nomAr;
    }
      console.log(data);
    },err=>{
      console.log(err);
    });
    this.doSearch();
  }
  doSearch(){
    this.congeServices.getCongesPersonnel(this.idPers,this.currentPage,this.size)
    .subscribe((data: any[]) => {
      this.pageConge=data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
      },err=>{
        console.log(err);
      })
  }
  gotopage(i:number)
  {
    this.currentPage=i;
    this.doSearch();
  }
  RepriseConge(c:Conge)
  {
    let dialogRef = this.dialog.open(RepriseCongeComponent, {data:{name:c.idCong}});
    this.doSearch();
  }
  RepriseResultat(reprise:boolean)
  {
    if(this.lang=="fr")
    {
      if(reprise)
      {
        return "Oui";
      }
      else
      return "Non";
    }
    if(this.lang=="ar")
    {
      if(reprise)
      {
        return "نعم";
      }
      else
      return "لا";
    }
   
  }
  CanReprise(c:Conge)
  {
    if(c.valide=="en-attente")
  {
    return true;
  }
  else if(c.valide=="refuse")
  {
    return true;
  }
  else if(c.reprise)
  {
    return true
  }
  else
  {
    return false
  }
  }
  ImprimerReprise(c:Conge)
  {
    this.imprimerService.ImprimerRepriseMaladie(c.idCong)
    .subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  CanModifier(c:Conge)
  {this.date=this.datePipe.transform(c.dateFin,'MM/dd/yyyy');
  var dateNew=this.datePipe.transform(new Date(),'MM/dd/yyyy');
   if(this.date>=dateNew)
  {
  return true;
  }
  else
  {
    return false;
  }
  }
  onEditConge(c:Conge)
  {
     let dialogRef = this.dialog.open(EditCongeComponent, {data:{name:this.nom,idCong:c.idCong}});
     dialogRef.afterClosed()
     {
     // window.location.reload();
     }
     //window.location.reload();
  }

}
