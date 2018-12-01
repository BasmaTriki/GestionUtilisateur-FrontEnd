import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SpecialiteServices} from "../../services/specialite.services";
import {Specialite} from "../../model/model.specialite";
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-specialite',
  templateUrl: './edit-specialite.component.html',
  styleUrls: ['./edit-specialite.component.css']
})
export class EditSpecialiteComponent implements OnInit {
specialite:Specialite=new Specialite();
idSp:number;
libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
lang:string="";
  constructor(public activatedRoute:ActivatedRoute,
              public specialiteService:SpecialiteServices,
              private toastr: ToastrService,
              public router:Router)
  {
    this.idSp=activatedRoute.snapshot.params['idSp'];
  }

  ngOnInit() {
    this.lang=sessionStorage.getItem("lang");
    this.specialiteService.getSpecialite(this.idSp)
      .subscribe(data=> {
        this.specialite = data;
      },err=>{
        console.log(err);
      })
  }
  updateSpecialite(){
    this.specialiteService.updateSpecialite(this.specialite)
      .subscribe(data=>{
       this.showSuccess();
        this.router.navigate(['/specialite']);
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      })
  }
  Annuler()
  {
    this.router.navigate(['/specialite']);
  }
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.specialite.libelleSp.length < 3 ? 'Au minimum 3 caractéres' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.specialite.libelleSpAr.length < 3 ? 'Au minimum 4 caractéres' :
            '';
  }
  valideFormulaire()
  {
    if((this.specialite.libelleSpAr!="") &&(this.specialite.libelleSpAr.length>=4) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.specialite.libelleSp!=""&& (this.libelleFr.hasError('pattern'))&&(this.specialite.libelleSp.length<3))
      {
       return true;
      }  
      else if(this.specialite.libelleSp!="" && !(this.libelleFr.hasError('pattern'))&&(this.specialite.libelleSp.length<3))
      {
        return true;
      }
      else if(this.specialite.libelleSp!="" && (this.libelleFr.hasError('pattern'))&&(this.specialite.libelleSp.length>=3))
      {
        return true;
      }
      else if(this.specialite.libelleSp!="" && !(this.libelleFr.hasError('pattern'))&&(this.specialite.libelleSp.length>=3))
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
