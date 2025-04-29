import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';
import { MajorService } from '../services/major.service';
import { Major } from '../models/major.model';
import { FormControl, FormGroup } from '@angular/forms';
import { SemesterService } from '../services/semester.service';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from '../user-info-dialog/user-info-dialog.component';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrl: './new-course.component.css'
})
export class NewCourseComponent implements OnInit {
  course = {
    id: 1,
    majorId: 1,
    NumberOfSemester: 0,
    name: '',
  }
  allMajors: any[] = [];
  allSemesters: any[] = [];


  constructor(private router: Router, private majorService: MajorService, private courseService: CourseService, private semesterService: SemesterService, private dialog: MatDialog) { }

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
        this.allSemesters = allSemesters
        console.log(this.allSemesters)
      },
      error: (error) => console.error('Error cargando Semestres ', error)
    })
  }
  
  onSubmit() {
    this.courseService.createCourse(this.course).subscribe({
      next: (response) => {
        console.log('Materia creada correctamente', response);
        this.dialog.open(UserInfoDialogComponent, {
          data: {
            name: this.course.name,
            semester: this.course.NumberOfSemester,
            code: this.course.id,
            subject: 'Materia'
          }
        })
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
}
