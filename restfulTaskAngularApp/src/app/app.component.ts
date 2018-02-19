import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  tasks = [];
  newTask: any;
  task: any;
  editedTask: any;

  constructor(private _httpService: HttpService){}
  // ngOnInit will run when the component is initialized, after the constructor method.
  ngOnInit(){
    this.newTask = {title: "", description: ""};
    this.editedTask = {title: `${this.task.title}`, description: `${this.task.description}`};
  }

  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      // console.log("Got our tasks!", data);
      this.tasks = data;
    })

  }

  onButtonClick(event){
    // console.log("button clicked");
    this.getTasksFromService();
    this.task = {title: `asdfasdf`, description: `asdfasdf`}
  }

  onSubmit(){
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      this.newTask = {title: "", description: ""}
    })
  }

  onDelete(_id){
    console.log(_id);
    let observable = this._httpService.deleteTask(_id);
    observable.subscribe(data => {
      console.log("deleting post", data);
    })
  }

  // onEditButtonClick(_id){
  //   // console.log(_id);
  //   let observable = this._httpService.getTaskById(_id);
  //   observable.subscribe(data => {
  //     console.log("Got task by id!", data);
  //     this.task = data;
  //   })
    
  // }
  
  onEdit(task, _id){
    this.editedTask = task;
    let observable = this._httpService.editTask(this.editedTask, _id);
    observable.subscribe(data => {
      console.log("Edited data: ", data);
    })
  }
}
