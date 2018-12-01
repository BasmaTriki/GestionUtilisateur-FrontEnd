import { Component, OnInit, ChangeDetectorRef,ViewChild, OnDestroy } from '@angular/core';
import {EnseignantPermanentServices} from "../../services/enseignantpermanent.services";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {EnseignantPermanent} from "../../model/model.enseignantpermanent";
import { Departement } from '../../model/model.departement';
import { DepartementServices } from '../../services/departement.services';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { PersonnelServices } from '../../services/personnel.services';
import { ImpressionServices } from '../../services/Impression.services';
import { MatDialog } from '@angular/material';
import { ImprimerFicheComponent } from '../imprimer-fiche/imprimer-fiche.component';
import { ContratServices } from '../../services/contrat.services';
import { Contrat } from '../../model/model.Contrat';

@Component({
  selector: 'app-liste-enseignant-contractuel',
  templateUrl: './liste-enseignant-contractuel.component.html',
  styleUrls: ['./liste-enseignant-contractuel.component.css']
})
export class ListeEnseignantContractuelComponent implements OnInit {
  pages: Array<number>;
  pageContrats:any;
  motCle:string="";
  currentPage:number=0;
  size:number=2000;
  departement:Departement=new Departement();
  departements:Array<Departement>=new Array<Departement>();
  dataTable: any;
  lang:string;
  contrats:Array<Contrat>=new Array<Contrat>();
  constructor(private departementServices:DepartementServices,
    private imprimerServices:ImpressionServices,
    private contratServices:ContratServices,
    private chRef: ChangeDetectorRef,
    public dialog: MatDialog, 
    private http: HttpClient, public router: Router) 
    {
     this.lang=sessionStorage.getItem("lang");
    }

  ngOnInit() {
   this.doSearchEng();
  }
  doSearchEng()
  { 
     this.contratServices.getContrats(this.motCle,this.currentPage,this.size)
        .subscribe((data: any[]) => {
          this.pageContrats = data;
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
    this.router.navigate(['EditEnseignantContractuel',idPers]);
  }
  onDetailsEnseignant(idPers:number) {
    this.router.navigate(['DetailsEnseignantContractuel',idPers]);
  }

  Imprimer(idPers:number,sexe:string)
  {
this.imprimerServices.ImprimerAttestation(idPers,sexe)
.subscribe(data=>{
  console.log(data);
},err=>{
  console.log(err);
})
  }

}
