import { Component, OnInit } from '@angular/core';
import { MajorService } from '../services/major.service';
@Component({
  selector: 'app-view-major',
  templateUrl: './view-major.component.html',
  styleUrl: './view-major.component.css'
})
export class ViewMajorComponent implements OnInit {
  allMajors: any[] = [];
  displayedColumns: string[] = [
    'Id_Carreras', 'Nombre_Carrera'
  ]

  constructor(private majorService: MajorService) { }
  
  ngOnInit(): void {
    this.loadMajors()
  }

  loadMajors(): void {
    this.majorService.getMajors().subscribe({
      next: (allMajors) => {
        this.allMajors = allMajors;
        console.log("Carreras: ", this.allMajors);
      },
      error: (error) => console.error('Error cargando carreras: ', error)
    });
  }

}
