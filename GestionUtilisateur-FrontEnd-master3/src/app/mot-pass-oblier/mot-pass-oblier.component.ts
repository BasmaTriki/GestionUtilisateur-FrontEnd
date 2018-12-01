import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { PersonnelServices } from '../../services/personnel.services';
import { EnseignantPermanentServices } from '../../services/enseignantpermanent.services';
import { AdministratifServices } from '../../services/administratif.services';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { p } from '@angular/core/src/render3';
import { Personnel } from '../../model/model.personnel';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mot-pass-oblier',
  templateUrl: './mot-pass-oblier.component.html',
  styleUrls: ['./mot-pass-oblier.component.css']
})
export class MotPassOblierComponent implements OnInit {
  mat:string="";
  mail:string="";
  currentPage:number=0;
  pages:Array<number>;
  nb:number=0;
  size:number=5;
  idUser:number;
  personnel:Personnel=new Personnel();
  lang:string="fr";
  email = new FormControl('', [Validators.required,Validators.email]);
  matricule=new FormControl('',[Validators.required, Validators.pattern("[0-9]+"),Validators.minLength(4)]);
  constructor(public http:Http,
    private toastr: ToastrService,
    public personnelService:PersonnelServices,
    public administratifServices:AdministratifServices,
    public personnelServices:PersonnelServices,
    public router:Router)
     { }

  ngOnInit() {
  
  }
  chercheUser()
  {this.personnelService.getMatPersonnel(this.mat)
    .subscribe(data => {
     this.personnel=data;
     console.log(data);
     if(this.personnel!=null)
     {
       if(this.personnel.etat.idEtat==1)
       {
      this.personnelService.EmailMotPassOblier(this.personnel.idPers,this.mail)
      .subscribe(data => {
       console.log(data);
      this.showSuccess();
      this.router.navigate(['/login']);
     }, err => {
       console.log(err);
     });
    }
     else if(this.personnel.etat.idEtat==2 || this.personnel.etat.idEtat==3)
     {
      this.toastr.error("Vous n'avez pas le droit d'accéder");
     }
    }
    }, err => {
      console.log(err);
      this.toastr.error("Veuillez vérifier les informations saisies");
    });
  }
   getErrorMessage() {
    return this.email.hasError('required') ? 'Champ obligatoire' :
     this.email.hasError('email') ? 'adresse non valide' :
            '';
  }
  getErrorMessageM() {
    return this.matricule.hasError('required') ? 'Champ obligatoire' :
     this.matricule.hasError('pattern')? 'des chiffres seulement' :
     this.matricule.hasError('minLength')? 'le minimum 4 chiffres' :
            '';
  }
  showSuccess() {
    if(this.lang=='fr')
    {
      this.toastr.info('Un e-mail a été envoyé a votre adresse électronique');
    }
  else
    {
      this.toastr.info('لقد تم بعث المعلومات الخاصة بك عن طريق البريد الإلكتروني');
    }
  }
  valideFormulaire()
  {
    if((this.mat!="") && !(this.matricule.hasError('pattern'))&&(this.mat.length>=3) 
    && (this.mail!="") && !(this.email.hasError('email')))
    {
      return false;
    }
    else
    return true;
  }
}
