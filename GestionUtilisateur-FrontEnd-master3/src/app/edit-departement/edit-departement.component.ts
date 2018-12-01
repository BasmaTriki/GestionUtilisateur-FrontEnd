import { Component, OnInit } from '@angular/core';
import {Departement} from "../../model/model.departement";
import {ActivatedRoute, Router} from "@angular/router";
import {DepartementServices} from "../../services/departement.services";
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-departement',
  templateUrl: './edit-departement.component.html',
  styleUrls: ['./edit-departement.component.css']
})
export class EditDepartementComponent implements OnInit {
  departement:Departement=new Departement();
  idDep:number=0;
  lang:string="";
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(3)]);
  constructor(public activatedRoute:ActivatedRoute,
              public departementService:DepartementServices,
              private toastr: ToastrService,
              public router:Router)
  {
    this.idDep=activatedRoute.snapshot.params['idDep'];
  }

  ngOnInit() {
    this.lang=sessionStorage.getItem("lang");
    this.departementService.getDepartement(this.idDep)
      .subscribe(data=> {
        this.departement = data;
      },err=>{
        console.log(err);
      })
  }
  updateDepartement(){
    this.departementService.updateDepartement(this.departement)
      .subscribe(data=>{
        console.log(data);
        this.showSuccess();
        this.router.navigate(['departement']);
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      })
  }
  Annuler()
  {
    this.router.navigate(['departement']);
  }
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.departement.nomDep.length < 3 ? 'Au minimum 3 caractères' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.departement.nomDepAr.length < 3 ? 'Au minimum 3 caractères' :
            '';
  }
  valideFormulaire()
  {
    if((this.departement.nomDepAr!="") &&(this.departement.nomDepAr.length>=3) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.departement.nomDep!=""&& (this.libelleFr.hasError('pattern'))&&(this.departement.nomDep.length<3))
      {
       return true;
      }  
      else if(this.departement.nomDep!="" && !(this.libelleFr.hasError('pattern'))&&(this.departement.nomDep.length<3))
      {
        return true;
      }
      else if(this.departement.nomDep!="" && (this.libelleFr.hasError('pattern'))&&(this.departement.nomDep.length>=3))
      {
        return true;
      }
      else if(this.departement.nomDep!="" && !(this.libelleFr.hasError('pattern'))&&(this.departement.nomDep.length>=3))
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
