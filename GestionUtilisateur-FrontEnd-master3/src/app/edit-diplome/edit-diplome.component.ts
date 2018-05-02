import { Component, OnInit } from '@angular/core';
import {Diplome} from '../../model/model.diplome';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersServices} from '../../services/users.services';
import {DiplomeServices} from '../../services/diplome.services';

@Component({
  selector: 'app-edit-diplome',
  templateUrl: './edit-diplome.component.html',
  styleUrls: ['./edit-diplome.component.css']
})
export class EditDiplomeComponent implements OnInit {
  mode:number=1;
  diplome:Diplome=new Diplome();
  idDip:number=0;
  constructor(public activatedRoute:ActivatedRoute,
              public diplomeService:DiplomeServices,
              public router:Router) {
    this.idDip=activatedRoute.snapshot.params['idDip'];
  }

  ngOnInit() {
    this.diplomeService.getDiplome(this.idDip)
      .subscribe(data=> {
        this.diplome = data;
      },err=>{
        console.log(err);
      })
  }
  updateDiplome(){
    this.diplomeService.updateDiplome(this.diplome)
      .subscribe(data=>{
        console.log(data);
        alert("Mise à jour effectuée");
        this.router.navigate(['diplome']);
      },err=>{
        console.log(err);
        alert("Probléme");
      })
  }

}
