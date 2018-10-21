import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Administratif} from "../model/model.administratif";
@Injectable()
export class ImpressionServices {
  constructor(public http: Http) {
  }

  ImprimerRepriseTravail(idPers:number) {
    return this.http.get("http://localhost:8080/RepriseTravail?mc="+idPers)
      .map(resp => resp.json())
  }
  ImprimerRepriseMaladie(idCong:number) {
    return this.http.get("http://localhost:8080/RepriseConge?mc="+idCong)
      .map(resp => resp.json())
  }
  ImprimerFichePersonnel(idPers:number) {
    return this.http.get("http://localhost:8080/FichePersonnel?mc="+idPers)
      .map(resp => resp.json())
  }
  ImprimerListePersonnelDepartement(idDep:number,anneUniv:string) {
    return this.http.get("http://localhost:8080/ListeEnseignantDepartement?mc="+idDep+"&mp="+anneUniv)
      .map(resp => resp.json())
  }
  ImprimerListePersonnelGrade(idGrade:number,anneUniv:string) {
    return this.http.get("http://localhost:8080/ListeEnseignantGrade?mc="+idGrade+"&mp="+anneUniv)
      .map(resp => resp.json())
  }
  ImprimerListePersonnelCorps(idCps:number,anneUniv:string) {
    return this.http.get("http://localhost:8080/ListeEnseignantCorps?mc="+idCps+"&mp="+anneUniv)
      .map(resp => resp.json())
  }
  ImprimerListePersonnelActif(anneUniv:string) {
    return this.http.get("http://localhost:8080/ListeEnseignantActif?mc="+anneUniv)
      .map(resp => resp.json())
  }
  ImprimerListePersonnelInactif(anneUniv:string,annee:number) {
    return this.http.get("http://localhost:8080/ListeEnseignantInactif?mc="+anneUniv+"&mp="+annee)
      .map(resp => resp.json())
  }
  ImprimerListeMutation(anneUniv:string,annee:number) {
    return this.http.get("http://localhost:8080/ListeMutations?mc="+anneUniv+"&mp="+annee)
      .map(resp => resp.json())
  }
  ImprimerPrimeRendement(anneUniv:string,d1:Date,d2:Date) {
    return this.http.get("http://localhost:8080/PrimeRendement?mc="+anneUniv+"&d1="+d1+"&d2="+d2)
      .map(resp => resp.json())
  }
  ImprimerStatistique(anneUniv:string) {
    return this.http.get("http://localhost:8080/NomberEnseigParDep?mc="+anneUniv)
      .map(resp => resp.json())
  }
  ImprimerAttestation(idPers:number,sexe:string)
  {
    return this.http.get("http://localhost:8080/AttestationTravail?mc="+idPers+"&mp="+sexe)
      .map(resp=>resp.json())
  }
}