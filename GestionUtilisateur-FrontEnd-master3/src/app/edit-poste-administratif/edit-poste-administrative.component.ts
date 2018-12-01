import { Component, OnInit } from '@angular/core';
import {PosteAdministrative} from '../../model/model.posteAdministrative';
import {ActivatedRoute, Router} from '@angular/router';
import {PosteAdministrativeServices} from '../../services/posteAdministrative.services';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-poste-administrative',
  templateUrl: './edit-poste-administrative.component.html',
  styleUrls: ['./edit-poste-administrative.component.css']
})
export class EditPosteAdministrativeComponent implements OnInit {
  posteAdmin: PosteAdministrative = new PosteAdministrative();
  id: number = 0;
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  lang:string="";

  constructor(public activatedRoute: ActivatedRoute,
              public posteAdminService: PosteAdministrativeServices,
              private toastr: ToastrService,
              public router: Router) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.lang=sessionStorage.getItem("lang");
    this.posteAdminService.getPoste(this.id)
      .subscribe(data => {
        this.posteAdmin = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  updatePosteAdmin() {
    this.posteAdminService.updatePoste(this.posteAdmin)
      .subscribe(data => {
        console.log(data);
        this.showSuccess();
        this.router.navigate(['/posteAdmin']);
      }, err => {
        console.log(err);
        this.toastr.error("Veuillez vérifier les informations saisies");
      })
  }
  Annuler()
  {
    this.router.navigate(['/posteAdmin']);
  }
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.posteAdmin.libellePos.length < 3 ? 'Au minimum 3 caractéres' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.posteAdmin.libellePosAr.length < 3 ? 'Au minimum 4 caractéres' :
            '';
  }
  valideFormulaire()
  {
    if((this.posteAdmin.libellePosAr!="") &&(this.posteAdmin.libellePosAr.length>=4) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.posteAdmin.libellePos!=""&& (this.libelleFr.hasError('pattern'))&&(this.posteAdmin.libellePos.length<3))
      {
       return true;
      }  
      else if(this.posteAdmin.libellePos!="" && !(this.libelleFr.hasError('pattern'))&&(this.posteAdmin.libellePos.length<3))
      {
        return true;
      }
      else if(this.posteAdmin.libellePos!="" && (this.libelleFr.hasError('pattern'))&&(this.posteAdmin.libellePos.length>=3))
      {
        return true;
      }
      else if(this.posteAdmin.libellePos!="" && !(this.libelleFr.hasError('pattern'))&&(this.posteAdmin.libellePos.length>=3))
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
