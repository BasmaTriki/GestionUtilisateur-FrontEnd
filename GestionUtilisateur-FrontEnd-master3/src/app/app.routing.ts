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
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ListeCongeNaccepterComponent } from './liste-conge-naccepter/liste-conge-naccepter.component';
import { ModalImportationComponent } from './modal-importation/modal-importation.component';
import { ListeEnseignantFonctionnaireComponent } from './liste-enseignant-fonctionnaire/liste-enseignant-fonctionnaire.component';
import { ListeEtatComponent } from './liste-etat/liste-etat.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { CongeAdminComponent } from './conge-admin/conge-admin.component';
import { CongeAutoComponent } from './conge-auto/conge-auto.component';
import { MutationAdminComponent } from './mutation-admin/mutation-admin.component';
import { AuthGuard } from '../services/autho-garde.services';
import { EnseignantContractuelleComponent } from './enseignant-contractuelle/enseignant-contractuelle.component';
import { ImprimerFicheComponent } from './imprimer-fiche/imprimer-fiche.component';
import { ListeEnseignantContractuelComponent } from './liste-enseignant-contractuel/liste-enseignant-contractuel.component';
import { EditEnseignantLibreComponent } from './edit-enseignant-libre/edit-enseignant-libre.component';
import { ModalDemandeVacComponent } from './modal-demande-vac/modal-demande-vac.component';
import { PersonnelCongeComponent } from './personnel-conge/personnel-conge.component';
const appRoutes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'users', canActivate: [AuthGuard],component:UsersComponent},
  {path:'new-user', canActivate: [AuthGuard],component:NewUserComponent},
  {path:'editUser/:idUser', canActivate: [AuthGuard],component:EditUserComponent},
  {path:'navbar', canActivate: [AuthGuard],component:NavbarComponent},
  {path:'sidebar', canActivate: [AuthGuard],component:SideBarComponent},
  {path:'index', canActivate: [AuthGuard],component:IndexComponent},
  {path:'enseignantpermanent', canActivate: [AuthGuard],component:EnseignantPermanentComponent},
  {path:'diplome', canActivate: [AuthGuard],component:DiplomeComponent},
  {path:'editDiplome/:idDip', canActivate: [AuthGuard],component:EditDiplomeComponent},
  {path:'departement', canActivate: [AuthGuard],component:DepartementComponent},
  {path:'editdepartement/:idDep', canActivate: [AuthGuard],component:EditDepartementComponent},
  {path:'corps', canActivate: [AuthGuard],component:CorpsComponent},
  {path:'editCorps/:idcps', canActivate: [AuthGuard],component:EditCorpsComponent},
  {path:'grade', canActivate: [AuthGuard],component:GradeComponent},
  {path:'editGrade/:id', canActivate: [AuthGuard],component:EditGradeComponent},
  {path:'conge', canActivate: [AuthGuard],component:CongeComponent},
  {path:'congeAdmin', canActivate: [AuthGuard],component:CongeAdminComponent},
  {path:'consultationConge', canActivate: [AuthGuard],component:ConsultationCongeComponent},
  {path:'typeConge', canActivate: [AuthGuard],component:TypeCongeComponent},
  {path:'typeMutation', canActivate: [AuthGuard],component:TypeMutationComponent},
  {path:'DiplomePersonnel', canActivate: [AuthGuard],component:DiplomePersonnelComponent},
  {path:'mutation', canActivate: [AuthGuard],component:MutationComponent},
  {path:'editConge', canActivate: [AuthGuard],component:EditCongeComponent},
  {path:'editTypeConge/:idCg', canActivate: [AuthGuard],component:EditTypeCongeComponent},
  {path:'editTypeMutation/:code', canActivate: [AuthGuard],component:EditTypeMutationComponent},
  {path:'posteAdmin', canActivate: [AuthGuard],component:PosteAdministrativeComponent},
  {path:'ModalMutation', canActivate: [AuthGuard],component:ModalMutationComponent},
  {path:'Agrade', canActivate: [AuthGuard],component:AGradeComponent},
  {path:'ListeMutation', canActivate: [AuthGuard],component:ListeMutationComponent},
  {path:'editAgrade/:id_agrade', canActivate: [AuthGuard],component:EditAgradeComponent},
  {path:'periode', canActivate: [AuthGuard],component:PeriodeComponent},
  {path:'DetailsEnseignantP/:idPers', canActivate: [AuthGuard],component:DetailsEnseignantComponent},
  {path:'EditEnseignantP/:idPers', canActivate: [AuthGuard],component:EditEnseignantPermanentComponent},
  {path:'EditAdministratif/:idPers', canActivate: [AuthGuard],component:EditAdministratifComponent},
  {path:'editPosteAdmin/:id', canActivate: [AuthGuard],component:EditPosteAdministrativeComponent},
  {path:'editMutation/:idMut', canActivate: [AuthGuard],component:EditMutationComponent},
  {path:'congePersonnel', canActivate: [AuthGuard],component:CongePersonnelComponent},
  {path:'editSpecialite/:idSp', canActivate: [AuthGuard],component:EditSpecialiteComponent},
  {path:'historiqueConge/:idPers', canActivate: [AuthGuard],component:HistoriqueCongeComponent},
  {path:'personnelhistorique', canActivate: [AuthGuard],component:PersonnelHistoriqueComponent},
  {path:'specialite', canActivate: [AuthGuard],component:SpecialiteComponent},
  {path:'service', canActivate: [AuthGuard],component:ServiceComponent},
  {path:'personnel', canActivate: [AuthGuard],component:PersonnelComponent},
  {path:'modalConge', canActivate: [AuthGuard],component:ModalCongeComponent},
  {path:'administratif', canActivate: [AuthGuard],component:AdministratifComponent},
  {path:'profile', canActivate: [AuthGuard],component:ProfileComponent},
  {path:'personnelConge', canActivate: [AuthGuard],component:PersonnelCongeComponent},
  {path:'ListePersonnel', canActivate: [AuthGuard],component:ListeEnseignantPermanentComponent},
  {path:'ListeVacation', canActivate: [AuthGuard],component:ListeEnseignantVacataireComponent},
  {path:'OrgAccueil', canActivate: [AuthGuard],component:OrganismeAccueilComponent},
  {path:'CongeRattraper', canActivate: [AuthGuard],component:ListeCongeRattrapeComponent},
  {path:'CongeRefuser', canActivate: [AuthGuard],component:ListeCongeNaccepterComponent},
  {path:'editOrganisme/:idOrg', canActivate: [AuthGuard],component:EditOrganismeComponent},
  {path:'Enfant', canActivate: [AuthGuard],component:EnfantsComponent},
  {path:'RepriseConge', canActivate: [AuthGuard],component:RepriseCongeComponent},
  {path:'demandeVacation',component:EnseignantVacataireComponent},
  {path:'ModalDemande',component:ModalDemandeVacComponent},
  {path:'ConsultationVacation', canActivate: [AuthGuard],component:ConsultationVacationComponent},
  {path:'ModalVacation', canActivate: [AuthGuard],component:ModalVacationComponent},
  {path:'enseignantContractuelle', canActivate: [AuthGuard],component:EnseignantContractuelleComponent},
  {path:'ListeConge', canActivate: [AuthGuard],component:ListeCongeComponent},
  {path:'CongeMensuel', canActivate: [AuthGuard],component:CongeMensuelComponent},
  {path:'CongeAutoriser', canActivate: [AuthGuard],component:CongeAutoComponent},
  {path:'MutationAdmin', canActivate: [AuthGuard],component:MutationAdminComponent},
  {path:'AjouterVacataire', canActivate: [AuthGuard],component:AjouterVacataireComponent},
  {path:'ListeEtat', canActivate: [AuthGuard],component:ListeEtatComponent},
  {path:'Statistique', canActivate: [AuthGuard],component:StatistiqueComponent},
  {path:'ListeAdmin', canActivate: [AuthGuard],component:ListeAdministratifComponent},
  {path:'ListeEnseignantFonct', canActivate: [AuthGuard],component:ListeEnseignantFonctionnaireComponent},
  {path:'importer', canActivate: [AuthGuard],component:ModalImportationComponent},
  {path:'imprimer', canActivate: [AuthGuard],component:ImprimerFicheComponent},
  {path:'ListeEnseigContractuel', canActivate: [AuthGuard],component:ListeEnseignantContractuelComponent},
  {path:'editService/:idServ', canActivate: [AuthGuard],component:EditServiceComponent},
  {path:'editVacationLibre/:idPers', canActivate: [AuthGuard],component:EditEnseignantLibreComponent},
  {path:'AjouterVacataire/:idDemande', canActivate: [AuthGuard],component:AjouterVacataireComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent, UsersComponent, NewUserComponent,
  EditUserComponent,NavbarComponent,SideBarComponent,IndexComponent,EnseignantPermanentComponent,DiplomeComponent]

