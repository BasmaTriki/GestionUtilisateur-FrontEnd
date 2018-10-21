import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {Http} from '@angular/http';
import "rxjs/add/operator/map";
import {Router} from '@angular/router';
import { Personnel } from '../../model/model.personnel';
import { PersonnelServices } from '../../services/personnel.services';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-u',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
pageUsers:any;
motCle:string="";
currentPage:number=0;
pages:Array<number>;
size:number=1000;
dataTable: any;
lang:string;
  constructor(private chRef: ChangeDetectorRef,
    private http: HttpClient, 
    public personnelServices:PersonnelServices,
     public router:Router,
     translate: TranslateService) 
     {
     this.lang=sessionStorage.getItem("lang");
     translate.use(this.lang);
      }

  ngOnInit() {
    this.doSearch();
    
  }
  doSearch(){
    this.personnelServices.getPersonnelsCompte(this.motCle,this.currentPage,this.size)
      .subscribe((data: any[]) => {
        this.pageUsers=data;
        // You'll have to wait that changeDetection occurs and projects data into 
        // the HTML template, you can ask Angular to that for you ;-)
        this.chRef.detectChanges();
        // Now you can use jQuery DataTables :
        const table: any = $('table');
        this.dataTable = table.DataTable();
      },err=>{
        console.log(err);
      })
  }
  chercherLogin()
  {
    this.doSearch();
  }
  gotopage(i:number)
  {
this.currentPage=i;
this.doSearch();
  }
  onEditUser(idUser:number){
this.router.navigate(['editUser',idUser]);
  }
  onDeleteUser(p:Personnel){
    let confirm=window.confirm("Etes-vous sûre?");
    if(confirm==true)
    {
      p.login=null;
      p.motpasse=null;
      this.personnelServices.updatePersonnel(p)
        .subscribe(data=> {
        this.pageUsers.content.splice(
        this.pageUsers.content.indexOf(p),1
          );
        },err=>{
          console.log(err);
        })
    } 
  }
}
