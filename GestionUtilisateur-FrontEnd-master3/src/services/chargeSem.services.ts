import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { ChargeSem } from '../model/model.chargeSem';
@Injectable()
export class ChargeSemestreServices {
  constructor(public http:Http) {}

  getChargeSemestres(description:string,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherChargeSemestre?mc="+description+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  getChargeEnseignant(idPers:number){
    return this.http.get("http://localhost:8080/chercherChargeEnseignant?eng="+idPers)
      .map(resp=>resp.json())
  }
  getChargeSem(idChargeS:number){
    return this.http.get("http://localhost:8080/ChargeSemestre/"+idChargeS)
      .map(resp=>resp.json())
  }
  saveChargeSem(chargeSem:ChargeSem){
    return this.http.post("http://localhost:8080/AjouterChargeSemestre",chargeSem)
      .map(resp=>resp.json())
  }
  updateChargeSem(chargeSem:ChargeSem){
    return this.http.put("http://localhost:8080/ModifierChargeSemestre/"+chargeSem.idChargeS,chargeSem)
      .map(resp=>resp.json())
  }
  deleteChargeSem(idChargeS:number){
    return this.http.delete("http://localhost:8080/SupprimerChargeSemestre/"+idChargeS)
      .map(resp=>resp.json())
  }
  getAllChargeSem()
  {
    return this.http.get("http://localhost:8080/ChargeSemestres")
      .map(resp=>resp.json())
  }
}
