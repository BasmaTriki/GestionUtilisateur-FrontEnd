import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonnelServices} from '../../services/personnel.services';
import {Personnel} from "../../model/model.personnel";

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
  constructor(public activatedRoute:ActivatedRoute,
              public personnelService:PersonnelServices,
              public router:Router)
  {
  this.idUser=activatedRoute.snapshot.params['idUser'];
  }
  ngOnInit() {
    this.personnelService.getPersonnel(this.idUser)
      .subscribe(data=> {
        this.personnel = data;
      },err=>{
      console.log(err);
      })
  }
updateUser()
{
this.personnelService.updatePersonnel(this.personnel)
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
