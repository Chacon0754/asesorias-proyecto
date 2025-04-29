import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createCourse(course: Course): Observable<any> {
    const payload = {
      Id_Materias: course.id,
      N_Carr: course.majorId,
      N_Sem: course.NumberOfSemester,
      N_Mat: course.name
    };
    return this.http.post<any>(`${this.apiUrl}/materias`, payload).pipe(
      map(response => ({
        ...response
      }))
    );
  }

  editCourse(id: number, course: Course):Observable<Course> {
    const payload = {
      Id_Materias: course.id,
      N_Carr: course.majorId,
      N_Sem: course.NumberOfSemester,
      N_Mat: course.name
    };
    return this.http.put<Course>(`${this.apiUrl}/materias/${id}`, payload)
  }
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/materias`)
  }

  getCoursesByMajor(majorId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/materias/${majorId}`);
  }

  getCoursesAndMajorName(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.apiUrl}/materias/carreras`)
  }

  deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/materias/${courseId}`)
  }

  
}