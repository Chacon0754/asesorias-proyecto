import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrl: './view-teacher.component.css'
})
export class ViewTeacherComponent implements OnInit {
  allTeachers: any[] = [];
  displayedColumns: string[] = [
    'Id_docente', 'nombre_doc', 'Apellido', 'apei2', 'correo'
  ]

  constructor(private teacherService: TeacherService){}

  ngOnInit(): void {
    this.loadTeachers();

  }
  loadTeachers(): void{
    this.teacherService.getTeachers().subscribe({
      next: (allTeachers) => {
        this.allTeachers = allTeachers;
        console.log(this.allTeachers);
      },
      error: (error) => console.error('Error cargando profesores: ', error)
    });
  }
}
