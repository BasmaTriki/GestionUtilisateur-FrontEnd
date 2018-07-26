import { Component, OnInit } from '@angular/core';
import { Personnel } from '../../model/model.personnel';
import { Router } from '@angular/router';
import { PersonnelServices } from '../../services/personnel.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
enseignantP:Personnel;
idUser:number=0;
mode:number=0;
  constructor(public personnelService:PersonnelServices,public router:Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('idUser')!=null)
    {
    this.idUser=Number(sessionStorage.getItem('idUser'));
    }
    this.doSearch();
  }
  doSearch()
  {
  this.personnelService.getPersonnel(this.idUser)
  .subscribe(data=>{
    this.enseignantP=data;
    console.log(data);
  },err=>{
    console.log(err);
  })
}
ModifierProfile()
{
this.mode=1;
}
UpdateProfile()
{
  this.personnelService.updatePersonnel(this.enseignantP)
  .subscribe(data=>{
    this.enseignantP=data;
    this.mode=0;
  },err=>{
    console.log(err);
  })
}
}
