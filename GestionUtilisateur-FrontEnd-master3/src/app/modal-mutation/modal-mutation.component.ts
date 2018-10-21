import { Component, OnInit, Inject } from '@angular/core';
import { TypeMutationsServices } from '../../services/typeMutation.services';
import { OrganismeServices } from '../../services/organisme.services';
import { MutationServices } from '../../services/Mutation.services';
import { EtatServices } from '../../services/etat.services';
import { PersonnelServices } from '../../services/personnel.services';
import { Mutation } from '../../model/model.mutation';
import { Personnel } from '../../model/model.personnel';
import { TypeMutation } from '../../model/model.typeMutation';
import { Organisme } from '../../model/model.organisme';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Etat } from '../../model/model.etat';
import { EtatPersonnel } from '../../model/model.etatPersonnel';
import { EtatPersonnelServices } from '../../services/etatPersonnel.services';

@Component({
  selector: 'app-modal-mutation',
  templateUrl: './modal-mutation.component.html',
  styleUrls: ['./modal-mutation.component.css']
})
export class ModalMutationComponent implements OnInit {
  mutation:Mutation=new Mutation();
  mutations:Array<Mutation>=new Array<Mutation>();
  personnels:Array<Personnel>=new Array<Personnel>();
  personnel:Personnel=new Personnel();
  typeMutation:TypeMutation;
  typeMutations:Array<TypeMutation>=new Array<TypeMutation>();
  orgAccueil:Organisme=new Organisme();
  orgAccueils:Array<Organisme>=new Array<Organisme>();
  nom:string="";
  idPers:number;
  etat:Etat=new Etat();
  lang:string;
  etatPersonnel:EtatPersonnel=new EtatPersonnel();
  constructor(private typeMutationServices:TypeMutationsServices,
    private orgAccueilServices:OrganismeServices,
    private etatPersonnelServices:EtatPersonnelServices,
    public dialogRef: MatDialogRef<ModalMutationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mutationServices:MutationServices,
    private personnelServices:PersonnelServices) 
    {
    this.lang=sessionStorage.getItem("lang");
     }

  ngOnInit() {
    this.nom=this.data.name;
    this.idPers=Number(this.data.idPers);
    this.personnelServices.getPersonnel(this.idPers)
    .subscribe(data=>{
      this.personnel=data;
      console.log(data);
    },err=>{
      console.log(err);
    });
    this.chercherType();
    this.chercherOrg();
  }
  chercherType()
  {
    this.typeMutationServices.allTypesMutations()
      .subscribe(data=>{
        this.typeMutations=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  chercherOrg()
  {
    this.orgAccueilServices.allOrganismeAccueils()
      .subscribe(data=>{
        this.orgAccueils=data;
        console.log(data);
      },err=>{
        console.log(err);
      })
  }
  ajouter(){
   this.etat.idEtat=2;
   this.etat.libelleEtat="non-actif";
   this.personnel.etat=this.etat;
    this.mutation.personnel=this.personnel;
    this.mutation.typemutation=this.typeMutation;
    this.mutation.organismeAccueil=this.orgAccueil;
    this.mutationServices.saveMutation(this.mutation)
      .subscribe(data=>{
        alert("Success d'ajout");
        console.log(data);
        //this.personnel.mutation.push(data);
        console.log(this.personnel);
      },err=>{
        console.log(err);
      })
    this.personnelServices.updatePersonnel(this.personnel)
      .subscribe(data=>{
        console.log(data);
      },err=>{
        console.log(err);
      })
    this.etatPersonnel.personnel=this.personnel;
    this.etatPersonnel.etatInactive=this.typeMutation.designationMutation+" à "+this.orgAccueil.libelleOrg;
    this.etatPersonnel.etatInactiveAr=this.typeMutation.designationMutationAr+" إلى "+this.orgAccueil.libelleOrgAr;
    this.etatPersonnelServices.saveEtatPersonnel(this.etatPersonnel)
     .subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
    this.Close();
  }
  Close()
  {
    this.dialogRef.close();
  }
}
