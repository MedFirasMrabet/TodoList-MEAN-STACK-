import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { AuthService } from '../services/auth.service'


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  items;
  todos: string;
  todo: string;
  data: any;

  itemsRef;


  constructor(public auth: AuthService, private todoService: TodoService) {

  }



  onSubmit(f: NgForm) {
    console.log('test');

    const data = {
      todo: {

        task: f.value.todo,
        deadline: f.value.deadline

      }
    };
    console.log(data);

    this.todoService.addTodo(data).subscribe(info => {
      console.log(info);
      this.ngOnInit();
    })


  }
  delete(id: any) {
    const result = confirm('Are you sure?');
    if (result) {
      this.todoService.deleteTodo(id).subscribe(data => {
        console.log(data);
        this.ngOnInit();

      });
    }
  }
  check(id: any) {
    this.todoService.checkTodo(id).subscribe(data => {
      console.log(data);

      this.ngOnInit()
    })
  }
  uncheck(id: any) {
    this.todoService.uncheckTodo(id).subscribe(data => {
      this.ngOnInit()
    })
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe(data => {

      this.items = data;
    })
  }

}
