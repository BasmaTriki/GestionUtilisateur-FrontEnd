import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Personnel} from '../../model/model.personnel';
import {Http} from '@angular/http';
import {PersonnelServices} from "../../services/personnel.services";
import { RoleServices } from '../../services/role.services';
import { Role } from '../../model/model.role';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
personnel:Personnel=new Personnel();
personnels:Array<Personnel>=new Array<Personnel>();
roles:Array<Role>=new Array<Role>();
role:Role;
loginU:string="admin";
motpassU:string="admin";
hide = true;
constructor(public http:Http, 
  public personnelServices:PersonnelServices,
  public router:Router,
  private roleServices:RoleServices)
{}

  ngOnInit() {
    this.AfficherPersonnel();
    this.AfficherRole();
  }
  AfficherPersonnel()
  {
    this.personnelServices.getPersonnelsLogin(true)
      .subscribe(data=>{
      this.personnels=data;
      },err=>{
        console.log(err);
      });
  }
  AfficherRole()
  {
    this.roleServices.allRoles()
      .subscribe(data=>{
      this.roles=data;
        console.log(data);
      },err=>{
        console.log(err);
      });
  }
saveUser(){
    this.personnel.login=this.loginU;
    this.personnel.motpasse=this.motpassU;
    this.personnel.role=this.role;
    this.personnelServices.updatePersonnel(this.personnel)
    .subscribe(data=>{
      alert("Success d'ajout un utilisateur");
      this.router.navigate(['users']);
    },err=>{
      console.log(err);
    });

}
concatination()
{
  var  mat= (this.personnel.matricule+"").substr(5,3);
  if(this.personnel!=null)
{
  this.loginU=this.personnel.prenom+mat;
  this.motpassU=this.personnel.prenom+mat;
}
}
}
