import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advisory } from '../models/advisory.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvisoryService {
  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }
  
  createAdvisory(advisory: Advisory): Observable<Advisory>{
    const payload = {
      id_alumno: advisory.studentId,
      id_docente: advisory.teacherId,
      id_materia: advisory.courseId,
      modalidad: advisory.mode,
      id_docente_horario: advisory.scheduleId
    };
    return this.http.post<Advisory>(`${this.apiUrl}/asesorias`, payload).pipe(
      map(response => ({
        ...response
      }))
    );
  }

  getAdvisorysByStudentId(studentId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/asesorias/alumno/${studentId}`);
  } 
  getAdvisorysByTeacherId(teacherId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/asesorias/docente/${teacherId}`);
  } 
  deleteAdvisoryByTeacher(advisoryId: number, teacherId: number, scheduleId: number): Observable<any>{
    const body = {
      teacherId,
      scheduleId,
    }
    const headers = new HttpHeaders({'content-Type': 'application/json'})
    return this.http.delete<any>(`${this.apiUrl}/asesorias/docente/${advisoryId}`, {headers, body})
  }
}
