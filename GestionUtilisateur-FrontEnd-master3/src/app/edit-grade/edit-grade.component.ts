import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GradeServices} from "../../services/grade.services";
import {Grade} from "../../model/model.grade";
import { Corps } from '../../model/model.corps';
import { CorpsServices } from '../../services/corps.services';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
   lang:string="";
   libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
   libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(3)]);
  constructor(public activatedRoute:ActivatedRoute,
              public gradeService:GradeServices,
              private corpsServices:CorpsServices,
              private toastr: ToastrService,
              public router:Router) {
    this.id=activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.lang=sessionStorage.getItem("lang");
    this.chercherCorps();
    this.gradeService.getGrade(this.id)
      .subscribe(data=> {
        this.grade = data;
        this.corps=this.grade.corps;
      },err=>{
        console.log(err);
      })
  }
  chercherCorps()
  {
    this.corpsServices.allCorpss()
      .subscribe(data=>{
        this.corpss=data;
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
        this.showSuccess();
        this.router.navigate(['grade']);
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      })
  }
  Annuler()
  {
  this.router.navigate(['grade']);
  }
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.grade.titre.length < 3 ? 'Au minimum 3 caractères' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.grade.titreAr.length < 3 ? 'Au minimum 3 caractères' :
            '';
  }
  valideFormulaire()
  {
    if((this.grade.titreAr!="") &&(this.grade.titreAr.length>=3) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.grade.titre!=""&& (this.libelleFr.hasError('pattern'))&&(this.grade.titre.length<3))
      {
       return true;
      }  
      else if(this.grade.titre!="" && !(this.libelleFr.hasError('pattern'))&&(this.grade.titre.length<3))
      {
        return true;
      }
      else if(this.grade.titre!="" && (this.libelleFr.hasError('pattern'))&&(this.grade.titre.length>=3))
      {
        return true;
      }
      else if(this.grade.titre!="" && !(this.libelleFr.hasError('pattern'))&&(this.grade.titre.length>=3))
      {
        return false;
      }
    return false;
    }
    else
    return true;
  }
  showSuccess() {
    if(this.lang=='fr')
    {
      this.toastr.success("Mise à jour a été effectuée avec succès");
    }
  else
    {
      this.toastr.success("تم التعديل بنجاح");
    }
  }
}
