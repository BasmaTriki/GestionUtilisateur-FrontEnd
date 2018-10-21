import { Component, OnInit } from '@angular/core';
import { EnseignantPermanentServices } from '../../services/enseignantpermanent.services';
import { Departement } from '../../model/model.departement';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
listeDep:Array<Departement>=new Array<Departement>();
lang:string;
  constructor(private enseignantPservices:EnseignantPermanentServices) 
  { 
    this.lang=sessionStorage.getItem("lang");
  }

  ngOnInit() {
    this.ChercherNomberEnseignant();
   
  }
  ChercherNomberEnseignant()
  {
    this.enseignantPservices.getNomberEnseignant()
    .subscribe(data => {
      console.log(data);
      this.pieChartData=data;
      this.lineChartData=data;
    /*   for (let s of data)
  { this.lineChartData.push(data[0]);
   this.pieChartData.push(data[0]);
   this.pieChartLabels=data[0].nomDepAr; } */
    }, err => {
      console.log(err);
    });
    if(this.lang=='fr')
    {
      this.chercherDepFr();
    }
    else
    {
      this.chercherDep();
    }
  }
chercherDep()
{
this.enseignantPservices.getListeDepartement()
  .subscribe(data => {
    console.log(data);
    this.pieChartLabels=data;
}, err => {
  console.log(err);
});
}
chercherDepFr()
{
this.enseignantPservices.getListeDepartementFr()
  .subscribe(data => {
    console.log(data);
    this.pieChartLabels=data;
}, err => {
  console.log(err);
});
}
    // lineChart
  public lineChartData:Array<any>=new Array<any>();
  /*  = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ]; */
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'bar';
  public pieChartType:string = 'doughnut';
 
  // Pie
  public pieChartLabels:string[] = [];
  public pieChartData:number[] = [300, 500, 100, 200, 340]; 
 
 /*  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  } */
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
