import { Component, OnInit } from '@angular/core';
import {TypeConge} from '../../model/model.typeConge';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeCongeServices} from '../../services/typeConge.services';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-edit-type-conge',
  templateUrl: './edit-type-conge.component.html',
  styleUrls: ['./edit-type-conge.component.css']
})
export class EditTypeCongeComponent implements OnInit {
  typeConge:TypeConge=new TypeConge();
  libelleFR=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  libelleAR=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  lang:string="";
  idCg:number=0;
  constructor(public activatedRoute:ActivatedRoute,
              public typeCongeService:TypeCongeServices,
              private toastr: ToastrService,
              public router:Router) {
    this.idCg=activatedRoute.snapshot.params['idCg'];
  }

  ngOnInit() {
    this.lang=sessionStorage.getItem("lang");
    this.typeCongeService.getTypeConge(this.idCg)
      .subscribe(data=> {
        this.typeConge = data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  updateTypeConge(){
    this.typeCongeService.updateTypeConge(this.typeConge)
      .subscribe(data=>{
        console.log(data);
       this.showSuccess();
        this.router.navigate(['/typeConge']);
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      })
  }
  getErrorMessageFr() {
    return this.libelleFR.hasError('pattern') ? 'des caractères en français seulement' :
    this.typeConge.libelleType.length < 3 ? 'Au minimum 3 caractéres' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAR.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAR.hasError('required') ? 'Champ obligatoire' :
    this.typeConge.libelleType.length < 3 ? 'Au minimum 4 caractéres' :
            '';
  }
  Annuler()
  {
    this.router.navigate(['/typeConge']);
  }
  valideFormulaire()
  {
    if((this.typeConge.libelleTypeAr!="") &&(this.typeConge.libelleTypeAr.length>=4) && !(this.libelleAR.hasError('pattern')))
    {
      if(this.typeConge.libelleType!=""&& (this.libelleFR.hasError('pattern'))&&(this.typeConge.libelleType.length<3))
      {
       return true;
      }  
      else if(this.typeConge.libelleType!="" && !(this.libelleFR.hasError('pattern'))&&(this.typeConge.libelleType.length<3))
      {
        return true;
      }
      else if(this.typeConge.libelleType!="" && (this.libelleFR.hasError('pattern'))&&(this.typeConge.libelleType.length>=3))
      {
        return true;
      }
      else if(this.typeConge.libelleType!="" && !(this.libelleFR.hasError('pattern'))&&(this.typeConge.libelleType.length>=3))
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
