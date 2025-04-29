import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';
import { MajorService } from '../services/major.service';
import { Major } from '../models/major.model';
import { FormControl, FormGroup } from '@angular/forms';
import { SemesterService } from '../services/semester.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
  course = {
    id: 1,
    majorId: 1,
    NumberOfSemester: 0,
    name: '',
  }
  allMajors: any[] = [];
  allSemesters: any[] = [];
  allCourses: any[] = [];


  constructor(private router: Router, private majorService: MajorService, private courseService: CourseService, private semesterService: SemesterService) { }

  ngOnInit() {
    this.loadMajors();
    this.loadSemesters();
  }

  loadMajors() {
    this.majorService.getMajors().subscribe({
      next: (allMajors) => {
        this.allMajors = allMajors
        console.log(this.allMajors)
      },
      error: (error) => console.error('Error cargando Carreras ', error)
    })
  }

  loadSemesters() {
    this.semesterService.getSemesters().subscribe({
      next: (allSemesters) => {
        this.allSemesters = allSemesters;
        console.log('Semestres: ', this.allSemesters);
      },
      error: (error) => console.error('Error cargando Semestres ', error)
    })
  }

  loadCoursesByMajorOnChange(): void {
    if (this.course.majorId) {
      this.courseService.getCoursesByMajor(this.course.majorId).subscribe({
        next: (allCourses) => {
          this.allCourses = allCourses;
          console.log('Materias: ', this.allCourses);
        },
        error: (error) => {
          console.error('Error cargando materias ', error);
          this.allCourses = [];
        }
      });
    } else {
      this.allCourses = []
    }
  }
  
  onSubmit() {
    this.courseService.editCourse(this.course.id, this.course).subscribe({
      next: (response) => {
        console.log('Materia creada correctamente', response);
        this.router.navigate(['/admin-home'])
      },
      error: (error) => console.error('Error al crear materia', error)
    });
  }

  onCancel() {
    console.log('ay que menso deberas');
    this.course = {
      id: 1,
      majorId: 1,
      NumberOfSemester: 1,
      name: '',
    }
    this.router.navigate(['/admin-home'])
  }

  onDelete(): void {
    this.courseService.deleteCourse(this.course.id).subscribe({
      next: (response) => {
        console.log('Materia eliminada correctamente', response);
        this.router.navigate(['/admin-home'])
      },
      error: (error) => {
        console.error('Error al eliminar materia', error.message)
      }
    });
  }
}
