import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from '../models/teacher.model';
import { Major } from '../models/major.model';
import { Course } from '../models/course.model';
import { TeacherService } from '../services/teacher.service';
import { MajorService } from '../services/major.service';
import { CourseService } from '../services/course.service';
import { ScheduleService } from '../services/schedule.service';


@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrl: './edit-teacher.component.css'
})
  
export class EditTeacherComponent {
  teacher: Teacher = {
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
    password: '',
  };
  selectedCoursesByMajor: {[majorId: number]: number[]} = {}
  allMajors: any[] = [];
  allCourses: any[] = [];
  allTeachers: any[] = [];
  allSchedules: any[] = [];
  

  constructor(private router: Router, private teacherService: TeacherService, private majorService: MajorService, private courseService: CourseService, private scheduleService: ScheduleService) {}

  ngOnInit(): void{
    this.loadMajors();
    this.loadTeachers();
    this.loadSchedules();
  }
  
  loadMajors(): void {
    this.majorService.getMajors().subscribe({
      next: (allMajors) => {
        this.allMajors = allMajors;
        console.log('Carreras: ', this.allMajors);
      },
      error: (error) => console.error('Error cargando Carreras ', error)
    });
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe({
      next: (allTeachers) => {
        this.allTeachers = allTeachers;
        console.log('Docentes: ', this.allTeachers);
      },
      error: (error => console.error('Error cargando docentes: ', error))
    })
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
    
    console.log(this.teacher);
    this.teacherService.editTeacher(this.teacher.id, this.teacher).subscribe({
      next: (response) => {
        console.log('Docente editado correctamemnte: ', response);
        this.router.navigate(['/admin-home']);
      },
      error: (error) => console.error('Error al editar profesor ', error)
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
      password: '',
    };
    this.router.navigate(['/admin-home'])
  }
  
  onDelete(): void{
    this.teacherService.deleteTeacher(this.teacher.id).subscribe({
      next: (response) => {
        console.log('Docente eliminado correctamente ', response);
        this.router.navigate(['/admin-home'])
      },
      error: (error) => {
        console.error('Error al eliminar docente ', error.message)
      }
    });
  }
}
