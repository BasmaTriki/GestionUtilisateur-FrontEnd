import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {PosteAdministrative} from '../../model/model.posteAdministrative';
import {PosteAdministrativeServices} from '../../services/posteAdministrative.services';
import {Grade} from '../../model/model.grade';


@Component({
  selector: 'app-poste-administrative',
  templateUrl: './poste-administrative.component.html',
  styleUrls: ['./poste-administrative.component.css']
})
export class PosteAdministrativeComponent implements OnInit {
  pagePoste:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=5;
  poste:PosteAdministrative=new PosteAdministrative();
  postes:Array<PosteAdministrative>=new Array<PosteAdministrative>();
  constructor(private posteServices:PosteAdministrativeServices,public http:Http,public router:Router) { }

  ngOnInit() {
    this.chercher();
  }
  ajouter(){
    this.posteServices.savePoste(this.poste)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  doSearch(){
    this.posteServices.getPostes(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.postes=data;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }
  chercher()
  {
    this.posteServices.getAllPostes()
      .subscribe(data=>{
        this.postes=data;
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
  onEditPoste(id:number){
    this.router.navigate(['editPosteAdmin',id]);
  }
  onDeletePoste(p:PosteAdministrative){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.posteServices.deletePoste(p.id)
        .subscribe(data=> {
          this.pagePoste.content.splice(
            this.pagePoste.content.indexOf(p),1
          );
          console.log(data);
        },err=>{console.log(err);
        })
    }
  }


}
