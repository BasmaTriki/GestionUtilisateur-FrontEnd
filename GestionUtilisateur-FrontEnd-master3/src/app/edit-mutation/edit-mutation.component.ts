import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Mutation} from '../../model/model.mutation';
import {MutationServices} from '../../services/Mutation.services';

@Component({
  selector: 'app-edit-mutation',
  templateUrl: './edit-mutation.component.html',
  styleUrls: ['./edit-mutation.component.css']
})
export class EditMutationComponent implements OnInit {
  mutation:Mutation=new Mutation();
  id_mut:number=0;
  constructor(public activatedRoute:ActivatedRoute,
              public mutationService:MutationServices,
              public router:Router) {
    this.id_mut=activatedRoute.snapshot.params['idMut'];
  }

  ngOnInit() {
    this.mutationService.getMutation(this.id_mut)
      .subscribe(data=> {
        this.mutation = data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  updateMutation(){
    this.mutationService.updateMutation(this.mutation)
      .subscribe(data=>{
        console.log(data);
        alert("Mise à jour effectuée");
        this.router.navigate(['mutation']);
      },err=>{
        console.log(err);
        alert("Probléme");
      })
  }


}
