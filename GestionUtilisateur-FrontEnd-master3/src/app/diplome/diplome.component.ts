import { Component, OnInit } from '@angular/core';
import {DiplomeServices} from '../../services/diplome.services';
import {Diplome} from '../../model/model.diplome';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-diplome',
  templateUrl: './diplome.component.html',
  styleUrls: ['./diplome.component.css']
})
export class DiplomeComponent implements OnInit {
  pageDiplome:any;
  motCle:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=5;
  diplome:Diplome=new Diplome();
  diplomes:Array<Diplome>=new Array<Diplome>();
  constructor(private diplomeServices:DiplomeServices,public http:Http,public router:Router) { }

  ngOnInit() {
    this.chercher();
  }
ajouter(){
  this.diplomeServices.saveDiplome(this.diplome)
    .subscribe(data=>{
      alert("Success d'ajout");
      console.log(data);
    },err=>{
      console.log(err);
    });
}
  doSearch(){
    this.diplomeServices.getDiplomes(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.diplomes=data;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }
  chercher()
  {
    this.diplomeServices.allDiplomes()
      .subscribe(data=>{
        this.diplomes=data;
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
  onEditDiplome(idDip:number){
    this.router.navigate(['editDiplome',idDip]);
  }
  onDeleteDiplome(d:Diplome){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.diplomeServices.deleteDiplome(d.idDip)
        .subscribe(data=> {
          this.pageDiplome.content.splice(
            this.pageDiplome.content.indexOf(d),1
          );
          console.log(data);
        },err=>{
          console.log(err);
        })
    }
  }
}
