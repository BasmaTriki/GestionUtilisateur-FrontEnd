import { Component, OnInit } from '@angular/core';
import {UsersServices} from "../../services/users.services";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../model/model.user";
import {Http} from "@angular/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:string="";
  motpasse:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=5;
  pageUsers:any;
  constructor(public http:Http,public userService:UsersServices,
              public router:Router) { }

  ngOnInit() {
  }
  doSearch(){
    this.userService.getUser(this.login)
      .subscribe(data=>{
        alert("Success de s'authentifier");
        this.router.navigate(['index']);
        console.log(data)
      },err=>{
        console.log(err);
      })
  }
  chercheUser(){
    this.doSearch();
  }
}
