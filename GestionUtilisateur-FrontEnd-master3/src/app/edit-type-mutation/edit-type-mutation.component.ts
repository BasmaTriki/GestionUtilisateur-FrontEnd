import { Component, OnInit } from '@angular/core';
import {TypeMutation} from '../../model/model.typeMutation';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeMutationsServices} from '../../services/typeMutation.services';



@Component({
  selector: 'app-edit-type-mutation',
  templateUrl: './edit-type-mutation.component.html',
  styleUrls: ['./edit-type-mutation.component.css']
})
export class EditTypeMutationComponent implements OnInit {
  typeMutation:TypeMutation=new TypeMutation();
  code:number=0;
  constructor(public activatedRoute:ActivatedRoute,
              public typeMutationService:TypeMutationsServices,
              public router:Router) {
    this.code=activatedRoute.snapshot.params['code'];
  }

  ngOnInit() {
    this.typeMutationService.getTypeMutation(this.code)
      .subscribe(data=> {
        this.typeMutation = data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  updateTypeMutation(){
    this.typeMutationService.updateTypeMutation(this.typeMutation)
      .subscribe(data=>{
        console.log(data);
        alert("Mise à jour effectuée");
        this.router.navigate(['typeMutation']);
      },err=>{
        console.log(err);
        alert("Probléme");
      })
  }

}
