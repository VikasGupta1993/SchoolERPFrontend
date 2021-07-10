import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FeesService } from '../fees.service';

@Component({
  selector: 'app-fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.sass']
})
export class FeeStructureComponent implements OnInit {

  feeheadlist = [];

  feeMonthData = [
    {monthId : 1 , monthName:"April"},
    {monthID : 2 , monthName: "May"},
    {monthID : 3 , monthName: "June"},
    {monthID : 4 , monthName: "July"},
    {monthID : 5 , monthName: "August"},
    {monthID : 6 , monthName: "September"},
    {monthID : 7 , monthName: "October"},
    {monthID : 8 , monthName: "Novemeber"},
    {monthID : 9 , monthName: "Decemeber"},    
    {monthID : 10 ,monthName: "January"},
    {monthID : 11 ,monthName: "February"},
    {monthID : 12 ,monthName: "March"},
  ]

  constructor(private feeService:FeesService) {
    this.getFeesHeadComponent();
   }

  ngOnInit(): void {
  }

  getFeesHeadComponent()
  {
    var jsonData;
    var parseData;

    this.feeService.getFeeTypeComponentData()
    .subscribe(res => {
      console.log(res);
      jsonData = JSON.stringify(res);
      parseData = JSON.parse(jsonData);

      parseData.data.forEach(element => {
        this.feeheadlist.push(element.feeType);
      });
      console.log(this.feeheadlist);
    },(err:HttpErrorResponse) => {
      alert("There is some error while fetching fee component data");
    })
  }
}
