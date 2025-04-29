import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from '../models/teacher.model';
import { TeacherService } from '../services/teacher.service';
import { MajorService } from '../services/major.service';
import { CourseService } from '../services/course.service';
import { ScheduleService } from '../services/schedule.service';
import { MatDialog } from '@angular/material/dialog';
import { UserInfoDialogComponent } from '../user-info-dialog/user-info-dialog.component';


@Component({
  selector: 'app-new-teacher',
  templateUrl: './new-teacher.component.html',
  styleUrl: './new-teacher.component.css'
})
export class NewTeacherComponent implements OnInit {
  teacher: Teacher = {
    id: 0,
    name: '',
    lastName1: '',
    lastName2: '',
    email: '',
    majorId: 0,
    courseId: 0,
    courseIds: [],
    scheduleIds: [] ,
    role: 'teacher',
    profilePicture: '',
    password: '',
    
  };
  selectedCoursesByMajor: {[majorId: number]: number[]} = {}
  allMajors: any[] = [];
  allCourses: any[] = []
  selectedMajorCode: number | null = null;
  allSchedules: any[] = [];

  constructor(private router: Router, private teacherService: TeacherService, private majorService: MajorService, private courseService: CourseService, private scheduleService: ScheduleService, private dialog: MatDialog) {}

  ngOnInit(): void{
    this.loadMajors();
    this.loadSchedules();
  }
  
  loadMajors() {
    this.majorService.getMajors().subscribe({
      next: (allMajors) => {
        this.allMajors = allMajors
        console.log(this.allMajors)
      },
      error: (error) => console.error('Error cargando Carreras ', error)
    });
  }
  onMajorChange(): void {
    if (this.teacher.majorId) {
      this.selectedCoursesByMajor[this.teacher.majorId] = [...this.teacher.courseIds]
    }

    const selectedCourses = this.selectedCoursesByMajor[this.teacher.majorId] || [];
    this.teacher.courseIds = selectedCourses;

    if (this.teacher.majorId) {
      this.courseService.getCoursesByMajor(this.teacher.majorId).subscribe({
        next: (allCourses) => {
          this.allCourses = allCourses;
          console.log(this.allCourses);
          this.teacher.courseIds = this.teacher.courseIds.filter(courseId => 
          this.allCourses.some(course => course.Id_Materias === courseId));
        }, 
        error: (error) => {
          console.error('Error al cargar materias: ', error);
          this.allCourses = []
        }
      });
    } else {
      this.allCourses = [];
    }
  }

  onCourseSelectionChange(event: any): void {
    if (this.teacher.majorId) {
      this.selectedCoursesByMajor[this.teacher.majorId] = [...event.value]
    }
    this.teacher.courseIds = [...event.value]
    console.log('CourseIDS: ', this.teacher.courseIds)
    console.log('SelectedCourseByMajor: ', this.selectedCoursesByMajor)
  }

  loadSchedules(): void {
    this.scheduleService.getSchedule().subscribe({
      next: (schedules) => {
        this.allSchedules = schedules;
        console.log('Schesules: ', this.allSchedules);
      },
      error: (error) => {
        console.error('Error al cargar horarios ', error);
      }
    });
  }

  onSubmit(): void {
    console.log('Schedule: ',this.teacher.scheduleIds)
    this.teacher.courseIds = []
    const uniqueCourseIds = new Set<number>();

    for (const majorId in this.selectedCoursesByMajor) {
      if (this.selectedCoursesByMajor.hasOwnProperty(majorId)) {
          this.selectedCoursesByMajor[majorId].forEach(courseId => {
          uniqueCourseIds.add(courseId);
        });
      }
    }
    this.teacher.courseIds = Array.from(uniqueCourseIds);
    
    
    this.teacherService.createTeacher(this.teacher).subscribe({
      next: (response) => {
        console.log('Docente creado correctamente: ', response);
        this.dialog.open(UserInfoDialogComponent, {
          data: {
            name: `${this.teacher.name} ${this.teacher.lastName1} ${this.teacher.lastName2}`,
            email: this.teacher.email,
            password: response.password,
            subject: 'Docente'
          }
        });
        this.router.navigate(['/admin-home']);
      },
      error: (error) => console.error('Error al crear profesor ', error)
    });
    console.log(this.teacher.courseIds)
    console.log(this.selectedCoursesByMajor)
  }

  onCancel(): void {
    console.log('Form cancelled')
    this.teacher = {
      id: 0,
      name: '',
      lastName1: '',
      lastName2: '',
      email: '',
      majorId: 0,
      courseId: 0,
      courseIds: [],
      scheduleIds: [],
      role: 'teacher',
      profilePicture: '',
      password: ''
    };
    this.router.navigate(['/admin-home'])
  }
}
