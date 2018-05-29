import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Mutation} from '../../model/model.mutation';
import {MutationServices} from '../../services/Mutation.services';
import {Personnel} from '../../model/model.personnel';
import {UsersServices} from '../../services/users.services';
import {TypeMutation} from "../../model/model.typeMutation";
import {TypeMutationsServices} from "../../services/typeMutation.services";
import {PersonnelServices} from "../../services/personnel.services";

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
  size:number=5;
  mutation:Mutation=new Mutation();
  mutations:Array<Mutation>=new Array<Mutation>();
  personnels:Array<Personnel>=new Array<Personnel>();
  personnel:Personnel=new Personnel();
  typeMutation:TypeMutation;
  typeMutations:Array<TypeMutation>=new Array<TypeMutation>();
  constructor(private typeMutationServices:TypeMutationsServices,private mutationServices:MutationServices,private personnelServices:PersonnelServices,public http:Http,public router:Router) { }

  ngOnInit() {
    this.chercher();
    this.AfficherPersonnel();
    this.chercherType();
  }
  AfficherPersonnel()
  {
    this.personnelServices.getAllPersonnel()
      .subscribe(data=>{
        this.personnels=data;
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  chercherType()
  {
    this.typeMutationServices.allTypesMutations()
      .subscribe(data=>{
        this.typeMutations=data;
        this.pages=new Array(data.totalPages);
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  ajouter(){
    this.mutation.personnel=this.personnel;
    this.mutation.typemutation=this.typeMutation;
    this.mutationServices.saveMutation(this.mutation)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.mutationServices.getMutations(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.mutations=data;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }
  chercher()
  {
    this.mutationServices.getAllMutations()
      .subscribe(data=>{
        this.mutations=data;
        this.pages=new Array(data.totalPages);
        console.log(data);
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
}
