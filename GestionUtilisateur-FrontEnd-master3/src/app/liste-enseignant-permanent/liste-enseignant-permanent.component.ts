import { Component, OnInit, ChangeDetectorRef,ViewChild, OnDestroy } from '@angular/core';
import {EnseignantPermanentServices} from "../../services/enseignantpermanent.services";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {EnseignantPermanent} from "../../model/model.enseignantpermanent";
import { AdministratifServices } from '../../services/administratif.services';
import { Departement } from '../../model/model.departement';
import { DepartementServices } from '../../services/departement.services';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { PersonnelServices } from '../../services/personnel.services';

@Component({
  selector: 'app-liste-enseignant-permanent',
  templateUrl: './liste-enseignant-permanent.component.html',
  styleUrls: ['./liste-enseignant-permanent.component.css']
})
export class ListeEnseignantPermanentComponent implements OnInit {
  enseignantPs:Array<EnseignantPermanent> = new Array<EnseignantPermanent>();
  pages: Array<number>;
  pageEnseignant:any;
  motCle:string="";
  currentPage:number=0;
  size:number=2000;
  departement:Departement=new Departement();
  departements:Array<Departement>=new Array<Departement>();
  motCle1:string="";
  currentPageA:number=0;
  pagesA:Array<number>;
  pageAdministratif:any;
  dataTable: any;
  lang:string;
  constructor(private departementServices:DepartementServices,
    private adminService:AdministratifServices,
    private enseingnantpermanentService:EnseignantPermanentServices,
    private personnelServices:PersonnelServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient, public router: Router) 
    { 
     // this.dataSource = new MatTableDataSource();
     this.lang=sessionStorage.getItem("lang");
    }

  ngOnInit() {
   this.chercherDepartement();
   this.doSearchEng();
  }
  doSearchEng()
  { 
     this.enseingnantpermanentService.getEnseignantPermanents(this.motCle,this.currentPage,this.size)
        .subscribe((data: any[]) => {
          this.pageEnseignant = data;
          console.log(data);
          // You'll have to wait that changeDetection occurs and projects data into 
          // the HTML template, you can ask Angular to that for you ;-)
          this.chRef.detectChanges();
          // Now you can use jQuery DataTables :
          const table: any = $('table');
          this.dataTable = table.DataTable();   
      },err=>{
        console.log(err);
      })
  }
  onEditEnseignant(idPers:number){
    this.router.navigate(['EditEnseignantP',idPers]);
  }
  onDetailsEnseignant(idPers:number) {
    this.router.navigate(['DetailsEnseignantP',idPers]);
  }

  chercherDepartement()
  {
    this.departementServices.allDepartements()
      .subscribe(data=>{
        this.departements=data;
        this.pages=new Array(data.totalPages);
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  Imprimer(idPers:number,sexe:string)
  {
this.personnelServices.ImprimerAttestation(idPers,sexe)
.subscribe(data=>{
  console.log(data);
},err=>{
  console.log(err);
})
  }
}
