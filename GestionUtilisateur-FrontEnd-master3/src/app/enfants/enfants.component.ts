import { Component, OnInit, Inject } from '@angular/core';
import {Enfant} from "../../model/model.enfant";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EnfantServices } from '../../services/enfant.services';

@Component({
  selector: 'app-enfants',
  templateUrl: './enfants.component.html',
  styleUrls: ['./enfants.component.css']
})
export class EnfantsComponent implements OnInit {
  enfant:Enfant=new Enfant();
  num:number=0;
  nom:string="";
  constructor(public dialogRef: MatDialogRef<EnfantsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private enfantServices:EnfantServices) { }

  ngOnInit() {
    this.num=this.data.name;
    this.enfantServices.getEnfant(this.num)
    .subscribe(data=>{
      this.enfant=data;
      this.nom=this.enfant.nom;
    },err=>{
      console.log(err);
    });
  }
  ModifierEnfants()
  {
    this.enfantServices.updateEnfant(this.enfant)
    .subscribe(data=>{
      console.log(data);
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
