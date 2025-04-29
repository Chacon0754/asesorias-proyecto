import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { UtilitiesService } from './utilities.service';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient, private utilitiesService: UtilitiesService) { }

  createStudent(student: Student): Observable<any> {
    const password = this.utilitiesService.createPassword();
    
    const payload = {
      matricula: student.schoolId,
      nombre: student.name,
      ape1: student.lastName1,
      ape2: student.lastName2,
      programa: student.majorId,
      semestre: student.numberOfSemester,
      correo: student.email,
      perfil: '',
      rol: 'student',
      Contra_alum: password
    }
    console.log(password);
    return this.http.post<any>(`${this.apiURL}/alumnos`, payload).pipe(
      map(response => ({
        ...response,
        password: password
      }))
    );
  }

  editStudent(id: number, student: Student): Observable<Student> {
    const payload = {
      matricula: student.schoolId,
      nombre: student.name,
      ape1: student.lastName1,
      ape2: student.lastName2,
      programa: student.majorId,
      semestre: student.numberOfSemester,
      correo: student.email,
      perfil: 'n',
      rol: 'student'
    }
    return this.http.put<Student>(`${this.apiURL}/alumnos/${id}`, payload)
  }
  getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.apiURL}/alumnos`);
  }
  getStudentDataById(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/alumnos/${studentId}`)
  }
  getStudentsAndMajorName(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/students/carreras`);
  }
  getStudentMajorNameById(studentId: number): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/alumnos/carrera/${studentId}`);
  }

  deleteStudent(studentId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiURL}/alumnos/${studentId}`)
  }
  uploadProfileImage(studentId: number, file: File): Observable<any>{
    const formData = new FormData();
    formData.append('matricula', studentId.toString());
    formData.append('perfil', file);

    return this.http.post(`${this.apiURL}/student/upload-profile/${studentId}`, formData);
  }

  getProfilePicture(studentId: number): Observable<string> {
    return this.http.get<string>(`${this.apiURL}/student/profile-image/${studentId}`);
  }

}
