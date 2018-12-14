import { Component, OnInit, Inject } from '@angular/core';
import {Enfant} from "../../model/model.enfant";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EnfantServices } from '../../services/enfant.services';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-enfants',
  templateUrl: './enfants.component.html',
  styleUrls: ['./enfants.component.css']
})
export class EnfantsComponent implements OnInit {
  enfant:Enfant=new Enfant();
  num:number=0;
  nom:string="";
  nomEnfantFr=new FormControl('',[Validators.required, Validators.pattern("[a-zA-Zéàçèùî]+"),Validators.minLength(3)]);
  nomEnfantAr= new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
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
  getErrorMessageNomEnfFr(){
    return this.nomEnfantFr.hasError('pattern')? 'des caractères en français seulement':
    this.nomEnfantFr.hasError('minLength') ? 'le minimum 3 chiffres':
    '';
  }
  getErrorMessageNomEnfAr(){
    return this.nomEnfantAr.hasError('pattern')? 'des caractères en arabe seulement':
    this.nomEnfantAr.hasError('minLength') ? 'le minimum 4 chiffres':
    '';
  }
  Close()
  {
    this.dialogRef.close();
   
  }

}
