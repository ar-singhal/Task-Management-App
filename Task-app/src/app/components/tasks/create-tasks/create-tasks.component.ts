import { Component } from '@angular/core';
import { Task } from '../../../service/task';
import { CrudService } from '../../../service/crud.service';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrl: './create-tasks.component.css'
})
export class CreateTasksComponent {
    task:any={
      title:''
    };
  successMessage: string='';

    constructor(private crudService: CrudService) { 
    }

    saveChanges() : void{
      console.log(this.task);     
      this.crudService.createTask(this.task).subscribe(
        (response) => {
          console.log('Task created successfully:', response);
          this.successMessage = 'Task created successfully';
          this.clearForm();
          // Optionally, perform additional actions after task creation (e.g., navigate to another page)
        },
        (error) => {
          console.error('Error creating task:', error);
          // Optionally, handle error (e.g., display an error message to the user)
        }
      );
    }
    clearForm(): void {
      this.task = {
        title: '',
        descript: '',
        due_date:'',
        status:''
        // Other task properties
      };
    }

}
