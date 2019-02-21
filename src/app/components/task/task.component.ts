import { Component, OnInit } from '@angular/core';
import { ToDo } from './ToDo';
import { status } from './statuses';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  stat: status[] = [];
  todos: ToDo = new ToDo();
  textboxVariable: string;
  deleteBuffNum: number;
  idNum: number = 1;
  changeBox: Boolean;
  currentMessage: string;

  constructor(private dataService: DataService) { }

  updateTodos() {
    this.dataService.getPosts().subscribe(posts => {
      console.log(posts);
      this.todos = posts as any;
      this.currentMessage = this.todos.message;
    });
  }
  updateActive() {
    this.dataService.getActive().subscribe(posts => {
      console.log(posts);
      this.stat = posts as any
      
      if(this.stat[0].isActive == "t")
      {
        this.changeBox = true;
      }
      else
        this.changeBox = false;
    });
    
  }

  ngOnInit() {
    this.updateTodos();
    this.updateActive();
    console.log("Status provjera...");
    console.log(this.stat[0]);
    console.log("Status gotov...");
    
    console.log(this.currentMessage);
  }

changeMessage(message){
  this.dataService.messagePass(1, message).subscribe(put => {
    this.updateTodos();
  });
}
toggle() {
    this.dataService.changeActive(this.changeBox).subscribe(post => {
    });
  
}

/*
  addToDo(todo) {
    this.dataService.postTodos({ id: this.todos.length + 1, text: todo }).subscribe(post => {
      this.updateTodos();
    });   

    this.textboxVariable = '';

    this.dataService.getPosts().subscribe(posts => {
      console.log(posts);
      var posts1 = posts as any;
      this.todos = posts1;
    });

    return this.updateTodos(); 
  }

  deleteToDo(i) {
    //this.todos.splice(i, 1);
    this.dataService.deleteTodos(i).subscribe(post => {
      this.updateTodos();
    });
  }

  toggle(todo) {
    if (todo.check == false) {
      //todo.check = true;
      this.dataService.checkTodo(todo).subscribe(post => {
        //this.updateTodos();
      });
    }
    else {
      //todo.check = false;
      this.dataService.checkTodo(todo).subscribe(post => {
        //this.updateTodos();
      });
    }    
    console.log(todo.id);
  }
  */
}
