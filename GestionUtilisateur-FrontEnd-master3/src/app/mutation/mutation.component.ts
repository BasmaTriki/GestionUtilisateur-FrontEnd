import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Mutation} from '../../model/model.mutation';
import {MutationServices} from '../../services/Mutation.services';
import {Personnel} from '../../model/model.personnel';
import {TypeMutation} from "../../model/model.typeMutation";
import {TypeMutationsServices} from "../../services/typeMutation.services";
import {PersonnelServices} from "../../services/personnel.services";
import {Organisme} from "../../model/model.organisme";
import {OrganismeServices} from "../../services/organisme.services";
import { EtatServices } from '../../services/etat.services';
import { EnseignantPermanentServices } from '../../services/enseignantpermanent.services';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { MatDialog } from '../../../node_modules/@angular/material';
import { ModalMutationComponent } from '../modal-mutation/modal-mutation.component';
@Component({
  selector: 'app-mutation',
  templateUrl: './mutation.component.html',
  styleUrls: ['./mutation.component.css']
})
export class MutationComponent implements OnInit {
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
  constructor(private mutationServices:MutationServices,
    private enseingnantpermanentService:EnseignantPermanentServices,
    private chRef: ChangeDetectorRef, 
    public dialog: MatDialog,
    private http: HttpClient,
    public router:Router) { }

  ngOnInit() {
    this.doSearchEng();
  }
  doSearchEng()
  { 
     this.enseingnantpermanentService.getEnseignantPermanentPrenom(this.motCle,this.currentPage,this.size)
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
  doSearch(){
    this.mutationServices.getMutations(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.pageMutation=data;
      },err=>{
        console.log(err);
      })
  }
  gotopage(i:number)
  {
    this.currentPage=i;
    this.doSearch();
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
    this.nom=p.prenom+" "+p.nom;
    this.personnel=p;
    let dialogRef = this.dialog.open(ModalMutationComponent, {data:{name:this.nom,idPers:p.idPers}});
  }
  EtatMutation(e)
  {

  }
}
