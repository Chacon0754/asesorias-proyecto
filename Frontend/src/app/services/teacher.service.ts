import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.model';
import { Course } from '../models/course.model';
import { UtilitiesService } from './utilities.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private utilitiesService: UtilitiesService) { }

  
  createTeacher(teacher: Teacher): Observable<any> {
    const password = this.utilitiesService.createPassword();
    const payload = {
      Id_docente: teacher.id,
      nombre_doc: teacher.name,
      Apellido: teacher.lastName1,
      id_mat_as: teacher.courseId,
      id_carrera_mat: teacher.majorId,
      correo: teacher.email,
      apei2: teacher.lastName2,
      perfil: 'n',
      rol_doc: 'teacher',
      contra_docente: password,
      courseIds: teacher.courseIds,
      scheduleIds: teacher.scheduleIds,

    }
    console.log(password)
    return this.http.post<any>(`${this.apiUrl}/docentes`, payload).pipe(
      map(response => ({
        ...response,
        password: password
      }))
    );
  }

  editTeacher(id: number, teacher: Teacher): Observable<Teacher>{
    const payload = {
      Id_docente: teacher.id,
      nombre_doc: teacher.name,
      Apellido: teacher.lastName1,
      id_mat_as: teacher.courseId,
      id_carrera_mat: teacher.majorId,
      correo: teacher.email,
      apei2: teacher.lastName2,
      perfil: 'n',
      rol_doc: 'teacher',
      courseIds: teacher.courseIds,
      scheduleIds: teacher.scheduleIds
    };
    console.log(payload)
    return this.http.put<Teacher>(`${this.apiUrl}/docentes/${id}`, payload);
  }
  getTeachers(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(`${this.apiUrl}/docentes`);
  }
  getCourses(teacherId: number): Observable<Course[]>{
    return this.http.get<Course[]>('${this.apiUrl}/${teacherId}/courses')
  }
  uploadProfileImage(teacherId: number, file: File): Observable<any>{
    const formData = new FormData();
    formData.append('matricula', teacherId.toString());
    formData.append('perfil', file);

    return this.http.post(`${this.apiUrl}/docente/upload-profile/${teacherId}`, formData);
  }

  getProfilePicture(teacherId: number): Observable<string>{
    return this.http.get<string>(`${this.apiUrl}/docente/profile-image/${teacherId}`)
  }
  getTeacherDataById(teacherId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/docentes/${teacherId}`)
  }
  
  getTeachersByCourseId(courseId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/docentes/materia/${courseId}`);
  }

  deleteTeacher(teacherId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/docentes/${teacherId}`)
  }
}
