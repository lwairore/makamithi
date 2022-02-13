import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mak-pit-counter-default',
  templateUrl: './counter-default.component.html',
  styles: [
  ]
})
export class CounterDefaultComponent implements OnInit {
  yearsOfExperienceCount: number = 0;
  expertMemberCount: number = 0;
  winAwardsCount:number = 0;
  worldWideBranchCount: any = 0;

  constructor() { }

  ngOnInit(): void {
  }

  yearsOfExperienceCountStop:any = setInterval(()=>{
    this.yearsOfExperienceCount++;

    if(this.yearsOfExperienceCount == 25){
      clearInterval(this.yearsOfExperienceCountStop)
    }
  },100)


  expertMemberCountStop:any = setInterval(()=>{
    this.expertMemberCount++;

    if(this.expertMemberCount == 98){
      clearInterval(this.expertMemberCountStop)
    }
  },100)

  winAwardsCountStop:any = setInterval(()=>{
    this.winAwardsCount++;

    if(this.winAwardsCount == 49){
      clearInterval(this.winAwardsCountStop)
    }
  },100)

  worldWideBranchCountStop:any = setInterval(()=>{
    this.worldWideBranchCount++;

    if(this.worldWideBranchCount == 85){
      clearInterval(this.winAwardsCountStop)
    }
  },100)

}
