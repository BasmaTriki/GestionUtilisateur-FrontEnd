import { Component, OnInit } from '@angular/core';
import {Diplome} from '../../model/model.diplome';
import {ActivatedRoute, Router} from '@angular/router';
import {DiplomeServices} from '../../services/diplome.services';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-diplome',
  templateUrl: './edit-diplome.component.html',
  styleUrls: ['./edit-diplome.component.css']
})
export class EditDiplomeComponent implements OnInit {
  mode:number=1;
  diplome:Diplome=new Diplome();
  idDip:number=0;
  lang:string="";
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(3)]);
  constructor(public activatedRoute:ActivatedRoute,
              public diplomeService:DiplomeServices,
              private toastr: ToastrService,
              public router:Router) {
    this.idDip=activatedRoute.snapshot.params['idDip'];
  }

  ngOnInit() {
    this.lang=sessionStorage.getItem("lang");
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
       this.showSuccess();
        this.router.navigate(['diplome']);
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      })
  }
  Annuler()
  {
    this.router.navigate(['diplome']);
  }
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.diplome.titreDip.length < 3 ? 'Au minimum 3 caractères' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.diplome.titreDipAr.length < 3 ? 'Au minimum 3 caractères' :
            '';
  }
  valideFormulaire()
  {
    if((this.diplome.titreDipAr!="") &&(this.diplome.titreDipAr.length>=3) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.diplome.titreDip!=""&& (this.libelleFr.hasError('pattern'))&&(this.diplome.titreDip.length<3))
      {
       return true;
      }  
      else if(this.diplome.titreDip!="" && !(this.libelleFr.hasError('pattern'))&&(this.diplome.titreDip.length<3))
      {
        return true;
      }
      else if(this.diplome.titreDip!="" && (this.libelleFr.hasError('pattern'))&&(this.diplome.titreDip.length>=3))
      {
        return true;
      }
      else if(this.diplome.titreDip!="" && !(this.libelleFr.hasError('pattern'))&&(this.diplome.titreDip.length>=3))
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
