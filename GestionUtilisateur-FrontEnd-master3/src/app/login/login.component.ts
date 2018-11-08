import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Http} from "@angular/http";
import {Personnel} from "../../model/model.personnel";
import {EnseignantPermanentServices} from "../../services/enseignantpermanent.services";
import { AdministratifServices } from '../../services/administratif.services';
import { PersonnelServices } from '../../services/personnel.services';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:string="";
  motpasse:string="";
  currentPage:number=0;
  pages:Array<number>;
  size:number=5;
  idUser:number;
  personnel:Personnel=new Personnel();
  lang:string="fr";
  constructor(public http:Http,
              private toastr: ToastrService,
              public personnelService:PersonnelServices,
              public enseignantPermServices:EnseignantPermanentServices,
              public administratifServices:AdministratifServices,
              public personnelServices:PersonnelServices,
              public router:Router,
              private translate: TranslateService) { }

  ngOnInit() {
  this.lang=sessionStorage.getItem("lang");
  }
  switchLanguage(Language:string)
  {
    this.translate.use(Language);
    sessionStorage.setItem("lang",Language);
  }
  doSearch(){
    this.personnelService.getPersonnelLogin(this.login,this.motpasse)
      .subscribe(data=>{
        this.personnel=data;
       sessionStorage.setItem('idUser',this.personnel.idPers+"");
       sessionStorage.setItem('nom',this.personnel.prenom+" "+this.personnel.nom);
       sessionStorage.setItem('nomAr',this.personnel.prenomAr+" "+this.personnel.nomAr);
       sessionStorage.setItem('role',this.personnel.role.type);
       this.personnelService.isAuth=true;
       this.router.navigate(['/index']);
       if(this.personnel!=null)
       {
        this.showSuccess(this.personnel);
       }
      },err=>{
        console.log(err);
        this.toastr.error("Veuillez vérifier votre login et votre mot de passe",'Erreur')
      })
  }
  chercheUser(){
    this.doSearch();
  }
  showSuccess(p:Personnel) {
    if(this.lang=='fr')
    {
      this.toastr.info(p.prenom+" "+p.nom,'Bienvenu');
    }
  else
    {
      this.toastr.info(p.prenomAr+" "+p.nomAr,'مرحبا');
    }
  }
}
