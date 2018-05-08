import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import "rxjs/add/operator/map";
import {UsersServices} from '../../services/users.services';
import {Router} from '@angular/router';
import {User} from '../../model/model.user';
import {Personnel} from '../../model/model.personnel';
@Component({
  selector: 'app-u',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
pageUsers:any;
motCle:Date=null;
currentPage:number=0;
pages:Array<number>;
size:number=5;
  users:Array<User>=new Array<User>();
  constructor(public http:Http, public usersservices:UsersServices, public router:Router) {}

  ngOnInit() {
  this.chercher();
  //this.doSearch();
  }
  doSearch(){
    this.usersservices.getUsers(this.motCle,this.currentPage,this.size)
      .subscribe(data=>{
        console.log(data);
        this.pageUsers=data;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
  }
  chercher()
  {
    this.usersservices.getAllUser()
      .subscribe(data=>{
        this.users=data;
        this.pages=new Array(data.totalPages);
      },err=>{
        console.log(err);
      })
    //this.doSearch();
  }
  gotopage(i:number)
  {
this.currentPage=i;
this.doSearch();
  }
  onEditUser(login:string){
this.router.navigate(['editUser',login]);
  }
  onDeleteUser(u:User){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      this.usersservices.deleteUser(u.login)
        .subscribe(data=> {
          this.pageUsers.content.splice(
            this.pageUsers.content.indexOf(u),1
          );
        },err=>{
          console.log(err);
        })
    }
  }
}
