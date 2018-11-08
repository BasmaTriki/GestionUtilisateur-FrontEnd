import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdministratifServices } from '../../services/administratif.services';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { PersonnelServices } from '../../services/personnel.services';
import { ImpressionServices } from '../../services/Impression.services';
@Component({
  selector: 'app-liste-administratif',
  templateUrl: './liste-administratif.component.html',
  styleUrls: ['./liste-administratif.component.css']
})
export class ListeAdministratifComponent implements OnInit {
  pageAdministratif:any;
  dataTable: any;
  motCle:string="";
  currentPage:number=0;
  size:number=2000;
  lang:string;
  constructor(private chRef: ChangeDetectorRef,
    private adminService:AdministratifServices,
    private personnelServices:PersonnelServices,
    private impressionServices:ImpressionServices,
    private http: HttpClient, public router: Router) 
    {
      this.lang=sessionStorage.getItem("lang");
     }

  ngOnInit() {
    this.doSearchAdmin();
  }
  doSearchAdmin()
  {
  this.adminService.getAdministratifs(this.motCle,this.currentPage,this.size)
  .subscribe((data: any[]) => {
    this.pageAdministratif=data;
    this.chRef.detectChanges();
    // Now you can use jQuery DataTables :
    const table: any = $('table');
    this.dataTable = table.DataTable();
  },err=>{
    console.log(err);
  })
}
onEditAdministratif(idPers:number){
  this.router.navigate(['EditAdministratif',idPers]);
}
onDetailsAdministratif(idPers:number) {
  this.router.navigate(['DetailsAdministratif',idPers]);
}
Imprimer(idPers:number,sexe:string)
  {
this.impressionServices.ImprimerAttestation(idPers,sexe)
.subscribe(data=>{
  console.log(data);
},err=>{
  console.log(err);
})
  }
}
