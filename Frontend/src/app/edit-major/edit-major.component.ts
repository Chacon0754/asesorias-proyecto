import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MajorService } from '../services/major.service';
import { Major } from '../models/major.model';

@Component({
  selector: 'app-edit-major',
  templateUrl: './edit-major.component.html',
  styleUrl: './edit-major.component.css'
})
export class EditMajorComponent {
  major: Major = {
    id: 0,
    name: '',
  }

  existingIds: number[] = [];
  newId: number = 0;
  newName: string = '';
  errorMessage: string = '';
  showError: boolean = false;
  allMajors: any[] = [];
  id: number = 0;

  constructor(private router: Router, private majorService: MajorService) {}
  
  ngOnInit(): void {
    console.log('Al iniciar: ', this.major);  
    this.loadMajors()
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



  onSubmit(): void {
    this.id = this.major.id;
    console.log('Al enviar: ', this.major.name)
    this.majorService.editMajor(this.id, this.major).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor: ', response);
        this.router.navigate(['/admin-home']);
      },
      error: (error) => {
        console.error('Error al crear carrera: ', error.message);
      }
    });
  }

  onCancel() {
    console.log('bai bai')
    this.major = {
      id: 0,
      name: '',
    }
    this.router.navigate(['/admin-home'])
  }

  onDelete(): void{
    this.majorService.deleteMajor(this.major.id).subscribe({
      next: (response) => {
        console.log('Materia eliminada correctamente', response);
        this.router.navigate(['/admin-home'])
      },
      error: (error) => {
        console.error('Error al eliminar materia', error.message)
      }
    })
  }
}
