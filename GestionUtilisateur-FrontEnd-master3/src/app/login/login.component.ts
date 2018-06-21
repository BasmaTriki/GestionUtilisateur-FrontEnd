import { Component, OnInit } from '@angular/core';
import {UsersServices} from "../../services/users.services";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../model/model.user";
import {Http} from "@angular/http";
import {EnseignantPermanent} from "../../model/model.enseignantpermanent";
import {Personnel} from "../../model/model.personnel";
import {EnseignantPermanentServices} from "../../services/enseignantpermanent.services";

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
  personnel:Personnel=new Personnel();
  public user:User=new User();
  constructor(public http:Http,
              public userService:UsersServices,
              public enseignantPermServices:EnseignantPermanentServices,
              public router:Router) { }

  ngOnInit() {
  }
  doSearch(){
    this.userService.getUsersLogin(this.login,this.motpasse,0,5)
      .subscribe(data=>{
        this.user=data;
        console.log(this.login);
        console.log(this.user);
        console.log(data.personnel);
        this.personnel=this.user.personnel;
        console.log(this.personnel);
        alert("Success de s'authentifier");
       //this.login=this.user.login;
        if(this.isEnseignant(this.personnel))
          this.router.navigate(['indexEnseignant']);
        else
        this.router.navigate(['index1',this.user.idUser]);
      },err=>{
        console.log(err);
      })
  }
  chercheUser(){
    this.doSearch();
  }
  isEnseignant(p:Personnel)
  {
    this.enseignantPermServices.getEnseignantPermanent(p.matricule)
      .subscribe(data=>{
        console.log(data)
         if(data!=null)
           return true;
        else return false;
      },err=>{
        console.log(err);
      })
  }
}
