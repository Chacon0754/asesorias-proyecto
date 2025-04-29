import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent implements OnInit{
  allStudents: any[] = [];
  displayedColumns: string[] = [
    'matricula', 'nombre', 'ape1', 'ape2', 'programa', 'semestre', 'correo'
  ]

  constructor(private studentService: StudentService) { }
  
  ngOnInit(): void {
    this.loadStudents();
  }
  loadStudents(): void{
    this.studentService.getStudentsAndMajorName().subscribe({
      next: (allStudents) => {
        this.allStudents = allStudents;
        console.log("Estudiantes: ", this.allStudents);
      },
      error: (error) => console.error('Error cargando estudiantes: ', error)
    })
  }
}
