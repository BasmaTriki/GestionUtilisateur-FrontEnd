import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';
import { Router } from '../../../node_modules/@angular/router';
import { ImportationServices } from '../../services/importation.services';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-modal-importation',
  templateUrl: './modal-importation.component.html',
  styleUrls: ['./modal-importation.component.css']
})
export class ModalImportationComponent implements OnInit {
lang:string;
selectedFile:File=null;
  constructor( public dialogRef: MatDialogRef<ModalImportationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router:Router,
    private http:HttpClient,
    private importationServices:ImportationServices) 
    { 
       this.lang=sessionStorage.getItem("lang");
    }

  ngOnInit() {
  }
  Close()
  {
    this.dialogRef.close();
  }
  onFileSelected(event)
{
  this.selectedFile=<File>event.target.files[0];
}
ajouter()
{
  const fb=new FormData();
  fb.append('uploadfile',this.selectedFile,this.selectedFile.name);
  console.log(this.selectedFile.type);
   this.importationServices.ImpoterExcel(fb);
   //this.http.post("http://localhost:8080/uploadFile/"+idCong,fb)
 //.subscribe(res=>{
  // console.log(res);
 //})
}
}
