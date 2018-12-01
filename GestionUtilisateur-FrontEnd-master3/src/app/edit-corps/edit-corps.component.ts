import { Component, OnInit } from '@angular/core';
import {Corps} from "../../model/model.corps";
import {CorpsServices} from "../../services/corps.services";
import {ActivatedRoute, Router} from "@angular/router";
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-corps',
  templateUrl: './edit-corps.component.html',
  styleUrls: ['./edit-corps.component.css']
})
export class EditCorpsComponent implements OnInit {
  corps:Corps=new Corps();
  idcps:number=0;
  lang:string="";
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(3)]);

  constructor(public activatedRoute:ActivatedRoute,
              public corpsService:CorpsServices,
              private toastr: ToastrService,
              public router:Router)
  {
    this.idcps=activatedRoute.snapshot.params['idcps'];
  }

  ngOnInit() {
    this.lang=sessionStorage.getItem("lang");
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
       this.showSuccess();
        this.router.navigate(['corps']);
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      })
  }
  Annuler()
  {
    this.router.navigate(['corps']);
  }
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.corps.libelleCps.length < 4 ? 'Au minimum 3 caractères' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.corps.libelleCpsAr.length < 4 ? 'Au minimum 3 caractères' :
            '';
  }
  valideFormulaire()
  {
    if((this.corps.libelleCpsAr!="") &&(this.corps.libelleCpsAr.length>=3) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.corps.libelleCps!=""&& (this.libelleFr.hasError('pattern'))&&(this.corps.libelleCps.length<3))
      {
       return true;
      }  
      else if(this.corps.libelleCps!="" && !(this.libelleFr.hasError('pattern'))&&(this.corps.libelleCps.length<3))
      {
        return true;
      }
      else if(this.corps.libelleCps!="" && (this.libelleFr.hasError('pattern'))&&(this.corps.libelleCps.length>=3))
      {
        return true;
      }
      else if(this.corps.libelleCps!="" && !(this.libelleFr.hasError('pattern'))&&(this.corps.libelleCps.length>=3))
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
