import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users.component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
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
import {PosteAdministrativeComponent} from "./poste-administrative/poste-administrative.component";
import {EditMutationComponent} from "./edit-mutation/edit-mutation.component";
import {DiplomePersonnelComponent} from "./diplome-personnel/diplome-personnel.component";
import {AGradeComponent} from "./a-grade/a-grade.component";
import {PeriodeComponent} from "./periode/periode.component";
import {DetailsEnseignantComponent} from "./details-enseignant/details-enseignant.component";
import {EditAgradeComponent} from "./edit-agrade/edit-agrade.component";
import {EditEnseignantPermanentComponent} from "./edit-enseignant-permanent/edit-enseignant-permanent.component";
import {HistoriqueCongeComponent} from "./historique-conge/historique-conge.component";
import {SpecialiteComponent} from "./specialite/specialite.component";
import {EditSpecialiteComponent} from "./edit-specialite/edit-specialite.component";
import {OrganismeAccueilComponent} from "./organisme-accueil/organisme-accueil.component";
import {ServiceComponent} from "./service/service.component";
import {PersonnelComponent} from "./personnel/personnel.component";
import {AdministratifComponent} from "./administratif/administratif.component";
import { EnseignantVacataireComponent } from './enseignant-vacataire/enseignant-vacataire.component';
import { ProfileComponent } from './profile/profile.component';
import { CongePersonnelComponent } from './conge-personnel/conge-personnel.component';
import { ModalCongeComponent } from './modal-conge/modal-conge.component';
import { EnfantsComponent } from './enfants/enfants.component';
import { EditAdministratifComponent } from './edit-administratif/edit-administratif.component';
import { RepriseCongeComponent } from './reprise-conge/reprise-conge.component';
import { PersonnelHistoriqueComponent } from './personnel-historique/personnel-historique.component';
import { ConsultationVacationComponent } from './consultation-vacation/consultation-vacation.component';
import { ModalVacationComponent } from './modal-vacation/modal-vacation.component';
import { AjouterVacataireComponent } from './ajouter-vacataire/ajouter-vacataire.component';
import { ListeEnseignantPermanentComponent } from './liste-enseignant-permanent/liste-enseignant-permanent.component';
import { ListeEnseignantVacataireComponent } from './liste-enseignant-vacataire/liste-enseignant-vacataire.component';
import { ListeCongeComponent } from './liste-conge/liste-conge.component';
import { CongeMensuelComponent } from './conge-mensuel/conge-mensuel.component';
import { ListeAdministratifComponent } from './liste-administratif/liste-administratif.component';
import { EditPosteAdministrativeComponent } from './edit-poste-administratif/edit-poste-administrative.component';
import { ModalMutationComponent } from './modal-mutation/modal-mutation.component';
import { ListeMutationComponent } from './liste-mutation/liste-mutation.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { EditOrganismeComponent } from './edit-organisme/edit-organisme.component';
import { ListeCongeRattrapeComponent } from './liste-conge-rattrape/liste-conge-rattrape.component';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { TranslateHttpLoader } from '../../node_modules/@ngx-translate/http-loader';
const appRoutes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'users',component:UsersComponent},
  {path:'new-user',component:NewUserComponent},
  {path:'editUser/:idUser',component:EditUserComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'sidebar',component:SideBarComponent},
  {path:'index',component:IndexComponent},
  {path:'enseignantpermanent',component:EnseignantPermanentComponent},
  {path:'diplome',component:DiplomeComponent},
  {path:'editDiplome/:idDip',component:EditDiplomeComponent},
  {path:'departement',component:DepartementComponent},
  {path:'editdepartement/:idDep',component:EditDepartementComponent},
  {path:'corps',component:CorpsComponent},
  {path:'editCorps/:idcps',component:EditCorpsComponent},
  {path:'grade',component:GradeComponent},
  {path:'editGrade/:id',component:EditGradeComponent},
  {path:'conge',component:CongeComponent},
  {path:'consultationConge',component:ConsultationCongeComponent},
  {path:'typeConge',component:TypeCongeComponent},
  {path:'typeMutation',component:TypeMutationComponent},
  {path:'DiplomePersonnel',component:DiplomePersonnelComponent},
  {path:'mutation',component:MutationComponent},
  {path:'editConge/:idCong',component:EditCongeComponent},
  {path:'editTypeConge/:idCg',component:EditTypeCongeComponent},
  {path:'editTypeMutation/:code',component:EditTypeMutationComponent},
  {path:'posteAdmin',component:PosteAdministrativeComponent},
  {path:'ModalMutation',component:ModalMutationComponent},
  {path:'Agrade',component:AGradeComponent},
  {path:'ListeMutation',component:ListeMutationComponent},
  {path:'editAgrade/:id_agrade',component:EditAgradeComponent},
  {path:'periode',component:PeriodeComponent},
  {path:'DetailsEnseignantP/:idPers',component:DetailsEnseignantComponent},
  {path:'EditEnseignantP/:idPers',component:EditEnseignantPermanentComponent},
  {path:'EditAdministratif/:idPers',component:EditAdministratifComponent},
  {path:'editPosteAdmin/:id',component:EditPosteAdministrativeComponent},
  {path:'editMutation/:idMut',component:EditMutationComponent},
  {path:'congePersonnel',component:CongePersonnelComponent},
  {path:'editSpecialite/:idSp',component:EditSpecialiteComponent},
  {path:'historiqueConge/:idPers',component:HistoriqueCongeComponent},
  {path:'personnelhistorique',component:PersonnelHistoriqueComponent},
  {path:'specialite',component:SpecialiteComponent},
  {path:'service',component:ServiceComponent},
  {path:'personnel',component:PersonnelComponent},
  {path:'modalConge',component:ModalCongeComponent},
  {path:'administratif',component:AdministratifComponent},
  {path:'profile',component:ProfileComponent},
  {path:'ListePersonnel',component:ListeEnseignantPermanentComponent},
  {path:'ListeVacation',component:ListeEnseignantVacataireComponent},
  {path:'OrgAccueil',component:OrganismeAccueilComponent},
  {path:'CongeRattraper',component:ListeCongeRattrapeComponent},
  {path:'editOrganisme/:idOrg',component:EditOrganismeComponent},
  {path:'Enfant',component:EnfantsComponent},
  {path:'RepriseConge',component:RepriseCongeComponent},
  {path:'demandeVacation',component:EnseignantVacataireComponent},
  {path:'ConsultationVacation',component:ConsultationVacationComponent},
  {path:'ModalVacation',component:ModalVacationComponent},
  {path:'ListeConge',component:ListeCongeComponent},
  {path:'CongeMensuel',component:CongeMensuelComponent},
  {path:'AjouterVacataire',component:AjouterVacataireComponent},
  {path:'ListeAdmin',component:ListeAdministratifComponent},
  {path:'editService/:idServ',component:EditServiceComponent},
  {path:'AjouterVacataire/:idDemande',component:AjouterVacataireComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
/*     TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory:(createTranslateLoader),
          deps: [HttpClient]
      }
  }) */
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent, UsersComponent, NewUserComponent,
  EditUserComponent,NavbarComponent,SideBarComponent,IndexComponent,EnseignantPermanentComponent,DiplomeComponent]

