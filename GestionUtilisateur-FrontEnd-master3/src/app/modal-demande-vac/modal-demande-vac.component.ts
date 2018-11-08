import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DemandeVacationServices } from '../../services/demandeVacation.services';
import { DemandeVacation } from '../../model/model.demandeVacation';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { SpecialiteServices } from '../../services/specialite.services';
import { Specialite } from '../../model/model.specialite';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal-demande-vac',
  templateUrl: './modal-demande-vac.component.html',
  styleUrls: ['./modal-demande-vac.component.css']
})
export class ModalDemandeVacComponent implements OnInit {
  demandeVacation:DemandeVacation=new DemandeVacation();
  specialites:Array<Specialite>=new Array<Specialite>();
  selectedFile:File=null;
  specialite:Specialite=new Specialite();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  constructor(public dialogRef: MatDialogRef<ModalDemandeVacComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private demandeVacationService:DemandeVacationServices,
      private specialiteService:SpecialiteServices,
      public dialog: MatDialog,
      public http: Http,
      public router: Router)
       { }
  
    ngOnInit() {
      this.chercherSpecialite();
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ''
      });
    }
    Enregistrer(){
      this.demandeVacation.specialite=this.specialite;
      this.demandeVacation.etatdemande="en-attente";
      this.demandeVacation.dateCreationDem=new Date();
      this.demandeVacationService.saveDemandeVacation(this.demandeVacation)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
        if(this.selectedFile!=null)
        {
          this.upload(data.idDemande)
        }
        this.Close();
      },err=>{
        console.log(err);
      });
    
    }
    chercherSpecialite()
    {
      this.specialiteService.allSpecialites()
      .subscribe(data=>{
        this.specialites=data;
        console.log(data);
      },err=>{
        console.log(err);
      });
    }
    onFileSelected(event)
  {
    this.selectedFile=<File>event.target.files[0];
  }
  upload(idDemande:number)
  {
    const fb=new FormData();
    fb.append('upload',this.selectedFile,this.selectedFile.name);
   this.http.post("http://10.100.20.184/uploadDiplomeVac/"+idDemande,fb)
   .subscribe(res=>{
     console.log(res);
   })
  }
    Close()
    {
      this.dialogRef.close();
    }

}
