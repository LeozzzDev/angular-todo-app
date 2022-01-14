import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { Item } from '../models/item.model';
import { TodosService } from '../services/todos.service';
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {

  todoItems!: Item[];
  showValidationErros: boolean = false;

  constructor(
    private service:TodosService, 
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.todoItems = this.service.getTodoItems();
  }

  onFormSubmit(form: NgForm) {

    if (form.invalid) {
      this.showValidationErros = true;
      return;
    }
    this.service.addTodoItem(new Item(form.value.text));
    form.reset();
    this.showValidationErros = false;
  }

  toggleTodoCompletition(todo: Item) {
    todo.completed = !todo.completed;    
  }

  editTodo(todo: Item) {
    const index = this.todoItems.indexOf(todo);
    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.service.updateTodoItem(index, response);
      }
    });
  }

  deleteTodo(todo: Item) {
    const index = this.todoItems.indexOf(todo);
    this.service.deleteTodoItem(index);
  }
}
