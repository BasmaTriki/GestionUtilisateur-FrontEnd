import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Service} from "../model/model.service";

@Injectable()
export class ServiceServices {
  constructor(public http: Http) {
  }
  getServices(motcle:string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherService?mc="+motcle+"&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }

  getService(idServ: number) {
    return this.http.get("http://localhost:8080/Service/" + idServ)
      .map(resp => resp.json())
  }

  saveService(service: Service) {
    return this.http.post("http://localhost:8080/AjouterService", service)
      .map(resp => resp.json())
  }

  updateService(service: Service) {
    return this.http.put("http://localhost:8080/ModifierService/" + service.idServ, service)
      .map(resp => resp.json())
  }

  deleteService(idServ: number) {
    return this.http.delete("http://localhost:8080/SupprimerService/" + idServ)
      .map(resp => resp.json())
  }
  getAllServices() {
    return this.http.get("http://localhost:8080/Services")
      .map(resp => resp.json())
  }
}
