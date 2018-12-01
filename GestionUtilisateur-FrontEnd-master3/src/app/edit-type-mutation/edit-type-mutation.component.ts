import { Component, OnInit } from '@angular/core';
import {TypeMutation} from '../../model/model.typeMutation';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeMutationsServices} from '../../services/typeMutation.services';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-edit-type-mutation',
  templateUrl: './edit-type-mutation.component.html',
  styleUrls: ['./edit-type-mutation.component.css']
})
export class EditTypeMutationComponent implements OnInit {
  typeMutation:TypeMutation=new TypeMutation();
  designationFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  designationAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  lang:string="";
  code:number=0;
  constructor(public activatedRoute:ActivatedRoute,
              public typeMutationService:TypeMutationsServices,
              private toastr: ToastrService,
              public router:Router) {
    this.code=activatedRoute.snapshot.params['code'];
  }

  ngOnInit() {
    this.lang=sessionStorage.getItem("lang"); 
    this.typeMutationService.getTypeMutation(this.code)
      .subscribe(data=> {
        this.typeMutation = data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  Annuler()
  {
    this.router.navigate(['/typeMutation']);
  }
  updateTypeMutation(){
    this.typeMutationService.updateTypeMutation(this.typeMutation)
      .subscribe(data=>{
        console.log(data);
       this.showSuccess();
        this.router.navigate(['/typeMutation']);
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      })
  }
  getErrorMessageFr() {
    return this.designationFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.typeMutation.designationMutation.length < 3 ? 'Au minimum 3 caractéres' :
            '';
  }
  getErrorMessageAr() {
    return this.designationAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.designationAr.hasError('required') ? 'Champ obligatoire' :
    this.typeMutation.designationMutationAr.length < 3 ? 'Au minimum 4 caractéres' :
            '';
  }
  valideFormulaire()
  {
    if((this.typeMutation.designationMutationAr!="") &&(this.typeMutation.designationMutationAr.length>=4) && !(this.designationAr.hasError('pattern')))
    {
      if(this.typeMutation.designationMutation!=""&& (this.designationFr.hasError('pattern'))&&(this.typeMutation.designationMutation.length<3))
      {
       return true;
      }  
      else if(this.typeMutation.designationMutation!="" && !(this.designationFr.hasError('pattern'))&&(this.typeMutation.designationMutation.length<3))
      {
        return true;
      }
      else if(this.typeMutation.designationMutation!="" && (this.designationFr.hasError('pattern'))&&(this.typeMutation.designationMutation.length>=3))
      {
        return true;
      }
      else if(this.typeMutation.designationMutation!="" && !(this.designationFr.hasError('pattern'))&&(this.typeMutation.designationMutation.length>=3))
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
