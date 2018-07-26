import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Mutation} from '../../model/model.mutation';
import {MutationServices} from '../../services/Mutation.services';
import {Personnel} from '../../model/model.personnel';
import {TypeMutation} from "../../model/model.typeMutation";
import {TypeMutationsServices} from "../../services/typeMutation.services";
import {PersonnelServices} from "../../services/personnel.services";
import {OrganismeAccueil} from "../../model/model.organismeAccueil";
import {OrganismeAccueilServices} from "../../services/organismeAccueil.services";

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
  orgAccueil:OrganismeAccueil=new OrganismeAccueil();
  orgAccueils:Array<OrganismeAccueil>=new Array<OrganismeAccueil>();
  constructor(private typeMutationServices:TypeMutationsServices,private orgAccueilServices:OrganismeAccueilServices,private mutationServices:MutationServices,private personnelServices:PersonnelServices,public http:Http,public router:Router) { }

  ngOnInit() {
    this.chercher();
    this.AfficherPersonnel();
    this.chercherType();
    this. chercherOrg();
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
  chercherOrg()
  {
    this.orgAccueilServices.allOrganismeAccueils()
      .subscribe(data=>{
        this.orgAccueils=data;
        this.pages=new Array(data.totalPages);
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  ajouter(){
    this.personnel.etat=false;
    this.mutation.personnel=this.personnel;
    this.mutation.typemutation=this.typeMutation;
    this.mutation.organismeAccueil=this.orgAccueil;
    this.mutationServices.saveMutation(this.mutation)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
        //this.personnel.mutation.push(data);
        console.log(this.personnel);
      },err=>{
        console.log(err);
      })
    this.personnelServices.updatePersonnel(this.personnel)
      .subscribe(data=>{
        alert("Success de mise à jour");
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  doSearch(){
    this.mutationServices.getMutations(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.pageMutation=data;
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
