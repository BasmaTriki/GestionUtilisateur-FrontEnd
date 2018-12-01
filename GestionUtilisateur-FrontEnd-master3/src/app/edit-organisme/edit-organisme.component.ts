import { Component, OnInit } from '@angular/core';
import { Organisme } from '../../model/model.organisme';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganismeServices } from '../../services/organisme.services';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-organisme',
  templateUrl: './edit-organisme.component.html',
  styleUrls: ['./edit-organisme.component.css']
})
export class EditOrganismeComponent implements OnInit {
  idOrg:number=0;
  organisme:Organisme=new Organisme();
  lang:string="";
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(4)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  constructor(public activatedRoute:ActivatedRoute,
    private organismeServices:OrganismeServices,
    private toastr: ToastrService,
    public router:Router) 
    { 
      this.idOrg=activatedRoute.snapshot.params['idOrg'];
    }

  ngOnInit() {
    this.lang=sessionStorage.getItem("lang");
    this.organismeServices.getOrganismeAccueil(this.idOrg)
    .subscribe(data=> {
     this.organisme=data;
      console.log(data);
    },err=>{
      console.log(err);
    })
  }
  updateOrg()
  {
    this.organismeServices.updateOrganismeAccueil(this.organisme)
    .subscribe(data=> {
      this.showSuccess();
      this.router.navigate(['OrgAccueil']);
      console.log(data);
    },err=>{
      console.log(err);
      this.toastr.error("Veuillez vérifier les informations saisies");
    })
  }
  Annuler()
  {
    this.router.navigate(['OrgAccueil']);  
  }
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.organisme.libelleOrg.length < 4 ? 'Au minimum 4 caractéres' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.organisme.libelleOrgAr.length < 4 ? 'Au minimum 4 caractéres' :
            '';
  }
  valideFormulaire()
  {
    if((this.organisme.libelleOrgAr!="") &&(this.organisme.libelleOrgAr.length>=4) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.organisme.libelleOrg!=""&& (this.libelleFr.hasError('pattern'))&&(this.organisme.libelleOrg.length<4))
      {
       return true;
      }  
      else if(this.organisme.libelleOrg!="" && !(this.libelleFr.hasError('pattern'))&&(this.organisme.libelleOrg.length<4))
      {
        return true;
      }
      else if(this.organisme.libelleOrg!="" && (this.libelleFr.hasError('pattern'))&&(this.organisme.libelleOrg.length>=4))
      {
        return true;
      }
      else if(this.organisme.libelleOrg!="" && !(this.libelleFr.hasError('pattern'))&&(this.organisme.libelleOrg.length>=4))
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
