import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from '../../../service/crud.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.css',
  providers: [DatePipe] 
})
export class EditTaskDialogComponent {
  editedTask:any;
  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: any,
    private crudservice:CrudService,
    private datePipe: DatePipe 
  ) {
    this.editedTask = { ...task };
    // Format due_date to 'dd-MM-yyyy'
    this.editedTask.due_date = this.datePipe.transform(this.editedTask.due_date, 'yyyy-MM-dd');
    console.log('Edited Task:', this.editedTask.due_date);
  }

  saveChanges():void{
    this.crudservice.updateTask(this.editedTask.taskId, this.editedTask).subscribe(
      (updatedTask) => {
        console.log('Task updated:', updatedTask);
        // Optionally, you can close the dialog after successful update
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating task:', error);
        // Handle error here, display an error message, etc.
      }
    );
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
