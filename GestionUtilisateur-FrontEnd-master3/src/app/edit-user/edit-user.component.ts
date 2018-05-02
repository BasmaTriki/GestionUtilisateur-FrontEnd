import { Component, OnInit } from '@angular/core';
import {User} from '../../model/model.user';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersServices} from '../../services/users.services';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  mode:number=1;
  user:User=new User();
  idUser:string="";
  constructor(public activatedRoute:ActivatedRoute,
              public userService:UsersServices,
              public router:Router)
  {
  this.idUser=activatedRoute.snapshot.params['login'];
  }

  ngOnInit() {
    this.userService.getUser(this.idUser)
      .subscribe(data=> {
        this.user = data;
      },err=>{
      console.log(err);
      })
  }
  updateUser(){
this.userService.updateUser(this.user)
  .subscribe(data=>{
    console.log(data);
    alert("Mise à jour effectuée");
    this.router.navigate(['users']);
  },err=>{
    console.log(err);
    alert("Probléme");
  })
  }

}
