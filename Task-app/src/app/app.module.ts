import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CrudService } from './service/crud.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { EditTaskDialogComponent } from './components/tasks/edit-task-dialog/edit-task-dialog.component';
import { CreateTasksComponent } from './components/tasks/create-tasks/create-tasks.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TasksComponent,
    EditTaskDialogComponent,
    CreateTasksComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Add FormsModule here
    MatDialogModule,
  ],
  providers: [CrudService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
