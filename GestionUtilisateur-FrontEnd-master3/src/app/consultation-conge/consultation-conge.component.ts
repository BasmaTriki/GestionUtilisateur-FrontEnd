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
  personnels: Array<Personnel> = new Array<Personnel>();
  dataTable: any;
  lang:string;
  constructor(private congeServices: CongeServices,private chRef: ChangeDetectorRef, 
    private http: HttpClient, public router: Router) {
      this.lang=sessionStorage.getItem("lang");
  }

  ngOnInit() {
    this.doSearch();
    this.doSearchnonautoriser();
  }
  download(idCong:number)
  {
    this.http.get("http://localhost:8080/downloadCertificat/"+idCong)
   .subscribe(res=>{
     console.log(res);
   })
  }
  accepter(c: Conge) {
    c.valide = "accepte";
    c.valideAr = "موافق عليه";
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
  valider(c: Conge) {
    c.valide = "validé";
    c.valideAr = "إطلعت عليه";
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
  doSearchnonautoriser() {
    this.congeServices.getCongesAutoriser(true,this.motCle, this.currentPageA, this.size)
      .subscribe(data => {
        console.log(data);
        this.pageCongeA = data;
        this.pagesA = new Array(data.totalPages);
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
}


