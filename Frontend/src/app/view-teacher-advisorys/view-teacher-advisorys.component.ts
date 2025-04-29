import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AdvisoryService } from '../services/advisory.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-teacher-advisorys',
  templateUrl: './view-teacher-advisorys.component.html',
  styleUrl: './view-teacher-advisorys.component.css'
})
export class ViewTeacherAdvisorysComponent implements OnInit {
  advisorys: any[] = []
  teacherId = 0;
  displayedColumns: string[] = [
    'materia', 'dia', 'hora', 'alumno', 'modalidad', 'select'
  ]
  advisoryId: number = 0
  dataSource = new MatTableDataSource<any>(this.advisorys);
  selection = new SelectionModel<any>(false, []); // false para selección única

  constructor(private advisoryService: AdvisoryService, private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    const userDetails = this.authService.getUserDetails();
    if (userDetails) {
      this.teacherId = userDetails.id;
      console.log(userDetails.id)
      this.loadAdvisorysbyTeacherId(userDetails.id)
      }
  }

  loadAdvisorysbyTeacherId(teacherId: number): void {
    this.advisoryService.getAdvisorysByTeacherId(teacherId).subscribe({
      next: (advisorys) => {
        this.advisorys = advisorys;
        console.log('Asesorias cargadas: ', advisorys);
      },
      error: (error) => {
        console.error('Error cargando asesoriasL ', error);
      }
    })
  }
  deleteSelectedAdvisory(): void {
    console.log(this.selection.selected[0])
    const selectedAdvisory = this.selection.selected[0]; 
    console.log(selectedAdvisory)
    if (selectedAdvisory) {
      this.advisoryService.deleteAdvisoryByTeacher(selectedAdvisory.id_as, this.teacherId, selectedAdvisory.id_docente_horario).subscribe(
        response => {
          console.log('Asesoría eliminada correctamente', response);
          this.loadAdvisorysbyTeacherId(this.teacherId); 
        },
        error => {
          console.error('Error al eliminar la asesoría', error);
        }
      );
    }
  }
  
  onCancel(): void{
    this.router.navigate(['/teacher-home'])
  }
}
