import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { HttpClient } from '../../node_modules/@angular/common/http';
@Injectable()
export class ImportationServices {
  constructor(public http: HttpClient) {
  }

  ImpoterExcel(path:FormData) {
    this.http.post("http://localhost:8080/uploadFileImporter",path)
    .subscribe(res=>{
     console.log(res.toString)
    },err=>{
      console.log(err);
    });
}
}