import { Component, OnInit } from '@angular/core';
import {User} from '../../model/model.user';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonnelServices} from '../../services/personnel.services';
import {Personnel} from "../../model/model.personnel";
import {UsersServices} from "../../services/users.services";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  mode:number=1;
  user:User=new User();
  idUser:string="";
  personnel:Personnel=new Personnel();
  personnels:Array<Personnel>=new Array<Personnel>();
  hide = true;
  constructor(public activatedRoute:ActivatedRoute,
              public userService:UsersServices,
              public personnelService:PersonnelServices,
              public router:Router)
  {
  this.idUser=activatedRoute.snapshot.params['login'];
  }

  ngOnInit() {
    this.userService.getUser(this.idUser)
      .subscribe(data=> {
        this.user = data;
        this.personnel=this.user.personnel;
      },err=>{
      console.log(err);
      })
    this.AfficherPersonnel();
  }
  AfficherPersonnel()
  {
    this.personnelService.getAllPersonnel()
      .subscribe(data=>{
        this.personnels=data;
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
  updateUser(){
    this.user.personnel=this.personnel;
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
annuler(){}
}
