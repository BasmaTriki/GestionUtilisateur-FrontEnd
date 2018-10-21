import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { PersonnelServices } from './personnel.services';

@Injectable()
export class AuthGuard implements CanActivate {
    idPers:String;
    constructor(private authServices:PersonnelServices,
        private router: Router) 
    {
     this.idPers=sessionStorage.getItem("idUser");
     }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.idPers!=null || this.authServices.isAuth)
    {
        return true;
    }
    else
    {
        this.router.navigate(['/login']);
    }
  }
}