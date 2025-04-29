import { Injectable } from '@angular/core';
import { Semester } from '../models/semester.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  getSemesters(): Observable<Semester[]>{
    return this.http.get<Semester[]>(`${this.apiUrl}/semestres`)
  }

}
