import { Component, OnInit } from '@angular/core';
import { AdvisoryService } from '../services/advisory.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MajorService } from '../services/major.service';
import { TeacherService } from '../services/teacher.service';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';
import { StudentService } from '../services/student.service';
import { ScheduleService } from '../services/schedule.service';
import { Advisory } from '../models/advisory.model';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from '../user-info-dialog/user-info-dialog.component';


@Component({
  selector: 'app-advisory-request-student',
  templateUrl: './advisory-request-student.component.html',
  styleUrl: './advisory-request-student.component.css'
})
export class AdvisoryRequestStudentComponent implements OnInit {
  advisory: Advisory = {
    
    studentId: 0,
    teacherId: 0,
    scheduleId: 0,
    courseId: 0,
    mode: false,
  }
  majors: any[] = [];
  allCourses: any[] = [];
  teachers: any[] = [];
  modes = [{id: true, name: 'Presencial'}, {id: false, name: 'Virtual'}]
  allAvailableSchedules: any[] = [];
  confirmedSchedule: string = '';
  confirmedScheduleHour: string = '';
  confirmedCourseName: string = '';
  confirmedTeacherName: string = '';
  confirmedModeName: string = '';

  

  majorId: number= 0;
  majorName: string= '';

  constructor(private advisoryService: AdvisoryService, private fb: FormBuilder, private router: Router, private majorService: MajorService, private teacherService: TeacherService, private courseService: CourseService, private authService: AuthService, private studentService: StudentService, private scheduleService: ScheduleService, private dialog: MatDialog) {}
  
  ngOnInit(): void {
    const userDetails = this.authService.getUserDetails();
    if (userDetails) {
      this.loadStudentMajorName(userDetails.id);
      this.advisory.studentId = userDetails.id;
    }
  }
  
  loadStudentMajorName(studentId: number): void {
    this.studentService.getStudentMajorNameById(studentId).subscribe({
      next: (student) => {
        this.majorId = student.id_carrera;
        this.majorName = student.nombre_carrera;
        console.log('major: ',this.majorId, this.majorName)
        this.loadCoursesByStudentMajorId();
        console.log('Estudiante: ',student)
      },
      error: (error) => {
        console.error('Error al cargar datos del estudiante: ', error);
      }
    });
  }
  loadCoursesByStudentMajorId(): void {
    this.courseService.getCoursesByMajor(this.majorId).subscribe({
      next: (allCourses) => {
        this.allCourses = allCourses;
        console.log('materias: ' ,this.allCourses);
      }, 
      error: (error) => {
        console.error('Error al cargar materias: ', error);
        this.allCourses = []
      }
    });
  }

  loadTeachersByCourseId(courseId: number): void {
    this.teacherService.getTeachersByCourseId(courseId).subscribe({
      next: (teachers) => {
        this.teachers = teachers;
        if (this.teachers.length === 1) {
          this.loadSchedulesByTeacherId(this.teachers[0]);
          const selectedCourse = this.allCourses.find(course => course.Id_Materias === courseId);
          if (selectedCourse) {
            this.confirmedCourseName = selectedCourse.N_Mat
            console.log('Curso confirmado: ',this.confirmedCourseName)
          }
        }
        console.log('Teachers:', this.teachers)
      },
      error: (error) => {
        console.error('Error al cargar docentes: ', error);
      }
    });
  }

  loadSchedulesByTeacherId(teacherId: number): void {
    this.scheduleService.getAvailableSchedulesByTeacherId(teacherId).subscribe({
      next: (schedules) => {
        this.allAvailableSchedules = schedules;
        console.log('Horarios disponibles:', this.allAvailableSchedules);
      },
      error: (error) => {
        console.error('Error al cargar horarios disponibles: ', error);
      }
    });
  }
  onCourseChange(courseId: number): void {
    this.loadTeachersByCourseId(courseId);
    console.log('id: ', courseId);
    const selectedCourse = this.allCourses.find(course => course.Id_Materias === courseId);
      if (selectedCourse) {
        this.confirmedCourseName = selectedCourse.N_Mat
        console.log('Curso confirmado: ',this.confirmedCourseName)
    }
    
  }

  onScheduleChange(scheduleId: number) {
    const selectedSchedule = this.allAvailableSchedules.find(schedule => schedule.id_docente_horario === scheduleId);
    if (selectedSchedule) {
      this.confirmedSchedule = selectedSchedule.dia + ': ' + selectedSchedule.hora_inicio;
      console.log("Horario confirmado: ", this.confirmedSchedule)
    }
  }

  onModalityChange(mode: boolean) {
    const selectedMode = this.modes.find(modes => modes.id === mode);
    if (selectedMode) {
      this.confirmedModeName = selectedMode.name;
      console.log('Modalidad Confirmada: ', this.confirmedModeName);
    }
  }
  
  onTeacherChange(teacherId: number): void { 
    this.loadSchedulesByTeacherId(teacherId);
    console.log('Teacher ID:', teacherId);
    const selectedTeacher = this.teachers.find(teacher => teacher.Id_docente === teacherId);
    if (selectedTeacher) {
      this.confirmedTeacherName = selectedTeacher.nombre_doc + ' ' + selectedTeacher.Apellido;
      console.log('Docente confirmado: ', this.confirmedTeacherName)
    }
  }

  submitForm() {
    if (this.advisory.mode === false) {
      this.confirmedModeName = 'Virtual'
    } else if (this.advisory.mode === true) {
      this.confirmedModeName == 'Presencial'
    }
    console.log(this.advisory)
    this.advisoryService.createAdvisory(this.advisory).subscribe({
      next: (response) => {
        console.log('Asesoria creada correctamente: ', response);
        this.dialog.open(UserInfoDialogComponent, {
          data: {
            subject: 'Asesoria',
            teacher: this.confirmedTeacherName,
            course: this.confirmedCourseName,
            mode: this.confirmedModeName,
            schedule: this.confirmedSchedule
          }
        });
        this.router.navigate(['/student-home']);
      },
      error: (error) => {
        console.error('Error al crear asesoria: ', error);
      }
    })
  }

  onCancel(){
    this.router.navigate(['/student-home'])
  }
}
