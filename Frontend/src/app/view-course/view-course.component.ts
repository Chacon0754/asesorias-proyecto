import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { MajorService } from '../services/major.service';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.css'
})
export class ViewCourseComponent implements OnInit {
  allCourses: any[] = [];
  displayedColumns: any[] = [
    'Id_Materias', 'N_Carr', 'N_Sem', 'N_Mat'
  ];
  selectedMajor: string = '';
  allMajors: any[] = []
  filteredCourses: any[] = []

  constructor(private courseService: CourseService, private majorService: MajorService) { }
  ngOnInit(): void {
    this.loadCoursesAndMajorName();
    this.loadMajors();
  }


  loadCoursesAndMajorName(): void {
    this.courseService.getCoursesAndMajorName().subscribe({
      next: (allCourses) => {
        this.allCourses = allCourses;
        this.filteredCourses = allCourses;
        console.log('Materias: ', this.allCourses);
      },
      error: (error) => console.error('Error cargando materias: ', error)
    });
  }

  loadMajors(): void {
    this.majorService.getMajors().subscribe({
      next: (majors) => {
        this.allMajors = majors;
        console.log('Carreras: ', this.allMajors);
      },
      error: (error) => {
        console.error('Error cargando carreras: ', error);
      }
    });
  }

  onMajorChange(majorName: string): void {
    this.selectedMajor = majorName;
    if (majorName) {
      this.filteredCourses = this.allCourses.filter(course => course.nombre_carrera === majorName);
    } else {
      this.filteredCourses = this.allCourses;
    }
  }

}
