import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Mutation} from '../../model/model.mutation';
import {MutationServices} from '../../services/Mutation.services';
import {Personnel} from '../../model/model.personnel';
import {TypeMutation} from "../../model/model.typeMutation";
import {Organisme} from "../../model/model.organisme";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ModalMutationComponent } from '../modal-mutation/modal-mutation.component';
import { AdministratifServices } from '../../services/administratif.services';

@Component({
  selector: 'app-mutation-admin',
  templateUrl: './mutation-admin.component.html',
  styleUrls: ['./mutation-admin.component.css']
})
export class MutationAdminComponent implements OnInit {
  pageMutation:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=1000;
  mutation:Mutation=new Mutation();
  mutations:Array<Mutation>=new Array<Mutation>();
  pageEnseignant:any;
  personnel:Personnel=new Personnel();
  typeMutation:TypeMutation;
  typeMutations:Array<TypeMutation>=new Array<TypeMutation>();
  orgAccueil:Organisme=new Organisme();
  orgAccueils:Array<Organisme>=new Array<Organisme>();
  dataTable: any;
  nom:string;
  lang:string;
  constructor(private mutationServices:MutationServices,
    private administratifService:AdministratifServices,
    private chRef: ChangeDetectorRef, 
    public dialog: MatDialog,
    private http: HttpClient,
    public router:Router) 
    {
     this.lang=sessionStorage.getItem("lang"); 
     }

  ngOnInit() {
    this.doSearchEng();
  }
  doSearchEng()
  { 
     this.administratifService.getAdministratifPernom(this.motCle,this.currentPage,this.size)
     .subscribe((data: any[]) => {
      this.pageEnseignant = data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
      },err=>{
        console.log(err);
      })
  }
  onEditMutation(idMut:number){
    this.router.navigate(['editMutation',idMut]);
  }
  onDeleteMutation(m:Mutation){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.mutationServices.deleteMutation(m.idMut)
        .subscribe(data=> {
          this.pageMutation.content.splice(
            this.pageMutation.content.indexOf(m),1
          );
          console.log(data);
        },err=>{
          console.log(err);
        })
    }
  }
  ajouterMutation(p:Personnel)
  {
    if(p!=null)
    {if(this.lang=="fr")
    {
      this.nom=p.prenom+" "+p.nom;
    }
    else
    {
      this.nom=p.prenomAr+" "+p.nomAr;
    }
      this.personnel=p;
      let dialogRef = this.dialog.open(ModalMutationComponent, {data:{name:this.nom,idPers:p.idPers}});
    }
   
  }
  EtatMutation(e)
  {

  }
}
