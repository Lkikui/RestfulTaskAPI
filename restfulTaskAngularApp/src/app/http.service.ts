import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
    // this.getTasks();
    // this.getTaskById();
  }
  getTasks(){
    // our http response is an Observable, store it in a variable
    // let tempObservable = this._http.get('/tasks');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log("Got our tasks!", data));
    return this._http.get('/tasks');
  }

  getTaskById(_id){
  //   let tempObservable = this._http.get('/tasks/:id');
  //   tempObservable.subscribe(data => console.log("Got our task by id!", data));
    return this._http.get(`/tasks/${_id}`);
  }

  addTask(newTask){
    return this._http.post('/tasks', newTask);
  }

  editTask(task, _id){
    console.log(`edited task received by service:`);
    console.log(task);
    console.log(`id received by service:`);
    console.log(_id);
    return this._http.put(`/tasks/${_id}`, task);
  }

  deleteTask(_id){
    console.log(`service url: /tasks/${_id}`);
    return this._http.delete(`/tasks/${_id}`);
  }

}
