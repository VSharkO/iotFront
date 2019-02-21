import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from './components/task/ToDo';
import { status } from './components/task/statuses';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) {
    console.log('Data service connected...');
  }

  messagePass(id: number, message: string){
    var todo = new ToDo();
    todo.message = message;
    return this.http.put('https://boiling-bastion-42729.herokuapp.com/api/v1/devices/' + id, todo );
  }

  getPosts() {
    return this.http.get('https://boiling-bastion-42729.herokuapp.com/api/v1/devices/1');
  }
  getActive() {
    return this.http.get('https://boiling-bastion-42729.herokuapp.com/api/v1/statuses');
  }
  changeActive(changeBox) {
    var array = [];
    var stat = new status();
    stat.isActive = changeBox;
    array[0] = stat;
    return this.http.put('https://boiling-bastion-42729.herokuapp.com/api/v1/statuses/1', stat);
  }
  /*
  postTodos(todo: ToDo) {
    var buffer = todo as any;
    return this.http.post('http://localhost:49865/api/todoes', buffer)
  }
  deleteTodos(id: number) {
    return this.http.delete('http://localhost:49865/api/todoes' + '/' + id)
  }
  checkTodo(todo: ToDo) {
    var buffer = todo as any;
    return this.http.put('http://localhost:49865/api/todoes/' + '/' + todo.id, todo);
  }*/
}
