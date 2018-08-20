import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CongeServices } from '../../services/conge.services';
import { Conge } from '../../model/model.conge';

@Component({
  selector: 'app-reprise-conge',
  templateUrl: './reprise-conge.component.html',
  styleUrls: ['./reprise-conge.component.css']
})
export class RepriseCongeComponent implements OnInit {
idCong:number;
conge:Conge=new Conge();
  constructor(public dialogRef: MatDialogRef<RepriseCongeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private congeServices:CongeServices)
  { }

  ngOnInit() {
    this.idCong=this.data.name;
    console.log(this.data.name);
    this.congeServices.getConge(this.idCong)
    .subscribe(data=>{
      this.conge=data;
    },err=>{
      console.log(err);
    });
  }
  ModifierConge()
  {this.conge.reprise=true;
    this.conge.dateReprise=new Date();
    this.congeServices.updateConge(this.conge)
    .subscribe(data=>{
      this.conge=data;
      this.Close();
    },err=>{
      console.log(err);
    });
  }
  Close()
  {
    this.dialogRef.close();
   
  }
}
