import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {CongeServices} from '../../services/conge.services';
import {Conge} from '../../model/model.conge';
import {Router} from '@angular/router';
import {Http, Request} from '@angular/http';
import {Personnel} from '../../model/model.personnel';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
import { EtatPersonnelServices } from '../../services/etatPersonnel.services';
import { PersonnelServices } from '../../services/personnel.services';
import { Etat } from '../../model/model.etat';
import { EtatPersonnel } from '../../model/model.etatPersonnel';

@Component({
  selector: 'app-consultation-conge',
  templateUrl: './consultation-conge.component.html',
  styleUrls: ['./consultation-conge.component.css']
})
export class ConsultationCongeComponent implements OnInit {
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
    public router: Router,
    private etatPersonnelServices:EtatPersonnelServices,
    private personnelServices:PersonnelServices) {
      this.lang=sessionStorage.getItem("lang");
  }

  ngOnInit() {
    this.doSearch();
  }
  download(idCong:number)
  {
    this.http.get("http://localhost:8080/downloadCertificat/"+idCong)
   .subscribe(res=>{
     console.log(res);
   })
  }
  valider(c: Conge) {
    c.valide = "validé";
    c.valideAr = "إطلعت عليه";
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
      }, err => {
        console.log(err);
      })
  }

  doSearch() {
    this.congeServices.getCongesAutoriser(false,this.motCle, this.currentPage, this.size)
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
  rattraper(c)
  {
      c.valide = "rattraper";
      c.valideAr = "عوض";
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


