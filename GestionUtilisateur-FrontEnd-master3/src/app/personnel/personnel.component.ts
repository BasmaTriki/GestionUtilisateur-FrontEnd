import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  TypePersonnel = [
    {value: 'Enseignant Permanent'},
    {value: 'Enseignant Contractuel'},
    {value: 'Administratif'}
  ];
  type:string="";
  lang:string;
  TypePersonnelAr = [
    {value: 'أستاذ قار'},
    {value: 'أستاذ متعاقد'},
    {value: 'إداري'}
  ];
  constructor(private translate: TranslateService) 
  {//translate.setDefaultLang('fr');
    this.lang=sessionStorage.getItem("lang");
    translate.use(this.lang);
  }

  ngOnInit() {
    if(this.lang=='ar')
    {
      this.type="أستاذ قار";
    }
    else
    {
      this.type="Enseignant Permanent";
    }
  }

}
