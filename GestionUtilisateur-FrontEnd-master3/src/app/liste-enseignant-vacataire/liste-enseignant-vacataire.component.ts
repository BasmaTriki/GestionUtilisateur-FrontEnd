import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnseignantLibreServices } from '../../services/enseignantlibre.services';
import { EnseignantFonctionnaireEtatServices } from '../../services/enseignantFonctionnaireEtat.services';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
@Component({
  selector: 'app-liste-enseignant-vacataire',
  templateUrl: './liste-enseignant-vacataire.component.html',
  styleUrls: ['./liste-enseignant-vacataire.component.css']
})
export class ListeEnseignantVacataireComponent implements OnInit {
  pages: Array<number>;
  pageEnseignantLibre:any;
  motCle:string="";
  currentPage:number=0;
  size:number=2000;
  motCle1:string="";
  currentPageA:number=0;
  pagesA:Array<number>;
  pageEnseignantFonct:any;
  dataTable: any;
  lang:string;
  constructor(private enseingnantlibreService:EnseignantLibreServices, 
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
     public router: Router) 
     {
       this.lang=sessionStorage.getItem("lang");
      }

  ngOnInit() {
    this.doSearchEngL();
    //this.doSearchEngFonct();
  }
  doSearchEngL()
  { 
     this.enseingnantlibreService.getEnseignantLibres(this.motCle,this.currentPage,this.size)
     .subscribe((data: any[]) => {
      this.pageEnseignantLibre=data;
      console.log(data);
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();  
        console.log(data);
      },err=>{
        console.log(err);
      })
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
  }
  onEditEnseignant(idPers:number){
    this.router.navigate(['/editVacationLibre',idPers]);
  }
  onDetailsEnseignant(idPers:number) {
    this.router.navigate(['DetailsEnseignantP',idPers]);
  }
}
