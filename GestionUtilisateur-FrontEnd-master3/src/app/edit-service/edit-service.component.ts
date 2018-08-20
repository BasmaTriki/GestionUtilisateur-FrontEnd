import { Component, OnInit } from '@angular/core';
import { ServiceServices } from '../../services/service.services';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { Service } from '../../model/model.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  idServ: number = 0;
  service:Service=new Service();
  constructor(public activatedRoute: ActivatedRoute,
    public serviceServices: ServiceServices,
    public router: Router) 
    {
      this.idServ = activatedRoute.snapshot.params['idServ'];
     }

  ngOnInit() 
  {
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
}
