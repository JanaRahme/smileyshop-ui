import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("login page");

  }


  public executeSelectedChange = (event:any) => {
    console.log(event);
  }



}

