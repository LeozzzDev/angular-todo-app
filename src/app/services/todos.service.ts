import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todos: Item[];
  
  constructor() {
    this.todos = [];
  }

  getTodoItems(): Item[] {
    return this.todos;
  }

  addTodoItem(todo: Item) {
    this.todos.push(todo);
  }

  updateTodoItem(index: number, updatedTodoItem: Item) {
    this.todos[index] = updatedTodoItem;
  }

  deleteTodoItem(index: number) {
    this.todos.splice(index, 1);
  }
}
