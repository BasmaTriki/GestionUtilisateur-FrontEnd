import { Component, OnInit } from '@angular/core';
import { ServiceServices } from '../../services/service.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../model/model.service';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  idServ: number = 0;
  libelleFr=new FormControl('',[Validators.pattern("[a-zA-Zéàçèùî' ]+"),Validators.minLength(3)]);
  libelleAr=new FormControl('',[Validators.pattern("[أ-يءئىآؤة ]+"),Validators.required,Validators.minLength(4)]);
  lang:string="";
  service:Service=new Service();
  constructor(public activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public serviceServices: ServiceServices,
    public router: Router) 
    {
      this.idServ = activatedRoute.snapshot.params['idServ'];
     }

  ngOnInit() 
  {
    this.lang=sessionStorage.getItem("lang");
    this.serviceServices.getService(this.idServ)
    .subscribe(data => {
      this.service = data;
      console.log(data);
    }, err => {
      console.log(err);
    })
  }
  update()
  {
    this.serviceServices.updateService(this.service)
    .subscribe(data => {
      console.log(data);
      alert("Mise à jour effectuée");
      this.router.navigate(['service']);
    }, err => {
      console.log(err);
    })
  }
  getErrorMessageFr() {
    return this.libelleFr.hasError('pattern') ? 'des caractères en français seulement' :
    this.service.libelleServ.length < 3 ? 'Au minimum 3 caractéres' :
            '';
  }
  getErrorMessageAr() {
    return this.libelleAr.hasError('pattern') ? 'des caractères en arabe seulement' :
    this.libelleAr.hasError('required') ? 'Champ obligatoire' :
    this.service.libelleServAr.length < 3 ? 'Au minimum 4 caractéres' :
            '';
  }
  valideFormulaire()
  {
    if((this.service.libelleServAr!="") &&(this.service.libelleServAr.length>=4) && !(this.libelleAr.hasError('pattern')))
    {
      if(this.service.libelleServ!=""&& (this.libelleFr.hasError('pattern'))&&(this.service.libelleServ.length<3))
      {
       return true;
      }  
      else if(this.service.libelleServ!="" && !(this.libelleFr.hasError('pattern'))&&(this.service.libelleServ.length<3))
      {
        return true;
      }
      else if(this.service.libelleServ!="" && (this.libelleFr.hasError('pattern'))&&(this.service.libelleServ.length>=3))
      {
        return true;
      }
      else if(this.service.libelleServ!="" && !(this.libelleFr.hasError('pattern'))&&(this.service.libelleServ.length>=3))
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
