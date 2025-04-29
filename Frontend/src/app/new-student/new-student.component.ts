import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from '../services/student.service';
import { MajorService } from '../services/major.service';
import { CourseService } from '../services/course.service';
import { SemesterService } from '../services/semester.service';
import { Student } from '../models/student.model';
import { UserInfoDialogComponent } from '../user-info-dialog/user-info-dialog.component';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.css'
})
export class NewStudentComponent implements OnInit {
  student: Student = {
    schoolId: 0,
    name: '',
    lastName1: '',
    lastName2: '',
    majorId: 1,
    numberOfSemester: 1,
    email: '',
    profilePicture: '',
    role: 'student',
    password: ''
  }

  allMajors: any[] = [];
  allSemesters: any[] = [];

  constructor(private router: Router, private studentService: StudentService, private majorService: MajorService, private courseService: CourseService, private semesterService: SemesterService, private dialog: MatDialog){}

  ngOnInit(): void {
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


  onSubmit(): void {
    this.studentService.createStudent(this.student).subscribe({
      next: (response) => {
        console.log('Estudiante creado correctamente', response);
        this.dialog.open(UserInfoDialogComponent, {
          data: {
            name: `${this.student.name} ${this.student.lastName1} ${this.student.lastName2}`,
            email: this.student.email,
            password: response.password,
            subject: 'Alumno'
          }
        });
        this.router.navigate(['/admin-home'])
      },
      error: (error) => {
        console.error('Error al crear estudiante', error)
      }
    });
  }

  onCancel() {
    console.log('Cancelao mijo')
    this.student = {
      schoolId: 0,
    name: '',
    lastName1: '',
    lastName2: '',
    majorId: 1,
    numberOfSemester: 1,
    email: '',
    profilePicture: '',
      role: 'student',
    password: ''
    }
    this.router.navigate(['/admin-home'])
  }
}
