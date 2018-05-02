import { Component, OnInit } from '@angular/core';
import {Corps} from "../../model/model.corps";
import {CorpsServices} from "../../services/corps.services";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-corps',
  templateUrl: './edit-corps.component.html',
  styleUrls: ['./edit-corps.component.css']
})
export class EditCorpsComponent implements OnInit {
  corps:Corps=new Corps();
  idcps:number=0;
  constructor(public activatedRoute:ActivatedRoute,
              public corpsService:CorpsServices,
              public router:Router)
  {
    this.idcps=activatedRoute.snapshot.params['idcps'];
  }

  ngOnInit() {
    this.corpsService.getCorps(this.idcps)
      .subscribe(data=> {
        this.corps = data;
      },err=>{
        console.log(err);
      })
  }
  updateCorps(){
    this.corpsService.updateCorps(this.corps)
      .subscribe(data=>{
        console.log(data);
        alert("Mise à jour effectuée");
        this.router.navigate(['corps']);
      },err=>{
        console.log(err);
        alert("Probléme");
      })
  }

}
