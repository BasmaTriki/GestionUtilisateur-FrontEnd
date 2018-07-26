import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DemandeVacationServices } from '../../services/demandeVacation.services';
import { DemandeVacation } from '../../model/model.demandeVacation';

@Component({
  selector: 'app-modal-vacation',
  templateUrl: './modal-vacation.component.html',
  styleUrls: ['./modal-vacation.component.css']
})
export class ModalVacationComponent implements OnInit {
  idDemande:number=0;
  demandeVacation:DemandeVacation=new DemandeVacation();
  constructor(public dialogRef: MatDialogRef<ModalVacationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router:Router,
    private demandeServices:DemandeVacationServices,
    public http: HttpClient) { }

  ngOnInit() {
    this.idDemande=Number(this.data.id);
    this.doSearch();
  }
  doSearch() {
    this.demandeServices.getDemandeVacation(this.idDemande)
      .subscribe(data => {
        this.demandeVacation= data;
      }, err => {
        console.log(err);
      })
  }
  Close()
  {
    this.dialogRef.close();
   
  }
  Accepter()
  {this.demandeVacation.etatdemande="accepter";
    this.demandeServices.updateDemandeVacation(this.demandeVacation)
    .subscribe(data => {
      this.demandeVacation= data;
      console.log(data);
    }, err => {
      console.log(err);
    })
    this.Close();
  }
  Refuser()
  {this.demandeVacation.etatdemande="refuser";
  this.demandeServices.updateDemandeVacation(this.demandeVacation)
  .subscribe(data => {
    this.demandeVacation= data;
  }, err => {
    console.log(err);
  })
  this.Close();
  }
}
