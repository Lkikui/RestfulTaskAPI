import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  snacks: [string];
  loggedIn: boolean;
  
  num: number;
  randNum: number;
  str: string;
  first_name: string;

  title = 'app';
  tasks = [];

  constructor(private _httpService: HttpService){}
  // ngOnInit will run when the component is initialized, after the constructor method.
  ngOnInit(){
    this.getTasksFromService();

    this.num = 7;
    this.randNum = Math.floor((Math.random() * 2) + 1);
    this.str = 'Hello Angular Developer!';
    this.first_name = 'Alpha';

    this.snacks = ["vanilla latte with skim milk", "brushed suede", "cookie"];
    this.loggedIn = true;
  }

  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Got our tasks!", data);
      this.tasks = data;
    })
  }
}
