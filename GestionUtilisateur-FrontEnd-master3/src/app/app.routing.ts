import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {UsersServices} from '../services/users.services';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import {CommonModule} from "@angular/common";
import {EnseignantPermanentComponent} from './enseignant-permanent/enseignant-permanent.component';
import {NavbarComponent} from './navbar/navbar.component';
import {IndexComponent} from './index/index.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {DiplomeComponent} from './diplome/diplome.component';
import {EditDiplomeComponent} from './edit-diplome/edit-diplome.component';
import {GradeComponent} from "./grade/grade.component";
import {EditGradeComponent} from "./edit-grade/edit-grade.component";
import {DepartementComponent} from "./departement/departement.component";
import {EditDepartementComponent} from "./edit-departement/edit-departement.component";
import {CorpsComponent} from "./corps/corps.component";
import {EditCorpsComponent} from "./edit-corps/edit-corps.component";
import {CongeComponent} from "./conge/conge.component";
import {ConsultationCongeComponent} from "./consultation-conge/consultation-conge.component";
import {TypeCongeComponent} from "./type-conge/type-conge.component";
import {TypeMutationComponent} from "./type-mutation/type-mutation.component";
import {EditTypeCongeComponent} from "./edit-type-conge/edit-type-conge.component";
import {MutationComponent} from "./mutation/mutation.component";
import {EditCongeComponent} from "./edit-conge/edit-conge.component";
import {EditTypeMutationComponent} from "./edit-type-mutation/edit-type-mutation.component";
import {EditPosteAdministrativeComponent} from "./edit-poste-administrative/edit-poste-administrative.component";
import {PosteAdministrativeComponent} from "./poste-administrative/poste-administrative.component";
import {EditMutationComponent} from "./edit-mutation/edit-mutation.component";
import {ListeEnseignantPermanentComponent} from "./liste-enseignant-permanent/liste-enseignant-permanent.component";
import {DiplomePersonnelComponent} from "./diplome-personnel/diplome-personnel.component";
import {AGradeComponent} from "./a-grade/a-grade.component";
import {PeriodeComponent} from "./periode/periode.component";
import {DetailsEnseignantComponent} from "./details-enseignant/details-enseignant.component";
import {EditAgradeComponent} from "./edit-agrade/edit-agrade.component";


const appRoutes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'users',component:UsersComponent},
  {path:'new-user',component:NewUserComponent},
  {path:'editUser/:login',component:EditUserComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'sidebar',component:SideBarComponent},
  {path:'index',component:IndexComponent},
  {path:'enseignantpermanent',component:EnseignantPermanentComponent},
  {path:'diplome',component:DiplomeComponent},
  {path:'editDiplome/:idDip',component:EditDiplomeComponent},
  {path:'departement',component:DepartementComponent},
  {path:'editdepartement/:idDep',component:EditDepartementComponent},
  {path:'corps',component:CorpsComponent},
  {path:'editCorps/:idcrp',component:EditCorpsComponent},
  {path:'grade',component:GradeComponent},
  {path:'editGrade/:id',component:EditGradeComponent},
  {path:'conge',component:CongeComponent},
  {path:'consultationConge',component:ConsultationCongeComponent},
  {path:'typeConge',component:TypeCongeComponent},
  {path:'typeMutation',component:TypeMutationComponent},
  {path:'ListeEnseignantP',component:ListeEnseignantPermanentComponent},
  {path:'DiplomePersonnel',component:DiplomePersonnelComponent},
  {path:'mutation',component:MutationComponent},
  {path:'editConge/:idCong',component:EditCongeComponent},
  {path:'editTypeConge/:idCg',component:EditTypeCongeComponent},
  {path:'editTypeMutation/:code',component:EditTypeMutationComponent},
  {path:'posteAdmin',component:PosteAdministrativeComponent},
  {path:'Agrade',component:AGradeComponent},
  {path:'editAgrade/:id_agrade',component:EditAgradeComponent},
  {path:'periode',component:PeriodeComponent},
  {path:'DetailsEnseignant/:matricule',component:DetailsEnseignantComponent},
  {path:'editPosteAdmin/:id',component:EditPosteAdministrativeComponent},
  {path:'editMutation/:idMut',component:EditMutationComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}

];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent, UsersComponent, NewUserComponent,
  EditUserComponent,NavbarComponent,SideBarComponent,IndexComponent,EnseignantPermanentComponent,DiplomeComponent]

