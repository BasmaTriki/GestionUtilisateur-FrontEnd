import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Personnel} from '../../model/model.personnel';
import {Http} from '@angular/http';
import {PersonnelServices} from "../../services/personnel.services";
import { RoleServices } from '../../services/role.services';
import { Role } from '../../model/model.role';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { EnseignantPermanentServices } from '../../services/enseignantpermanent.services';
import { AdministratifServices } from '../../services/administratif.services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
personnel:Personnel=new Personnel();
personnels:Array<Personnel>=new Array<Personnel>();
roles:Array<Role>=new Array<Role>();
role:Role;
loginU:string="admin";
motpassU:string="admin";
hide = true;
lang:string;
long:any=10;
TypePersonnel = [
  {value: 'Enseignant'},
  {value: 'Administratif'}
];
type:string="";
TypePersonnelAr = [
  {value: 'أستاذ'},
  {value: 'إداري'}
];
constructor(public http:Http, 
  public personnelServices:PersonnelServices,
  private toastr: ToastrService,
  private enseignentService:EnseignantPermanentServices,
  private adminService:AdministratifServices,
  public router:Router,
  private roleServices:RoleServices,
  translate: TranslateService) 
  {
  this.lang=sessionStorage.getItem("lang");
  translate.use(this.lang);
  if(this.lang=='fr')
  {
  this.type="Enseignant";
  }
  if(this.lang=='ar')
  {
  this.type="أستاذ";
  }
   }


  ngOnInit() {
    this.AfficherPersonnel();
    this.AfficherRole();
  }
  AfficherPersonnel()
  {if(this.type=="Enseignant"||this.type=="أستاذ")
    {
      this.enseignentService.getEnseignantPermanentSansCompte()
      .subscribe(data=>{
      this.personnels=data;
      },err=>{
        console.log(err);
      });
    }
    else if(this.type=="Administratif"||this.type=="إداري")
    {
      this.adminService.getAdministratifSansCompte()
      .subscribe(data=>{
      this.personnels=data;
      },err=>{
        console.log(err);
      });
    }
  }
  AfficherRole()
  {
    this.roleServices.allRoles()
      .subscribe(data=>{
      this.roles=data;
      },err=>{
        console.log(err);
      });
  }
saveUser(){
    this.personnel.login=this.loginU;
    this.personnel.motpasse=this.motpassU;
    this.personnel.role=this.role;
    this.personnelServices.updatePersonnel(this.personnel)
    .subscribe(data=>{
 
      this.router.navigate(['users']);
    },err=>{
      console.log(err);
      this.toastr.error("veuillez vérifier les informations saisies")
    });

}

generate()
{
	   var chars:string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; // Tu supprimes les lettres dont tu ne veux pas
     var pass:string = "";
      var i:number=0;
      var long:any=7;
      var x:number;
	    while( i < long)
	    {
	       x= Number(Math.floor(Math.random() * 62)); // Si tu supprimes des lettres tu diminues ce nb
         pass =pass+ chars.charAt(x);
         i++;
	    }
      console.log(pass);
      this.loginU=pass;
      this.motpassU=pass;
      return pass;
}
showSuccess() {
  if(this.lang=='fr')
  {
    this.toastr.success("Succes d'ajouter l'utilisateur");
  }
else
  {
    this.toastr.success("تمت إضافة المستخدم بنجاح");
  }
}
}
