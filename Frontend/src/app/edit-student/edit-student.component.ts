import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { MajorService } from '../services/major.service';
import { CourseService } from '../services/course.service';
import { SemesterService } from '../services/semester.service';
import { Student } from '../models/student.model';
import { Major } from '../models/major.model';
import { Course } from '../models/course.model';


@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent {
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
  allStudents: any[] = [];


  constructor(private router: Router, private studentService: StudentService, private majorService: MajorService, private courseService: CourseService, private semesterService: SemesterService){}

  ngOnInit(): void {
    this.loadMajors();
    this.loadSemesters();
    this.loadStudents();
  }

  loadMajors(): void {
    this.majorService.getMajors().subscribe({
      next: (allMajors) => {
        this.allMajors = allMajors
        console.log(this.allMajors)
      },
      error: (error) => console.error('Error cargando Carreras ', error)
    })
  }

  loadSemesters(): void {
    this.semesterService.getSemesters().subscribe({
      next: (allSemesters) => {
        this.allSemesters = allSemesters
        console.log(this.allSemesters)
      },
      error: (error) => console.error('Error cargando Semestres ', error)
    })
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (allStudents) => {
        this.allStudents = allStudents;
        console.log('Estudiantes: ', this.allStudents)
      },
      error: (error) => console.error('Error cargando estudiantes: ', error)
    });
  }


  onSubmit(): void {
    this.studentService.editStudent(this.student.schoolId, this.student).subscribe({
      next: (response) => {
        console.log('Estudiante editado correctamente', response);
        this.router.navigate(['/admin-home'])
      },
      error: (error) => {
        console.error('Error al editar estudiante', error)
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
  onDelete(): void {
    this.studentService.deleteStudent(this.student.schoolId).subscribe({
      next: (response) => {
        console.log('Estudiante eliminado correctamente', response);
        this.router.navigate(['/admin-home'])
      },
      error: (error) => {
        console.error('Error al eliminar estudiante', error.message)
      }
    });
    }
  }

