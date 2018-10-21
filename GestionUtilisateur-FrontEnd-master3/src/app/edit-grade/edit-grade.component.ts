import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GradeServices} from "../../services/grade.services";
import {Grade} from "../../model/model.grade";
import { Corps } from '../../model/model.corps';
import { CorpsServices } from '../../services/corps.services';

@Component({
  selector: 'app-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.css']
})
export class EditGradeComponent implements OnInit {
  grade:Grade=new Grade();
  id:number=0;
  corps:Corps=new Corps();
  corpss:Array<Corps>=new Array<Corps>();
   corpsModifiable:boolean=false;
  constructor(public activatedRoute:ActivatedRoute,
              public gradeService:GradeServices,
              private corpsServices:CorpsServices,
              public router:Router) {
    this.id=activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.chercherCorps();
    this.gradeService.getGrade(this.id)
      .subscribe(data=> {
        this.grade = data;
        this.corps=this.grade.corps;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  chercherCorps()
  {
    this.corpsServices.allCorpss()
      .subscribe(data=>{
        this.corpss=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  ModifierCorps()
  {
  this.corpsModifiable=true;
  }
  updateGrade(){
    this.grade.corps=this.corps;
    this.gradeService.updateGrade(this.grade)
      .subscribe(data=>{
        console.log(data);
        alert("Mise à jour effectuée");
        this.router.navigate(['grade']);
      },err=>{
        console.log(err);
        alert("Probléme");
      })
  }

}
