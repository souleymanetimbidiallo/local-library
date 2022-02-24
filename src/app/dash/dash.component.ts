import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
export interface MiniCard {
  icon: string;
  title: string;
  value: string;
  color: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})


export class DashComponent {

  minicards: MiniCard[] = [
    {
      icon: "store",
      title: "Total sales",
      value: "9.465€",
      color: "primary"
    }, {
      icon: "monetization_on",
      title: "Average Order Value",
      value: "465€",
      color: "warn"
    }, {
      icon: "local_grocery_store",
      title: "Total orders",
      value: "243",
      color: ""
    }, {
      icon: "people",
      title: "Returning customers",
      value: "35",
      color: "accent"

    },
  ];

  charts: string[] = ["Montly Revenue", "Product Sales", "Sales by traffic Source", "Online Store Sessions by Traffic Source"];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(private breakpointObserver: BreakpointObserver) { }
}
