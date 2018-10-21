import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DemandeVacation } from '../../model/model.demandeVacation';
import { DemandeVacationServices } from '../../services/demandeVacation.services';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalVacationComponent } from '../modal-vacation/modal-vacation.component';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '../../../node_modules/@angular/common/http';
@Component({
  selector: 'app-consultation-vacation',
  templateUrl: './consultation-vacation.component.html',
  styleUrls: ['./consultation-vacation.component.css']
})
export class ConsultationVacationComponent implements OnInit {
  pageDemande:any;
  demandes:Array<DemandeVacation>=new Array<DemandeVacation>();
  motCle: string = "en-attente";
  currentPage: number = 0;
  pages: Array<number>;
  size:number=2000;
  role:string="";
  dataTable: any;
  lang:string;
  constructor(private demandeServices:DemandeVacationServices,
    private chRef: ChangeDetectorRef, 
    private http: HttpClient,
    public dialog: MatDialog,
     public router: Router) 
     {
       this.role=sessionStorage.getItem("role");
       this.lang=sessionStorage.getItem("lang");
      }

  ngOnInit()
  {if(this.role=='DirecteurES'||this.role=='admin')
  {
    this.doSearch();
  }
  else
  {
this.doSearchAccepter();
  }
   
  }
  doSearch() {
    this.demandeServices.getEtatDemandeVacation(this.motCle, this.currentPage, this.size)
    .subscribe((data: any[]) => {
      this.pageDemande = data;
      console.log(data);
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();   
      }, err => {
        console.log(err);
      })
  }
  doSearchAccepter() {
    this.demandeServices.getEtatDemandeVacation("accepter", this.currentPage, this.size)
    .subscribe((data: any[]) => {
      this.pageDemande = data;
      console.log(data);
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable(); 
      }, err => {
        console.log(err);
      })
  }
  Detail(d:DemandeVacation)
  {
    let dialogRef = this.dialog.open(ModalVacationComponent, {data:{id:d.idDemande}});
   // window.location.reload()
  if(dialogRef.afterClosed)
   this.doSearch();
  }
  gotopage(i:number)
{
  this.currentPage=i;
  this.doSearch();
}
Ajouter(d:DemandeVacation)
{
  this.router.navigate(['AjouterVacataire',d.idDemande]);
}
}
