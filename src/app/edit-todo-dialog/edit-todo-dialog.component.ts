import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss'],
})
export class EditTodoDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Item) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  onFormSubmit(form: NgForm) {
    this.todo.text = form.value.text;

    const updatedTodo = {
      ...this.todo,
      ...form.value
    }
    
    this.dialogRef.close(updatedTodo);
  }
}
