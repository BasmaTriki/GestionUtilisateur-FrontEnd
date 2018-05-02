import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GradeServices} from "../../services/grade.services";
import {Grade} from "../../model/model.grade";

@Component({
  selector: 'app-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.css']
})
export class EditGradeComponent implements OnInit {
  grade:Grade=new Grade();
  id:number=0;
  constructor(public activatedRoute:ActivatedRoute,
              public gradeService:GradeServices,
              public router:Router) {
    this.id=activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.gradeService.getGrade(this.id)
      .subscribe(data=> {
        this.grade = data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  updateGrade(){
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
