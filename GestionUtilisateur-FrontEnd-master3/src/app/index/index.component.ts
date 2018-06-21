import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../model/model.user";
import {UsersServices} from "../../services/users.services";
import {Personnel} from "../../model/model.personnel";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  idUser:number;
  user:User=new User();
  personnel:Personnel=new Personnel();
  constructor(public activatedRoute:ActivatedRoute,public router:Router,private userServices:UsersServices)
  {
    this.idUser=activatedRoute.snapshot.params['idUser'];
    console.log(this.idUser);
  }
  ngOnInit() {
    this.userServices.getUser(this.idUser)
      .subscribe(data=> {
        this.user = data;
        this.personnel=this.user.personnel;
      },err=>{
        console.log(err);
      })
  }

}
