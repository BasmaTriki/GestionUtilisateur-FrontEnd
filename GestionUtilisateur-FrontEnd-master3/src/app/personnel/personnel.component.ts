import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  TypePersonnel = [
    {value: 'Enseignant'},
    {value: 'Administratif'}
  ];
  type:string="Enseignant";
  lang:string;
  TypePersonnelAr = [
    {value: 'أستاذ'},
    {value: 'إداري'}
  ];
  typeAr:string="أستاذ";
  constructor(private translate: TranslateService) 
  {//translate.setDefaultLang('fr');
    this.lang=sessionStorage.getItem("lang");
    translate.use(this.lang);
  }

  ngOnInit() {
  }

}
