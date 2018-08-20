import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Enfant} from '../model/model.enfant';
import { AnneeUniversitaire } from '../model/model.anneeuniversitaire';
@Injectable()
export class AnneeUniversitaireServices {
  constructor(public http:Http) {}

  getAnnees(annee:number,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherAnneeUniversitaire?mc="+annee+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  getAnnee(id:number){
    return this.http.get("http://localhost:8080/anneeUniversitaire/"+id)
      .map(resp=>resp.json())
  }
  saveAnnee(anneeUniversitaire:AnneeUniversitaire){
    return this.http.post("http://localhost:8080/AjouterAnneeUniversitaire",anneeUniversitaire)
      .map(resp=>resp.json())
  }
  updateAnnee(anneeUniversitaire:AnneeUniversitaire){
    return this.http.put("http://localhost:8080/ModifierAnneeUniversitaire/"+anneeUniversitaire.id,anneeUniversitaire)
      .map(resp=>resp.json())
  }
  deleteAnnee(id:number){
    return this.http.delete("http://localhost:8080/SupprimerAnneeUniversitaire/"+id)
      .map(resp=>resp.json())
  }
  getAllAnnee()
  {
    return this.http.get("http://localhost:8080/anneeUniversitaires")
      .map(resp=>resp.json())
  }
}
