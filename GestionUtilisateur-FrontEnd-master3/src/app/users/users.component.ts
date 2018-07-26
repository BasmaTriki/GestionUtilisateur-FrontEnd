import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import "rxjs/add/operator/map";
import {Router} from '@angular/router';
import { Personnel } from '../../model/model.personnel';
import { PersonnelServices } from '../../services/personnel.services';
//var $  = require( 'jquery' );
//var dt = require('datatables.net' )( window, $ );
import dt from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.datatables.css';
declare var $;


@Component({
  selector: 'app-u',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
pageUsers:any;
motCle:string="";
currentPage:number=0;
pages:Array<number>;
size:number=5;

  personnels:Array<Personnel>=new Array<Personnel>();
  constructor(public http:Http, public personnelServices:PersonnelServices, public router:Router) {
   
  }

  ngOnInit() {
    this.doSearch();
    //$(document).ready( function () {
     // $('#users').DataTable();
  //} );
    
  }
  doSearch(){
    this.personnelServices.getPersonnelsActif(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.pageUsers=data;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }
  chercherLogin()
  {
    this.doSearch();
  }
  gotopage(i:number)
  {
this.currentPage=i;
this.doSearch();
  }
  onEditUser(idUser:number){
this.router.navigate(['editUser',idUser]);
  }
  onDeleteUser(p:Personnel){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      p.login="";
      p.motpasse="";
      this.personnelServices.updatePersonnel(p)
        .subscribe(data=> {
          this.pageUsers.content.splice(
            this.pageUsers.content.indexOf(p),1
          );
        },err=>{
          console.log(err);
        })
    }
  }
}
