import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { EnseignantPermanentComponent } from './enseignant-permanent/enseignant-permanent.component';
import {AppRoutingModule} from './app.routing';
import { DiplomeComponent } from './diplome/diplome.component';
import {EnfantServices} from '../services/enfant.services';
import {DiplomeServices} from '../services/diplome.services';
import { EditDiplomeComponent } from './edit-diplome/edit-diplome.component';
import { GradeComponent } from './grade/grade.component';
import { EditGradeComponent } from './edit-grade/edit-grade.component';
import { DepartementComponent } from './departement/departement.component';
import { EditDepartementComponent } from './edit-departement/edit-departement.component';
import { CorpsComponent } from './corps/corps.component';
import { EditCorpsComponent } from './edit-corps/edit-corps.component';
import {GradeServices} from "../services/grade.services";
import {DepartementServices} from "../services/departement.services";
import {EnseignantPermanentServices} from "../services/enseignantpermanent.services";
import {AGradeServices} from "../services/agrade.services";
import {DiplomePersonnelServices} from "../services/diplomepersonnel.services";
import {NotificationsModule, NotificationsService} from 'angular4-notify';
import {
  MatButtonModule,
  MatTabsModule,
  MatSelectModule,
  MatExpansionModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatListModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatIconModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatTooltipModule, MatSidenavModule, MatDialogModule, MatSnackBarModule, MatSlideToggleModule
} from '@angular/material';
// For MDB Angular Free
import { NavbarModule, WavesModule } from 'angular-bootstrap-md'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import '../polyfills';
import {CorpsServices} from "../services/corps.services";
import { TypeMutationComponent } from './type-mutation/type-mutation.component';
import { TypeCongeComponent } from './type-conge/type-conge.component';
import { EditTypeMutationComponent } from './edit-type-mutation/edit-type-mutation.component';
import { EditTypeCongeComponent } from './edit-type-conge/edit-type-conge.component';
import { CongeComponent } from './conge/conge.component';
import { EditCongeComponent } from './edit-conge/edit-conge.component';
import { EditMutationComponent } from './edit-mutation/edit-mutation.component';
import { MutationComponent } from './mutation/mutation.component';
import { ConsultationCongeComponent } from './consultation-conge/consultation-conge.component';
import {TypeCongeServices} from "../services/typeConge.services";
import {CongeServices} from "../services/conge.services";
import {TypeMutationsServices} from "../services/typeMutation.services";
import {MutationServices} from "../services/Mutation.services";
import { AnneeUniversitaireComponent } from './annee-universitaire/annee-universitaire.component';
import { SemestreComponent } from './semestre/semestre.component';
import { PosteAdministrativeComponent } from './poste-administrative/poste-administrative.component';
import { EditPosteAdministrativeComponent } from './edit-poste-administratif/edit-poste-administrative.component';
import {PosteAdministrativeServices} from "../services/posteAdministrative.services";
import { DiplomePersonnelComponent } from './diplome-personnel/diplome-personnel.component';
import {FormControl, Validators} from '@angular/forms';
import { ListeEnseignantPermanentComponent } from './liste-enseignant-permanent/liste-enseignant-permanent.component';
import { AGradeComponent } from './a-grade/a-grade.component';
import { PeriodeComponent } from './periode/periode.component';
import {PeriodeServices} from "../services/periode.services";
import { DetailsEnseignantComponent } from './details-enseignant/details-enseignant.component';
import { HistoriqueCongeComponent } from './historique-conge/historique-conge.component';
import { EditAgradeComponent } from './edit-agrade/edit-agrade.component';
import { EnfantsComponent } from './enfants/enfants.component';
import {PersonnelServices} from "../services/personnel.services";
import { EditEnseignantPermanentComponent } from './edit-enseignant-permanent/edit-enseignant-permanent.component';
import { SpecialiteComponent } from './specialite/specialite.component';
import { OrganismeAccueilComponent } from './organisme-accueil/organisme-accueil.component';
import {SpecialiteServices} from "../services/specialite.services";
import { EditSpecialiteComponent } from './edit-specialite/edit-specialite.component';
import {OrganismeServices} from "../services/organisme.services";
import { ServiceComponent } from './service/service.component';
import {ServiceServices} from "../services/service.services";
import {AdministratifServices} from "../services/administratif.services";
import { AdministratifComponent } from './administratif/administratif.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { ProfileComponent } from './profile/profile.component';
import { EnseignantVacataireComponent } from './enseignant-vacataire/enseignant-vacataire.component';
import { DemandeVacationServices } from '../services/demandeVacation.services';
import { CongePersonnelComponent } from './conge-personnel/conge-personnel.component';
import { DataTablesModule } from 'angular-datatables';
import { ModalCongeComponent } from './modal-conge/modal-conge.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EditAdministratifComponent } from './edit-administratif/edit-administratif.component';
import { RepriseCongeComponent } from './reprise-conge/reprise-conge.component';
import { RoleServices } from '../services/role.services';
import { PersonnelHistoriqueComponent } from './personnel-historique/personnel-historique.component';
import { ConsultationVacationComponent } from './consultation-vacation/consultation-vacation.component';
import { AjouterVacataireComponent } from './ajouter-vacataire/ajouter-vacataire.component';
import { ModalVacationComponent } from './modal-vacation/modal-vacation.component';
import { EnseignantFonctionnaireEtatServices } from '../services/enseignantFonctionnaireEtat.services';
import { EnseignantLibreServices } from '../services/enseignantlibre.services';
import { ListeEnseignantVacataireComponent } from './liste-enseignant-vacataire/liste-enseignant-vacataire.component';
import { ListeCongeComponent } from './liste-conge/liste-conge.component';
import { CongeMensuelComponent } from './conge-mensuel/conge-mensuel.component';
import { AnneeUniversitaireServices } from '../services/anneeUniversitaire.services';
import { EtatServices } from '../services/etat.services';
import { ListeAdministratifComponent } from './liste-administratif/liste-administratif.component';
import { ListeCongeNaccepterComponent } from './liste-conge-naccepter/liste-conge-naccepter.component';
import { ListeCongeRattrapeComponent } from './liste-conge-rattrape/liste-conge-rattrape.component';
import { ModalMutationComponent } from './modal-mutation/modal-mutation.component';
import { ListeMutationComponent } from './liste-mutation/liste-mutation.component';
import { EditOrganismeComponent } from './edit-organisme/edit-organisme.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule ({
  declarations: [
    AppComponent,
    UsersComponent,
    NewUserComponent,
    EditUserComponent,
    LoginComponent,
    IndexComponent,
    NavbarComponent,
    FooterComponent,
    SideBarComponent,
    EnseignantPermanentComponent,
    DiplomeComponent,
    EditDiplomeComponent,
    GradeComponent,
    EditGradeComponent,
    DepartementComponent,
    EditDepartementComponent,
    CorpsComponent,
    EditCorpsComponent,
    TypeMutationComponent,
    TypeCongeComponent,
    EditTypeMutationComponent,
    EditTypeCongeComponent,
    CongeComponent,
    EditCongeComponent,
    EditMutationComponent,
    MutationComponent,
    ConsultationCongeComponent,
    AnneeUniversitaireComponent,
    SemestreComponent,
    PosteAdministrativeComponent,
    EditPosteAdministrativeComponent,
    DiplomePersonnelComponent,
    ListeEnseignantPermanentComponent,
    AGradeComponent,
    PeriodeComponent,
    DetailsEnseignantComponent,
    HistoriqueCongeComponent,
    EditAgradeComponent,
    EnfantsComponent,
    EditEnseignantPermanentComponent,
    SpecialiteComponent,
    OrganismeAccueilComponent,
    EditSpecialiteComponent,
    ServiceComponent,
    AdministratifComponent,
    PersonnelComponent,
    EditServiceComponent,
    ProfileComponent,
    EnseignantVacataireComponent,
    CongePersonnelComponent,
    ModalCongeComponent,
    EditAdministratifComponent,
    RepriseCongeComponent,
    PersonnelHistoriqueComponent,
    ConsultationVacationComponent,
    AjouterVacataireComponent,
    ModalVacationComponent,
    ListeEnseignantVacataireComponent,
    ListeCongeComponent,
    CongeMensuelComponent,
    ListeAdministratifComponent,
    ListeCongeNaccepterComponent,
    ListeCongeRattrapeComponent,
    ModalMutationComponent,
    ListeMutationComponent,
    EditOrganismeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatSidenavModule,
    NavbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    NotificationsModule,
    DataTablesModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory:HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [PeriodeServices,EnfantServices,CorpsServices,DiplomeServices,GradeServices,DepartementServices,EnseignantPermanentServices,AGradeServices,DiplomePersonnelServices,TypeCongeServices,CongeServices,MutationServices,
    TypeMutationsServices,RoleServices,EtatServices,NotificationsService,AnneeUniversitaireServices,PosteAdministrativeServices,DemandeVacationServices,PersonnelServices,SpecialiteServices,OrganismeServices,ServiceServices,AdministratifServices,EnseignantFonctionnaireEtatServices,EnseignantLibreServices],
  bootstrap: [AppComponent]
})
export class AppModule {
}
