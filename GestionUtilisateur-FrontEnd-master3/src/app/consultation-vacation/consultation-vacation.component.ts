import { Component, OnInit } from '@angular/core';
import { DemandeVacation } from '../../model/model.demandeVacation';
import { DemandeVacationServices } from '../../services/demandeVacation.services';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalVacationComponent } from '../modal-vacation/modal-vacation.component';

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
  size: number = 5;
  role:string="";
  constructor(private demandeServices:DemandeVacationServices,
    public http: Http,
    public dialog: MatDialog,
     public router: Router) 
     {
       this.role=sessionStorage.getItem("role");
      }

  ngOnInit()
  {if(this.role=='DirecteurES')
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
      .subscribe(data => {
        console.log(data);
        this.pageDemande = data;
        this.pages = new Array(data.totalPages);
      }, err => {
        console.log(err);
      })
  }
  doSearchAccepter() {
    this.demandeServices.getEtatDemandeVacation("accepter", this.currentPage, this.size)
      .subscribe(data => {
        console.log(data);
        this.pageDemande = data;
        this.pages = new Array(data.totalPages);
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
