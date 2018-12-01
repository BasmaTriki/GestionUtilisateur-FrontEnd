import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {CongeServices} from '../../services/conge.services';
import {Conge} from '../../model/model.conge';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {Personnel} from '../../model/model.personnel';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
import { Etat } from '../../model/model.etat';
import { EtatPersonnel } from '../../model/model.etatPersonnel';
import { EtatPersonnelServices } from '../../services/etatPersonnel.services';
import { PersonnelServices } from '../../services/personnel.services';

@Component({
  selector: 'app-conge-auto',
  templateUrl: './conge-auto.component.html',
  styleUrls: ['./conge-auto.component.css']
})
export class CongeAutoComponent implements OnInit {
  pageConge: any;
  pageCongeA: any;
  motCle: string = "en-attente";
  currentPage: number = 0;
  currentPageA: number = 0;
  pages: Array<number>;
  pagesA: Array<number>;
  size: number = 1000;
  conge: Conge = new Conge();
  conges: Array<Conge> = new Array<Conge>();
  dataTable: any;
  lang:string;
  etat:Etat=new Etat();
  etatPersonnel:EtatPersonnel=new EtatPersonnel();
  constructor(private congeServices: CongeServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    private etatPersonnelServices:EtatPersonnelServices,
    private personnelServices:PersonnelServices,
     public router: Router) {
      this.lang=sessionStorage.getItem("lang");
  }

  ngOnInit() {
    this.doSearch();
  }
 /* .subscribe((data: any[]) => {
    this.pageEnseignant = data;
    // You'll have to wait that changeDetection occurs and projects data into 
    // the HTML template, you can ask Angular to that for you ;-)
    this.chRef.detectChanges();
    // Now you can use jQuery DataTables :
    const table: any = $('table');
    this.dataTable = table.DataTable();   
},err=>{
  console.log(err);
})*/
  accepter(c: Conge) {
    c.valide = "accepte";
    c.valideAr = "موافق عليه";
    if(!c.typeconge.actifPers)
    {
      this.etat.idEtat=2;
      this.etat.libelleEtat="non-actif";
      c.personnel.etat=this.etat;
      this.chercherEtatInactive(c.personnel.idPers,this.etat.idEtat);
       this.personnelServices.updatePersonnel(c.personnel)
         .subscribe(data=>{
           console.log(data);
         },err=>{
           console.log(err);
         })
    }
    this.congeServices.updateConge(c)
      .subscribe(data => {
        this.pageConge.content.splice(
          this.pageConge.content.indexOf(c), 1
        );
        if((this.etatPersonnel.etatInactive=="")&&(this.etatPersonnel.etatInactiveAr==""))
        {
          this.EnregistrerEtatPersonnel(c.personnel);
        }
        else 
        {
          this.updateEtatInactive(c.personnel);
        }
        console.log(data);
      }, err => {
        console.log(err);
      })
  }
  refuser(c: Conge) {
    let confirm = window.confirm("Etes-vous sûre?");
    if (confirm == true) {
      c.valide = "refuse";
      c.valideAr="مرفوض";
      this.congeServices.updateConge(c)
        .subscribe(data => {
          this.pageConge.content.splice(
            this.pageConge.content.indexOf(c), 1
          );
          console.log(data);
        }, err => {
          console.log(err);
        })
    }
  }

  doSearch() {
    this.congeServices.getCongesAutoriser(true,this.motCle, this.currentPage, this.size)
    .subscribe((data: any[]) => {
      this.pageConge = data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();   
      }, err => {
        console.log(err);
      })
  }
  EnregistrerEtatPersonnel(en:Personnel)
  {this.etatPersonnel.personnel=en;
    this.etatPersonnel.etat=this.etat;
    this.etatPersonnel.etatInactive=this.conge.typeconge.libelleType;
    this.etatPersonnel.etatInactiveAr=this.conge.typeconge.libelleTypeAr;
    this.etatPersonnelServices.saveEtatPersonnel(this.etatPersonnel)
     .subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
  
  }
    updateEtatInactive(en:Personnel)
    { this.etatPersonnel.personnel=en;
      this.etatPersonnel.etat=this.etat;
      this.etatPersonnel.etatInactive=this.conge.typeconge.libelleType;
      this.etatPersonnel.etatInactiveAr=this.conge.typeconge.libelleTypeAr;
      this.etatPersonnelServices.updateEtatPersonnel(this.etatPersonnel)
      .subscribe(data=>{
        console.log(data);
      },err=>{
        console.log(err);
      })
    }
    chercherEtatInactive(idPers:number,idEtat:number)
    {
      this.etatPersonnelServices.getEtatInactive(idPers,idEtat)
      .subscribe(data=>{
        this.etatPersonnel=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
    }
}



