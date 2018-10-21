import { Component, OnInit } from '@angular/core';
import { Organisme } from '../../model/model.organisme';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganismeServices } from '../../services/organisme.services';

@Component({
  selector: 'app-edit-organisme',
  templateUrl: './edit-organisme.component.html',
  styleUrls: ['./edit-organisme.component.css']
})
export class EditOrganismeComponent implements OnInit {
  idOrg:number=0;
  organisme:Organisme=new Organisme();
  constructor(public activatedRoute:ActivatedRoute,
    private organismeServices:OrganismeServices,
    public router:Router) 
    { 
      this.idOrg=activatedRoute.snapshot.params['idOrg'];
    }

  ngOnInit() {
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
      alert("Mise à jour effectuée");
      this.router.navigate(['OrgAccueil']);
      console.log(data);
    },err=>{
      console.log(err);
    })
  }

}
