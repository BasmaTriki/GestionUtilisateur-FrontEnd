import { Component, OnInit } from '@angular/core';
import {User} from '../../model/model.user';
import {UsersServices} from '../../services/users.services';
import {Router} from '@angular/router';
import {Personnel} from '../../model/model.personnel';
import {Http} from '@angular/http';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
user:User=new User();
personnels:Array<Personnel>=new Array<Personnel>();
  constructor(public http:Http, public usersservices:UsersServices, public router:Router) { }

  ngOnInit() {
  }
saveUser(){
  this.userservice.saveUser(this.user)
    .subscribe(data=>{
      alert("Success d'ajout");
      this.router.navigate(['users']);
    console.log(data)
    },err=>{
      console.log(err);
    });

}
}
