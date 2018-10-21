import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Personnel} from "../../model/model.personnel";
import * as $ from 'jquery';
import { CongeServices } from '../../services/conge.services';
import { DemandeVacationServices } from '../../services/demandeVacation.services';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor()
  {}
  ngOnInit() { }

}
