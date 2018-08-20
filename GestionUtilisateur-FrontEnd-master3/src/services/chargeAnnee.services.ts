import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { ChargeAnnee } from '../model/model.chargeAnnee';
@Injectable()
export class ChargeAnneeServices {
  constructor(public http:Http) {}

  getChargeAnnees(anneeD:number,anneeF:number,page:number,size:number){
    return this.http.get("http://localhost:8080/chercherChargeAnnee?mc="+anneeD+"&mp="+anneeF+"&size="+size+"&page="+page)
      .map(resp=>resp.json())
  }
  getChargeAnnee(id:number){
    return this.http.get("http://localhost:8080/chargeAnnee/"+id)
      .map(resp=>resp.json())
  }
  saveChargeAnnee(chargeAnnee:ChargeAnnee){
    return this.http.post("http://localhost:8080/AjouterChargeAnnee",chargeAnnee)
      .map(resp=>resp.json())
  }
  updateChargeAnnee(chargeAnnee:ChargeAnnee){
    return this.http.put("http://localhost:8080/ModifierChargeAnnee/"+chargeAnnee.idChargeAnn,chargeAnnee)
      .map(resp=>resp.json())
  }
  deleteChargeAnnee(id:number){
    return this.http.delete("http://localhost:8080/SupprimerChargeAnnee/"+id)
      .map(resp=>resp.json())
  }
  getAllChargeAnnee()
  {
    return this.http.get("http://localhost:8080/chargeAnnees")
      .map(resp=>resp.json())
  }
}
