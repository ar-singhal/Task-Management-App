import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { response } from 'express';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  selectedTask: any;
  successMessage: string='';
  constructor(private crudService: CrudService , private dialog: MatDialog ) { }

  openEditDialog(task: any): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '400px', // Set the width of the dialog
      data: task // Pass the selected task data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
      // Handle the result of the edit dialog if needed
    });
  }

  deletetask(task:any):void{
    this.crudService.deleteTask(task.taskId).subscribe(
      (response) => {
        console.log('Task deleted successfully:', response);
        this.successMessage = 'Task deleted successfully';
        this.crudService.getAllTasks().subscribe(tasks => {
          console.log(tasks);
          this.tasks = tasks;
        });
        // Optionally, perform additional actions after task creation (e.g., navigate to another page)
      },
      (error) => {
        console.error('Error creating task:', error);
        // Optionally, handle error (e.g., display an error message to the user)
      }
    );
  }

  closeEditDialog(): void {
    this.selectedTask = null;
    this.dialog.closeAll();
  }
  delete(data:any): void{
    
  }
  saveChanges(data: any): void {
    // Handle saving changes to the task
    // You can access the edited task data through the 'data' parameter
    console.log('Saving changes:', data);
    
  }
  ngOnInit(): void {
    this.crudService.getAllTasks().subscribe(tasks => {
      console.log(tasks);
      this.tasks = tasks;
    });
  }
}




