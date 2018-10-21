///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CongeMensuelComponent } from '../conge-mensuel/conge-mensuel.component';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ModalImportationComponent } from '../modal-importation/modal-importation.component';
import { ListeEtatComponent } from '../liste-etat/liste-etat.component';
import { ImpressionServices } from '../../services/Impression.services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  providers: [DatePipe]
})
export class SideBarComponent implements OnInit {
nom:string;
private $BODY;
private $MENU_TOGGLE;
private $SIDEBAR_MENU;
private $SIDEBAR_FOOTER;
private $LEFT_COL;
private $RIGHT_COL;
private $NAV_MENU;
private $FOOTER;
role:string;
matricule:number;
lang:string;
nomAr:string;
date:any;
annee:number=0;
  constructor(public dialog: MatDialog,
    private translate: TranslateService,private datePipe: DatePipe,
    private impressionServices:ImpressionServices) 
    {
    this.lang=sessionStorage.getItem("lang");
    translate.use(this.lang);
    this.date=this.datePipe.transform(new Date(), 'yyyy');
     }

  ngOnInit() {
    this.nom=sessionStorage.getItem('nom');
    this.role=sessionStorage.getItem('role');
    this.matricule=Number(sessionStorage.getItem('idUser'));
    this.nomAr=sessionStorage.getItem('nomAr');
    
  }
  anchorClicked(event: MouseEvent)
  {
      
      var target = event.srcElement.id;

      var $li = $('#' + target.replace("chevron","li")).parent(); 

      if ($li.is('.active')) {
          $li.removeClass('active active-sm');
              $('ul:first', $li).slideUp(function() {
                 // this.setContentHeight();
              });
          } else {
              // prevent closing menu if we are on child menu
              if (!$li.parent().is('.child_menu')) {
                  $('#sidebar-menu').find('li').removeClass('active active-sm');
                  $('#sidebar-menu').find('li ul').slideUp();
              }
              
              $li.addClass('active');

              $('ul:first', $li).slideDown(function() {
                  //this.setContentHeight();
              });
          }
  }

  plot()
  {     
      console.log('in sidebar');
      this.$BODY = $('body');
      this.$MENU_TOGGLE = $('#menu_toggle');
      this.$SIDEBAR_MENU = $('#sidebar-menu');
      this.$SIDEBAR_FOOTER = $('.sidebar-footer');
      this.$LEFT_COL = $('.left_col');
      this.$RIGHT_COL = $('.right_col');
      this.$NAV_MENU = $('.nav_menu');
      this.$FOOTER = $('footer');
      var $a = this.$SIDEBAR_MENU.find('a');
      this.$SIDEBAR_MENU.find('a').on('click', function(ev) {
          var $li = $(this).parent();

          if ($li.is('.active')) {
              $li.removeClass('active active-sm');
              $('ul:first', $li).slideUp(function() {
                 //this.setContentHeight();
              });
          } else {
              // prevent closing menu if we are on child menu
              if (!$li.parent().is('.child_menu')) {
                  this.$SIDEBAR_MENU.find('li').removeClass('active active-sm');
                  this.$SIDEBAR_MENU.find('li ul').slideUp();
              }
              
              $li.addClass('active');

              $('ul:first', $li).slideDown(function() {
                //this.setContentHeight();
              });
          }
      });

      // toggle small or large menu
      this.$MENU_TOGGLE.on('click', function() {
          if (this.$BODY.hasClass('nav-md')) {
              this.$SIDEBAR_MENU.find('li.active ul').hide();
              this.$SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
          } else {
              this.$SIDEBAR_MENU.find('li.active-sm ul').show();
              this.$SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
          }

          this.$BODY.toggleClass('nav-md nav-sm');

          this.setContentHeight();
      });

  }  
  setContentHeight() {
      // reset height
      this.$RIGHT_COL.css('min-height', $(window).height());

      var bodyHeight = this.$BODY.outerHeight(),
          footerHeight = this.$BODY.hasClass('footer_fixed') ? -10 : this.$FOOTER.height(),
          leftColHeight = this.$LEFT_COL.eq(1).height() + this.$SIDEBAR_FOOTER.height(),
          contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

      // normalize content
      contentHeight -= this.$NAV_MENU.height() + footerHeight;

      this.$RIGHT_COL.css('min-height', contentHeight);
  }
  congeMois(type:string)
  {
    let dialogRef = this.dialog.open(CongeMensuelComponent, {data:{name:type}});
  }
  ListePersonnel(type:string)
  {
    this.annee=+this.date+1;
    var anneeUniv=this.date+"/"+this.annee
    console.log(anneeUniv);
      if(type=="Actif")
      {
        this.impressionServices.ImprimerListePersonnelActif(anneeUniv)
        .subscribe(data => {
            console.log(data);
          }, err => {
            console.log(err);
          })
      }
      else if(type=="Inactif")
      {
        this.impressionServices.ImprimerListePersonnelInactif(anneeUniv,this.annee-1)
        .subscribe(data => {
            console.log(data);
          }, err => {
            console.log(err);
          })
      }
      else if(type=="NomberEnseig")
      {
        this.impressionServices.ImprimerStatistique(anneeUniv)
        .subscribe(data => {
            console.log(data);
          }, err => {
            console.log(err);
          }) 
      }
      else if(type=="mutation")
      {
        this.impressionServices.ImprimerListeMutation(anneeUniv,this.annee-1)
        .subscribe(data => {
            console.log(data);
          }, err => {
            console.log(err);
          }) 
      }
      else
      {
        let dialogRef = this.dialog.open(ListeEtatComponent, {data:{name:type}});
      }
 
  }
  importer()
  {
    let dialogRef = this.dialog.open(ModalImportationComponent);
  }
}
