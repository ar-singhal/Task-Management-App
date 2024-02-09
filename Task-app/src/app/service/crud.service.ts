import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl = 'http://localhost:3000'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // getTasks(): Observable<Task[]> {
  //   return this.http.get<Task[]>(this.apiUrl);
  // }
  getAllTasks() {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  // createTask(task: any) {
  //   return this.http.post<Task>(`${this.baseUrl}/tasks`, task);
  // }
  createTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tasks`, task, { responseType: 'json' }); // specify 'text' response type
  }

  getTaskById(taskId: number) {
    return this.http.get<Task>(`${this.baseUrl}/tasks/${taskId}`);
  }

  updateTask(taskId: number, task: any):Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/tasks/${taskId}`, task);
  }

  deleteTask(taskId: number):Observable<any>  {
    return this.http.delete<Task>(`${this.baseUrl}/tasks/${taskId}`);
  }
}
