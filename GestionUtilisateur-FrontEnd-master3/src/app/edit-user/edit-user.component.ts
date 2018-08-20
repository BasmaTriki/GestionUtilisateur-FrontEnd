import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonnelServices} from '../../services/personnel.services';
import {Personnel} from "../../model/model.personnel";
import { RoleServices } from '../../services/role.services';
import { Role } from '../../model/model.role';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  idUser:number;
  personnel:Personnel=new Personnel();
  personnels:Array<Personnel>=new Array<Personnel>();
  hide = true;
  role:Role=new Role();
  roles:Array<Role>=new Array<Role>();
  roleModifiable:boolean=false;
  constructor(public activatedRoute:ActivatedRoute,
              public personnelService:PersonnelServices,
              private roleServices:RoleServices,
              public router:Router)
  {
  this.idUser=activatedRoute.snapshot.params['idUser'];
  }
  ngOnInit() {
    this.personnelService.getPersonnel(this.idUser)
      .subscribe(data=> {
        this.personnel = data;
        this.role=this.personnel.role;
      },err=>{
      console.log(err);
      })
      this.AfficherRole();
  }
updateUser()
{
  this.personnel.role=this.role;
  console.log(this.personnel.role);
this.personnelService.updatePersonnel(this.personnel)
  .subscribe(data=>{
    alert("Mise à jour effectuée");
    this.router.navigate(['users']);
  },err=>{
    console.log(err);
    alert("Probléme");
  })
  }
  AfficherRole()
  {
    this.roleServices.allRoles()
      .subscribe(data=>{
      this.roles=data;
      },err=>{
        console.log(err);
      });
  }
  ModifierRole()
  {
  this.roleModifiable=true;
  }
annuler()
{
  this.router.navigate(['users']);
}
}
