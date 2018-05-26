import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Mutation} from '../model/model.mutation';

@Injectable()
export class MutationServices {
  constructor(public http: Http) {
  }

  getMutations(motCle: string, page: number, size: number) {
    return this.http.get("http://localhost:8080/chercherMutation?mc=" + motCle + "&size=" + size + "&page=" + page)
      .map(resp => resp.json())
  }

  getMutation(idMut: number) {
    return this.http.get("http://localhost:8080/Mutation/"+idMut)
      .map(resp => resp.json())
  }

  saveMutation(mutation: Mutation) {
    return this.http.post("http://localhost:8080/AjouterMutation", mutation)
      .map(resp => resp.json())
  }

  updateMutation(mutation: Mutation) {
    return this.http.put("http://localhost:8080/ModifierMutation/"+mutation.idMut, mutation)
      .map(resp => resp.json())
  }

  deleteMutation(idMut: number) {
    return this.http.delete("http://localhost:8080/SupprimerMutation/"+idMut)
      .map(resp => resp.json())
  }
  getAllMutations() {
    return this.http.get("http://localhost:8080/Mutations")
      .map(resp => resp.json())
  }
}
