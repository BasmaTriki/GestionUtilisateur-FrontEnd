import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImpressionServices } from '../../services/Impression.services';
import { CongeServices } from '../../services/conge.services';

@Component({
  selector: 'app-imprimer-fiche',
  templateUrl: './imprimer-fiche.component.html',
  styleUrls: ['./imprimer-fiche.component.css']
})
export class ImprimerFicheComponent implements OnInit {
  lang:string;
  idPers:number;
  sexe:string;
  type:string;
  documents = [
    {value: 'Attestation de Travail'},
    {value: 'Reprise de Travail'},
    {value: 'Fiche Personnel'},
    {value: 'Congés Personnel'}
  ];
  documentsAr = [
    {value: 'شهادة عمل'},
    {value: 'إستئناف عمل'},
    {value: 'بطاقة الأستاذ الشخصية'},
    {value: 'العطل الشخصية'}
  ];
  constructor(public dialogRef: MatDialogRef<ImprimerFicheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private impressionServices:ImpressionServices,
    private congeservices:CongeServices)
     {
      this.lang=sessionStorage.getItem("lang");
      this.idPers=data.idPers;
      this.sexe=data.sexe;
      }

  ngOnInit() {
    if(this.lang=='fr')
    {
      this.type='Attestation de Travail';
    }
    else
    {
      this.type='شهادة عمل';
    }
  }
  ImprimerAttestation()
  {
this.impressionServices.ImprimerAttestation(this.idPers,this.sexe)
.subscribe(data=>{
  console.log(data);
},err=>{
  console.log(err);
})
  }
  ImprimerAttestationFr()
  {
this.impressionServices.ImprimerAttestation(this.idPers,this.sexe)
.subscribe(data=>{
  console.log(data);
},err=>{
  console.log(err);
})
  }
  ImprimerReprise()
  {
this.impressionServices.ImprimerRepriseTravail(this.idPers)
.subscribe(data=>{
  console.log(data);
},err=>{
  console.log(err);
})
  }  
  ImprimerFichePersonnel()
  {
this.impressionServices.ImprimerFichePersonnel(this.idPers)
.subscribe(data=>{
  console.log(data);
},err=>{
  console.log(err);
})
  } 
  ImprimerCongePers()
  {
    this.congeservices.ImprimerCongePersonnel(this.idPers)
    .subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
}
Imprimer()
{
  if(this.type=="Attestation de Travail" || this.type=="شهادة عمل")
  {
   this.ImprimerAttestation();
  }
  else if(this.type=="Reprise de Travail"|| this.type=="إستئناف عمل")
  {
   this.ImprimerReprise();
  }
  else if(this.type=="Fiche Personnel"|| this.type=="بطاقة الأستاذ الشخصية")
  {
   this.ImprimerFichePersonnel();
  }
  else
  {
   this.ImprimerCongePers();
  }
}
}
