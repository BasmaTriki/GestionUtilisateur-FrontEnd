import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { EnseignantFonctionnaireEtatServices } from '../../services/enseignantFonctionnaireEtat.services';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-liste-enseignant-fonctionnaire',
  templateUrl: './liste-enseignant-fonctionnaire.component.html',
  styleUrls: ['./liste-enseignant-fonctionnaire.component.css']
})
export class ListeEnseignantFonctionnaireComponent implements OnInit {
  pages: Array<number>;
  motCle:string="";
  currentPage:number=0;
  size:number=2000;
  currentPageA:number=0;
  pagesA:Array<number>;
  pageEnseignantFonct:any;
  dataTable: any;
  lang:string;
  constructor(private enseignantFonctService:EnseignantFonctionnaireEtatServices, 
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
     public router: Router) 
     {
      this.lang=sessionStorage.getItem("lang");
      }

  ngOnInit() {
    this.doSearchEngFonct()
  }
  doSearchEngFonct()
  {
  this.enseignantFonctService.getEnseignantFonctionnaireEtats(this.motCle,this.currentPageA,this.size)
  .subscribe((data: any[]) => {
    this.pageEnseignantFonct=data;
    console.log(data);
    this.chRef.detectChanges();
    // Now you can use jQuery DataTables :
    const table: any = $('table');
    this.dataTable = table.DataTable();
  },err=>{
    console.log(err);
  })
}
onEditEnseignant(idPers:number){
  this.router.navigate(['EditEnseignantF',idPers]);
}
onDetailsEnseignant(idPers:number) {
  this.router.navigate(['DetailsEnseignantFonct',idPers]);
}
}
