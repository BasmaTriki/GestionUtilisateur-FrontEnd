import { Component, OnInit } from '@angular/core';
import {PosteAdministrative} from '../../model/model.posteAdministrative';
import {ActivatedRoute, Router} from '@angular/router';
import {PosteAdministrativeServices} from '../../services/posteAdministrative.services';

@Component({
  selector: 'app-edit-poste-administrative',
  templateUrl: './edit-poste-administrative.component.html',
  styleUrls: ['./edit-poste-administrative.component.css']
})
export class EditPosteAdministrativeComponent implements OnInit {
  posteAdmin: PosteAdministrative = new PosteAdministrative();
  id: number = 0;

  constructor(public activatedRoute: ActivatedRoute,
              public posteAdminService: PosteAdministrativeServices,
              public router: Router) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.posteAdminService.getPoste(this.id)
      .subscribe(data => {
        this.posteAdmin = data;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  updatePosteAdmin() {
    this.posteAdminService.updatePoste(this.posteAdmin)
      .subscribe(data => {
        console.log(data);
        alert("Mise à jour effectuée");
        this.router.navigate(['poste']);
      }, err => {
        console.log(err);
        alert("Probléme");
      })
  }
}
